"use client";
import { Check, Terminal } from "lucide-react";
import { IndustryDemo } from "./industry-demos";
import { SupportChat } from "./support-chat";
export function WindowDots(){return <span className="window-dots" aria-hidden="true"><i/><i/><i/></span>;}
export function DesignDemo(){return <IndustryDemo type="restaurant" compact/>;}
export function OperationsDemo(){return <IndustryDemo type="padel" compact/>;}
export function RentalDemo(){return <IndustryDemo type="rental" compact/>;}
export function AssistDemo(){return <SupportChat compact/>;}
export function BuildDemo({compact=false}:{compact?:boolean}) {return <div className={`engineering-preview ${compact?"compact":""}`}><div className="engineering-top"><WindowDots/><span>bookings / availability.ts</span><Terminal size={14}/></div><div className="engineering-task"><span>›</span> Keep every booking in sync.</div><div className="engineering-checks"><span><Check size={12}/> Validate the request</span><span><Check size={12}/> Check availability</span><span><Check size={12}/> Confirm in one transaction</span></div><pre aria-label="Illustrative booking transaction code"><code><span className="code-comment">{"// One booking. One source of truth."}</span>{"\n"}<span className="code-purple">await</span>{" db.transaction("}<span className="code-purple">async</span>{" (tx) => {\n  "}<span className="code-purple">const</span>{" slot = "}<span className="code-purple">await</span>{" tx.get(slotRef);\n  "}<span className="code-purple">if</span>{" (!slot.available) {\n    "}<span className="code-purple">throw new</span>{" SlotUnavailable();\n  }\n  tx.update(slotRef, {\n    status: "}<span className="code-orange">{'"reserved"'}</span>{"\n  });\n  tx.create(bookingRef, booking);\n});"}</code></pre><div className="engineering-footer"><span><i className="status-dot"/>Illustrative workflow</span><span>Validated → Confirmed</span></div></div>;}
