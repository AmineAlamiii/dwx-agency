"use client";
/* eslint-disable @next/next/no-img-element -- These local WebP assets are pre-optimized for static hosting. */
import { useState } from "react";
import { ArrowUpRight, Check, ChevronLeft, ChevronRight, CalendarDays, CarFront, Circle, Clock3, MapPin, Plus, UtensilsCrossed } from "lucide-react";
import { sitePath } from "../site-path";

export type Industry = "restaurant" | "padel" | "rental";
export const industryProjects = [
  { id: "restaurant" as const, name: "Maison", kind: "Restaurant operations", heading: "A full house. A calmer service.", copy: "Reservations, table availability and orders in one place. Give your team a clear view of the floor and your guests an easier way to book.", features: ["Table reservations", "Order management", "Team dashboard"], goal: "I'd like a restaurant system for reservations, table availability and daily operations." },
  { id: "padel" as const, name: "Court Club", kind: "Padel & sports bookings", heading: "More time playing. Less time organising.", copy: "Let players choose a court and a time, while your team manages availability, memberships and bookings from a single schedule.", features: ["Court scheduling", "Member bookings", "Availability controls"], goal: "I'd like a padel booking system with court availability, memberships and a club dashboard." },
  { id: "rental" as const, name: "Drivn", kind: "Car rental platform", heading: "From available car to confirmed plan.", copy: "Help customers find the right vehicle and send a booking request. Keep your fleet, rental dates and handovers organised behind the scenes.", features: ["Fleet availability", "Booking requests", "Rental management"], goal: "I'd like a car rental platform with fleet availability, booking requests and rental management." },
];

function DemoHead({ icon, brand, detail }: { icon: React.ReactNode; brand: string; detail: string }) {
  return <div className="industry-top"><span className="industry-brand">{icon}{brand}</span><span className="sample-badge">{detail}<i/>Demo</span></div>;
}
export function IndustryDemo({ type, compact = false }: { type: Industry; compact?: boolean }) {
  return <div className={`industry-app ${compact ? "industry-compact" : ""} industry-${type}`}>
    {type === "restaurant" ? <RestaurantDemo/> : type === "padel" ? <PadelDemo/> : <RentalDemo/>}
  </div>;
}
function RestaurantDemo() {
  const [view,setView] = useState(0);
  const [reserved,setReserved] = useState(false);
  return <>
    <DemoHead icon={<UtensilsCrossed size={16}/>} brand="maison" detail="Service workspace"/>
    <div className="industry-body">
      <div className="app-page-title"><div><span className="app-overline">THURSDAY · EVENING SERVICE</span><h3>A good evening starts here.</h3></div><span className="app-avatar">M</span></div>
      <div className="app-metrics"><div><span>Expected guests</span><b>{reserved ? 44 : 42}<small> tonight</small></b></div><div><span>Tables available</span><b>{reserved ? "05" : "06"}<small> / 12</small></b></div><div><span>Next arrival</span><b>19:30</b></div></div>
      <div className="app-subnav"><div>{["Floor plan","Reservations"].map((label,i)=><button key={label} aria-pressed={view===i} onClick={()=>setView(i)}>{label}</button>)}</div><span><i className="status-dot"/>Service open</span></div>
      {view === 0 ? <div className="restaurant-floor" aria-label="Illustrative restaurant floor plan">
        <span className="floor-label">GARDEN ROOM</span>
        {["T01","T02","T03","T04","T05","T06"].map((t,i)=><div key={t} className={`floor-table ${[0,3].includes(i) || (i===4&&reserved) ? "occupied" : "available"}`}><span>{t}</span><small>{[0,3].includes(i) || (i===4&&reserved) ? "Seated" : "Available"}</small><i/><i/><i/><i/></div>)}
        <div className="floor-legend"><span><Circle size={8}/>Available</span><span><Circle size={8} fill="currentColor"/>Seated</span></div>
      </div> : <div className="reservation-list">{[["19:30","A. Martin","4 guests · Garden"],["20:00","S. Amrani","2 guests · Window"],["20:15","L. Benali","6 guests · Main room"]].map(([time,name,desc])=><div key={time}><b>{time}</b><span>{name}<small>{desc}</small></span><span className="app-tag">Confirmed</span></div>)}</div>}
      <div className="app-bottom-action"><span>{reserved ? <><Check size={14}/>Demo table reserved for 2.</> : "Keep the floor moving."}</span><button onClick={()=>{setReserved(x=>!x);setView(0);}}>{reserved ? "Reset demo" : <><Plus size={13}/> Add reservation</>}</button></div>
    </div>
  </>;
}
function PadelDemo() {
  const [day,setDay] = useState(1);
  const [slot,setSlot] = useState("");
  const [confirmed,setConfirmed] = useState(false);
  return <>
    <DemoHead icon={<span className="court-logo">c/</span>} brand="court club" detail="Player bookings"/>
    <div className="industry-body">
      <div className="app-page-title"><div><span className="app-overline">YOUR NEXT GAME</span><h3>Find your court.</h3></div><span className="app-avatar"><CalendarDays size={16}/></span></div>
      <div className="court-date-strip"><button aria-label="Previous demo day" onClick={()=>{setDay((day+4)%5);setSlot("");setConfirmed(false);}}><ChevronLeft size={14}/></button>{["MON","TUE","WED","THU","FRI"].map((d,i)=><button key={d} className={day===i?"selected":""} aria-pressed={day===i} onClick={()=>{setDay(i);setSlot("");setConfirmed(false);}}><small>{d}</small><b>{12+i}</b></button>)}<button aria-label="Next demo day" onClick={()=>{setDay((day+1)%5);setSlot("");setConfirmed(false);}}><ChevronRight size={14}/></button></div>
      <div className="court-view"><div className="padel-court"><i/><i/><span>COURT 01</span></div><div><b>Play under the lights.</b><span><MapPin size={12}/>Indoor · Doubles</span><span><Clock3 size={12}/>90-minute session</span><small>Sample availability</small></div></div>
      <div className="court-times">{["17:00","18:30","20:00","21:30"].map((time,i)=><button disabled={(i+day)%4===0} key={time} className={slot===time?"selected":""} aria-pressed={slot===time} onClick={()=>{setSlot(time);setConfirmed(false);}}>{time}<small>{(i+day)%4===0 ? "Booked" : "Available"}</small></button>)}</div>
      <div className="app-bottom-action"><span>{confirmed ? <><Check size={14}/>Demo booking selected.</> : slot ? `Court 01 · ${slot}` : "Choose an available time."}</span><button disabled={!slot} onClick={()=>setConfirmed(true)}>{confirmed ? "Selected" : "Choose slot"}<ArrowUpRight size={13}/></button></div>
    </div>
  </>;
}
const vehicles = [{ name:"City compact",type:"Everyday trips",range:"Automatic · 5 seats",color:"#c5c7c6" },{name:"Premium SUV",type:"More room. More comfort.",range:"Automatic · 5 seats",color:"#243b34"},{name:"Electric sedan",type:"A quieter way to travel.",range:"Electric · 5 seats",color:"#c9bbae"}];
function RentalDemo() {
  const [vehicle,setVehicle] = useState(1);
  const [selected,setSelected] = useState(false);
  const car=vehicles[vehicle];
  return <>
    <DemoHead icon={<CarFront size={18}/>} brand="drivn." detail="Rental booking"/>
    <div className="industry-body">
      <div className="app-page-title"><div><span className="app-overline">GO SOMEWHERE GOOD</span><h3>Your next journey, sorted.</h3></div><span className="app-avatar"><ArrowUpRight size={16}/></span></div>
      <div className="rental-search"><span><MapPin size={14}/><span>Pick-up location<b>City centre</b></span></span><span><CalendarDays size={14}/><span>Sample rental<b>12 – 15 November</b></span></span></div>
      <div className="vehicle-categories">{["Compact","SUV","Electric"].map((c,i)=><button key={c} aria-pressed={vehicle===i} className={vehicle===i?"selected":""} onClick={()=>{setVehicle(i);setSelected(false);}}>{c}</button>)}</div>
      <div className="vehicle-stage"><span className="availability-badge"><i/>Available in this demo</span><img className="vehicle-photograph" src={sitePath(`/images/rental/${["compact","suv","electric"][vehicle]}.webp`)} width={900} height={600} alt={`Illustrative ${car.name.toLowerCase()}, studio concept`} loading="lazy" decoding="async" key={vehicle}/></div>
      <div className="vehicle-details"><div><h4>{car.name}</h4><p>{car.type}</p></div><span>{car.range}</span></div>
      <div className="app-bottom-action"><span>{selected ? <><Check size={14}/>Demo request prepared.</> : "Clear choice. Simple booking."}</span><button onClick={()=>setSelected(x=>!x)}>{selected ? "Reset demo" : "Select vehicle"}<ArrowUpRight size={13}/></button></div>
    </div>
  </>;
}

