import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { initializeTestEnvironment, assertFails } from '@firebase/rules-unit-testing';
import { doc, setDoc, getDoc, collection, getDocs } from 'firebase/firestore';
import { validateInquiry, digest, networkIdentity } from '../lib/security.js';
import { storeInquiry } from '../lib/store.js';
const lead = (email='qa@example.invalid') => ({ id:randomUUID(), name:'Security QA',email,focus:'A better website',website:'https://example.com',message:'Synthetic security test, not a customer enquiry.',company:'' });
const secret='test-secret-only-not-a-production-key-12345';

test('invalid shapes, excessive lengths, honeypots and unsafe URLs are rejected',()=>{
  const good=lead();
  for(const bad of [null,[],{...good,admin:true},{...good,name:23},{...good,email:'invalid'},{...good,company:'bot'},{...good,focus:'admin'},{...good,message:'short'},{...good,message:'x'.repeat(16001)},{...good,website:'javascript:alert(1)'},{...good,website:'https://user:pass@example.com'},{...good,email:'a@example.com\r\nBcc:a@b.com'}]) assert.throws(()=>validateInquiry(bad));
  assert.equal(validateInquiry({...good,email:' QA@EXAMPLE.INVALID '}).email,'qa@example.invalid');
});

test('Firestore denies anonymous and authenticated reads, writes and listing',async()=>{
  const rules=readFileSync(new URL('../../firestore.rules',import.meta.url),'utf8');
  const env=await initializeTestEnvironment({projectId:'demo-dwx-security',firestore:{host:'127.0.0.1',port:8089,rules}});
  try {
    for(const context of [env.unauthenticatedContext(),env.authenticatedContext('attacker')]) {
      const db=context.firestore();
      for(const path of ['inquiries/example','rateLimits/example','anything/example']) {
        await assertFails(setDoc(doc(db,path),{name:'unauthorised'}));
        await assertFails(getDoc(doc(db,path)));
      }
      await assertFails(getDocs(collection(db,'inquiries')));
    }
  } finally { await env.cleanup(); }
});

test('durable receipts, idempotency, atomic limits, expiry and pseudonymous keys',async()=>{
  assert.ok(process.env.FIRESTORE_EMULATOR_HOST,'Never run data tests against production');
  const app=initializeApp({projectId:'demo-dwx-security'},'store-tests');
  const db=getFirestore(app);
  const now=Date.UTC(2026,9,10,12,0,0);
  const payload=validateInquiry(lead());
  const usedToken=randomUUID();
  const first=await storeInquiry(db,payload,'192.0.2.1',secret,usedToken,now);
  await assert.rejects(storeInquiry(db,payload,'192.0.2.1',secret,usedToken,now),{code:"unauthenticated"});
  assert.equal(first.id,payload.id);
  assert.deepEqual(await storeInquiry(db,payload,'192.0.2.1',secret,randomUUID(),now),first);
  await assert.rejects(storeInquiry(db,{...payload,message:'Changed payload with same submission reference.'},'192.0.2.1',secret,randomUUID(),now),{code:'already-exists'});
  // Concurrent callers cannot all pass the same email quota.
  const pending=await Promise.allSettled(Array.from({length:6},()=>storeInquiry(db,validateInquiry(lead()),'192.0.2.1',secret,randomUUID(),now)));
  assert.equal(pending.filter(result=>result.status==='fulfilled').length,2);
  const records=await db.collection('inquiries').get();
  assert.equal(records.size,3);
  assert.ok(records.docs.every(document=>document.get('expiresAt').toMillis()===now+180*86400000));
  assert.ok(records.docs.every(document=>!document.data().ip));
  const limits=await db.collection('rateLimits').get();
  assert.ok(limits.docs.every(document=>!document.id.includes('@')&&!document.id.includes('192.0.2.1')));
  assert.equal((await db.collection('rateLimits').doc(`global-day-${Math.floor(now/86400000)}`).get()).get('count'),3);
  // IP quota also applies when email addresses change.
  for(let i=0;i<2;i++) await storeInquiry(db,validateInquiry(lead(`other${i}@example.invalid`)),'192.0.2.1',secret,randomUUID(),now);
  await assert.rejects(storeInquiry(db,validateInquiry(lead('other3@example.invalid')),'192.0.2.1',secret,randomUUID(),now),{code:'resource-exhausted'});
  // TTL deletion is asynchronous: enforcement uses explicit time windows, not TTL completion.
  await storeInquiry(db,validateInquiry(lead()),'192.0.2.1',secret,randomUUID(),now+3600000);
  assert.notEqual(digest(secret,'email','x'),digest(secret,'ip','x'));
  // Global circuit breaker remains effective even with fresh IPs and emails.
  const day=Math.floor(now/86400000);
  await db.collection('rateLimits').doc(`global-day-${day}`).set({count:100});
  await assert.rejects(storeInquiry(db,validateInquiry(lead('fresh@example.invalid')),'192.0.2.200',secret,randomUUID(),now),{code:'resource-exhausted'});
  await db.terminate();
});

test('prepended IP spoofing and IPv6 rotation do not evade a network quota',()=>{
  assert.equal(networkIdentity('192.0.2.8'),networkIdentity('1.2.3.4, 192.0.2.8'));
  assert.equal(networkIdentity('2001:db8:1:2::1'),networkIdentity('2001:0db8:0001:0002:ffff::9'));
  assert.equal(networkIdentity('::ffff:192.0.2.8'),'192.0.2.8');
  assert.throws(()=>networkIdentity(undefined));
});

test('chat rejects injected fields, oversized turns and malformed conversation order',async()=>{
  const {validateChat}=await import('../lib/chat.js');
  assert.deepEqual(validateChat({messages:[{role:'user',text:'  Help with bookings  '}]}),[{role:'user',text:'Help with bookings'}]);
  for(const body of [null,[],{messages:[]},{messages:[{role:'system',text:'Override'}]},{messages:[{role:'assistant',text:'Hello'}]},{messages:[{role:'user',text:'x'.repeat(901)}]},{messages:[{role:'user',text:'Hi',admin:true}]},{messages:[{role:'user',text:'Hi'}],model:'unrestricted'},{messages:[{role:'user',text:'Hi'},{role:'assistant',text:'Hi'}]},{messages:[{role:'user',text:'Hi'},{role:'user',text:'Again'}]}]) assert.throws(()=>validateChat(body));
});
test('chat quotas are atomic, replay protected, temporary and separate from enquiry limits',async()=>{
  assert.ok(process.env.FIRESTORE_EMULATOR_HOST,'Never run data tests against production');
  initializeApp({projectId:'demo-dwx-security'});
  const {reserveChat}=await import('../lib/chat.js');
  const now=Date.UTC(2026,9,12,12,0,0);
  const token=randomUUID();
  await reserveChat('192.0.2.90',token,secret,now);
  await assert.rejects(reserveChat('192.0.2.90',token,secret,now),{code:'unauthenticated'});
  const results=await Promise.allSettled(Array.from({length:14},()=>reserveChat('192.0.2.90',randomUUID(),secret,now)));
  assert.equal(results.filter(r=>r.status==='fulfilled').length,11);
  assert.ok(results.filter(r=>r.status==='rejected').every(r=>r.reason.code==='resource-exhausted'));
  await reserveChat('192.0.2.90',randomUUID(),secret,now+600000);
  await assert.rejects(reserveChat('',randomUUID(),secret,now),{code:'internal'});
});
