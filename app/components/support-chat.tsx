"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Check, MessageCircle, RotateCcw, Send, Sparkles } from "lucide-react";
import { askAssistant } from "./firebase-inquiries";

type Message = {role:"user"|"assistant";text:string};
const starters=["Improve my website","Restaurant reservations","Padel court bookings","Car rental platform"];
export function SupportChat({compact=false,onRequest}:{compact?:boolean;onRequest?:(focus:string,message:string)=>void}) {
  const [messages,setMessages]=useState<Message[]>([]);
  const [input,setInput]=useState("");
  const [busy,setBusy]=useState(false);
  const [error,setError]=useState("");
  const log=useRef<HTMLDivElement>(null);
  const locked=useRef(false);
  const field=useRef<HTMLInputElement>(null);
  useEffect(()=>{if(log.current)log.current.scrollTop=log.current.scrollHeight;},[messages,busy,error]);
  async function send(question:string){
    const text=question.trim();
    if(!text||locked.current)return;
    locked.current=true;setBusy(true);setError("");setInput("");
    const next:Message[]=[...messages,{role:"user",text}];
    setMessages(next);
    try {
      // Keep the last three complete turns and the new question, starting with a user.
      const history=next.slice(-7).map(m=>({...m,text:m.text.slice(0,900)}));
      const answer=await askAssistant(history);
      setMessages([...next,{role:"assistant",text:answer}]);
    } catch(e){
      setMessages(messages);setInput(text);
      const code=(e as {code?:string})?.code;
      setError(code==="functions/resource-exhausted"?"Chat has reached its limit. Please wait a little or contact Dwx directly.":"The AI assistant couldn’t respond. Your question is still here. Try again or talk to the Dwx team.");
    } finally {locked.current=false;setBusy(false);}
  }
  if(compact) return <div className="support-teaser"><div className="support-top"><span><Sparkles size={17}/>Dwx Assist</span><span className="ai-badge">AI assistant</span></div><div className="teaser-content"><span className="assistant-emblem"><Sparkles size={27}/></span><h3>A useful first conversation.</h3><p>Tell us what slows your business down. Explore an idea, ask a question or find the right next step.</p><div className="teaser-topics"><span><Check size={13}/>Websites & bookings</span><span><Check size={13}/>Software & automation</span></div><a className="app-chat-link" href="#assistant">Let’s talk<ArrowRight size={16}/></a><small>AI guidance, with a direct route to the Dwx team.</small></div></div>;
  return <div className="support-chat"><div className="support-top"><span><Sparkles size={17}/><b>Dwx Assist</b><i className="status-dot"/></span><div><span className="ai-badge">AI assistant</span><button title="Start a new conversation" aria-label="Start a new conversation" disabled={busy} onClick={()=>{setMessages([]);setInput("");setError("");field.current?.focus();}}><RotateCcw size={15}/></button></div></div>
    <div className="support-log" ref={log} role="log" aria-label="Conversation with Dwx AI assistant" aria-live="polite" aria-relevant="additions text"><div className="chat-message assistant"><span className="message-avatar"><Sparkles size={15}/></span><div><small>DWX ASSIST · AI</small><p>Hello. What would you like your business to do better? I can help explore a website, a booking system or a simpler way to work.</p></div></div>{messages.map((m,i)=><div className={`chat-message ${m.role}`} key={i}>{m.role==="assistant"&&<span className="message-avatar"><Sparkles size={15}/></span>}<div><small>{m.role==="assistant"?"DWX ASSIST · AI":"YOU"}</small><p dir="auto">{m.text.split(/(\*\*[^*]+\*\*)/g).map((part,j)=>part.startsWith("**")&&part.endsWith("**")?<strong key={j}>{part.slice(2,-2)}</strong>:part)}</p></div></div>)}{busy&&<div className="chat-thinking" role="status"><span/><span/><span/>Preparing a response</div>}{error&&<p className="chat-error" role="alert">{error}</p>}</div>
    <div className="support-controls"><div className="chat-quick-replies" aria-label="Suggested questions">{(messages.length? ["What should we start with?","How does a project work?"]:starters).map(q=><button disabled={busy} onClick={()=>send(q)} key={q}>{q}<ArrowUpRight size={12}/></button>)}</div><form onSubmit={e=>{e.preventDefault();void send(input);}}><label className="sr-only" htmlFor="assistant-question">Your business question</label><input id="assistant-question" dir="auto" ref={field} value={input} onChange={e=>setInput(e.target.value)} maxLength={900} placeholder="Tell us what you have in mind…" autoComplete="off" disabled={busy}/><button type="submit" disabled={busy||!input.trim()} aria-label="Send question"><Send size={17}/></button></form><div className="support-handoff"><a href="#work">Explore examples<ArrowUpRight size={12}/></a><a href="#contact" onClick={()=>onRequest?.("Something else",messages.filter(m=>m.role==="user").map(m=>m.text).join("\n\n").slice(0,2000)||"I’d like to discuss how Dwx could help my business.")}>Talk to a person<ArrowUpRight size={12}/></a></div><small className="chat-disclosure">AI can make mistakes. No bookings or commitments are made here. Messages go to Google Vertex AI; Dwx does not save transcripts. Don’t share sensitive information. <a href="/privacy">Privacy</a></small></div>
  </div>;
}
export function AssistantSection({onRequest}:{onRequest:(focus:string,message:string)=>void}){return <section className="assistant-section shell section-pad" id="assistant"><div className="assistant-copy"><span className="eyebrow">LET’S MAKE IT PRACTICAL</span><h2>Big idea?<br/><span>Small question?</span><br/>Start here.</h2><p>You don’t need a technical brief. Tell us what’s getting in the way, and explore a useful next step.</p><div className="assistant-promise"><MessageCircle size={18}/><span>AI for a first conversation.<br/><b>Our team for the real decisions.</b></span></div><a className="inline-link" href="#contact">Prefer a person? Contact Dwx<ArrowUpRight size={17}/></a></div><SupportChat onRequest={onRequest}/></section>;}