export function IndustryShowcase({ onRequest }: {onRequest:(focus:string,message:string)=>void}) {
  const [active,setActive] = useState(0);
  const project=industryProjects[active];
  return <section className="industry-showcase shell section-pad" id="work">
    <div className="section-heading heading-inline"><div><span className="eyebrow">STUDIO EXAMPLES · INTERACTIVE CONCEPTS</span><h2>See what your<br/><span>next move could look like.</span></h2></div><p>From a busy restaurant to a growing fleet. Explore working interfaces built around everyday business needs.</p></div>
    <div className="industry-tabs" role="tablist" aria-label="Business system examples">{industryProjects.map((p,i)=><button key={p.id} role="tab" aria-selected={active===i} aria-controls="industry-example-panel" id={`industry-example-${i}`} tabIndex={active===i?0:-1} onKeyDown={e=>{const next=e.key==="ArrowRight"?(i+1)%3:e.key==="ArrowLeft"?(i+2)%3:e.key==="Home"?0:e.key==="End"?2:null;if(next!==null){e.preventDefault();setActive(next);document.getElementById(`industry-example-${next}`)?.focus();}}} onClick={()=>setActive(i)}><span>0{i+1}</span>{["Restaurant","Padel club","Car rental"][i]}<ArrowUpRight size={16}/></button>)}</div>
    <div className="industry-feature" role="tabpanel" id="industry-example-panel" aria-labelledby={`industry-example-${active}`}>
      <div className="industry-feature-copy" key={project.id+"copy"}><span className="eyebrow">{project.kind}</span><h3>{project.heading}</h3><p>{project.copy}</p><ul>{project.features.map(f=><li key={f}><Check size={15}/>{f}</li>)}</ul><a className="inline-link" href="#contact" onClick={()=>onRequest("Engineering",project.goal)}>Build this for my business<ArrowUpRight size={18}/></a><small>Interactive studio concept · Sample data<br/>Explore the controls. No real bookings are made.</small></div>
      <div className="industry-feature-preview" key={project.id}><div className="preview-browser"><span><i/><i/><i/></span><span>{project.name.toLowerCase().replace(" ","-")} / workspace</span><span>INTERACTIVE CONCEPT</span></div><IndustryDemo type={project.id}/></div>
    </div>
  </section>;
}
