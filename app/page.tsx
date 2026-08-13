"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Boxes,
  BrainCircuit,
  Building2,
  Check,
  ChevronDown,
  CircleCheck,
  Cloud,
  Code2,
  Cpu,
  Database,
  Globe2,
  Layers3,
  LifeBuoy,
  LockKeyhole,
  Menu,
  Palette,
  Play,
  Quote,
  Rocket,
  Send,
  ServerCog,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  SquareTerminal,
  Star,
  TrendingUp,
  Users,
  Workflow,
  X,
  Zap,
} from "lucide-react";

const services = [
  { icon: Code2, tone: "purple", title: "Web Development", copy: "High-performance websites, corporate platforms, landing pages and web applications.", tags: ["React", "Next.js", "TypeScript", "Node.js"], size: "wide" },
  { icon: Smartphone, tone: "blue", title: "Mobile Apps", copy: "Native and cross-platform experiences for iOS and Android.", tags: ["React Native", "Flutter", "Swift", "Kotlin"] },
  { icon: Boxes, tone: "cyan", title: "Custom Software", copy: "Purpose-built systems designed around the way your business operates.", tags: ["CRM", "ERP", "SaaS", "Internal tools"] },
  { icon: Palette, tone: "pink", title: "UI/UX Design", copy: "Beautiful, intuitive experiences engineered for usability and conversion.", tags: ["Research", "Prototypes", "Design systems"] },
  { icon: ShieldCheck, tone: "green", title: "Cybersecurity", copy: "Protect your applications, infrastructure and critical business data.", tags: ["Audits", "Pen testing", "Monitoring"], size: "wide" },
  { icon: Cloud, tone: "blue", title: "Cloud Solutions", copy: "Scalable, resilient infrastructure across the world’s leading cloud platforms.", tags: ["AWS", "Azure", "Google Cloud"] },
  { icon: ServerCog, tone: "orange", title: "DevOps", copy: "Automate delivery, infrastructure and observability from commit to production.", tags: ["CI/CD", "Docker", "Kubernetes"] },
  { icon: BrainCircuit, tone: "purple", title: "AI & Automation", copy: "Put intelligent agents and workflows to work across your business.", tags: ["AI agents", "LLMs", "Automation"], size: "wide" },
  { icon: LifeBuoy, tone: "pink", title: "Managed IT", copy: "Reliable monitoring, maintenance and technical support—always within reach.", tags: ["24/7 support", "Maintenance", "Ops"] },
];

const solutions = {
  Startups: { icon: Rocket, eyebrow: "For venture-backed speed", title: "Launch faster without building a full internal tech team.", copy: "From idea validation to scalable product, our senior team helps you move quickly without accumulating technical debt.", items: ["MVP Development", "UI/UX", "Cloud Architecture", "AI Integration", "Technical Consulting"], cta: "Build Your MVP" },
  SMEs: { icon: Users, eyebrow: "For growing businesses", title: "Modernize your operations and unlock the next stage of growth.", copy: "Connect your tools, automate repetitive work and give your team technology that finally fits.", items: ["Business Automation", "Custom Software", "Cloud Migration", "Managed IT", "Data Platforms"], cta: "Modernize Your Business" },
  Enterprise: { icon: Building2, eyebrow: "For complex organizations", title: "Deliver enterprise transformation with less risk.", copy: "Secure architecture, dependable delivery and expert teams that integrate with your governance model.", items: ["Legacy Modernization", "Cybersecurity", "Cloud at Scale", "Dedicated Teams", "Enterprise AI"], cta: "Talk to an Expert" },
  "E-commerce": { icon: ShoppingBag, eyebrow: "For modern commerce", title: "Turn more traffic into loyal, high-value customers.", copy: "Fast storefronts, frictionless checkouts and connected operations built for ambitious retail brands.", items: ["Headless Commerce", "Conversion UX", "Payments", "ERP Integration", "Analytics"], cta: "Scale Your Store" },
  SaaS: { icon: Layers3, eyebrow: "For software companies", title: "Build a platform customers love and investors trust.", copy: "Product strategy, scalable engineering and ongoing iteration from a team that understands SaaS economics.", items: ["Product Engineering", "Multi-tenant SaaS", "Billing", "Analytics", "Platform Security"], cta: "Build Your Platform" },
};

const tech = ["React", "Next.js", "Vue", "Angular", "Node.js", "Python", "Laravel", "Java", ".NET", "Flutter", "React Native", "AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "PostgreSQL", "MongoDB", "Redis", "GitHub", "Figma", "OpenAI"];

const valueProps = [
  { label: "Build faster", title: "Turn ideas into production-ready digital products.", copy: "A connected design and engineering workflow keeps decisions moving and quality high.", icon: SquareTerminal, type: "build", stat: "3.2×", statLabel: "faster delivery" },
  { label: "Stay secure", title: "Security built into every layer of your technology.", copy: "Continuous monitoring, practical hardening and clear visibility protect what matters.", icon: LockKeyhole, type: "secure", stat: "0", statLabel: "critical issues" },
  { label: "Scale confidently", title: "Infrastructure designed to grow with your business.", copy: "Elastic cloud architecture handles demand efficiently—from your first customer to your millionth.", icon: TrendingUp, type: "scale", stat: "99.99%", statLabel: "uptime target" },
  { label: "Automate intelligently", title: "Use AI to eliminate repetitive work.", copy: "Human-centered automation turns your processes into fast, dependable intelligent workflows.", icon: Bot, type: "automate", stat: "40h", statLabel: "saved weekly" },
];

const cases = [
  { category: "COMMERCE", title: "Scaling a high-growth marketplace", result: "+45%", resultLabel: "conversion rate", tags: ["Next.js", "Stripe", "AWS"], theme: "violet", chart: [24, 39, 34, 52, 46, 68, 62, 84] },
  { category: "B2B SAAS", title: "One operating system for field teams", result: "10K+", resultLabel: "active users", tags: ["React", "Node.js", "PostgreSQL"], theme: "blue", chart: [20, 25, 32, 31, 48, 58, 72, 91] },
  { category: "ARTIFICIAL INTELLIGENCE", title: "Support that learns with every answer", result: "60%", resultLabel: "fewer manual requests", tags: ["OpenAI", "Python", "React"], theme: "pink", chart: [18, 36, 29, 48, 57, 62, 78, 86] },
];

const testimonials = [
  { quote: "NEXORA transformed our idea into a complete digital platform. Their team handled design, development, infrastructure and launch seamlessly.", name: "Maya Chen", role: "CEO, Orbit Labs", initials: "MC", color: "purple" },
  { quote: "They simplified a complex cloud migration and improved our reliability from day one. We finally feel ready for the next stage of growth.", name: "Omar Haddad", role: "COO, Northstar Commerce", initials: "OH", color: "blue" },
  { quote: "The rare technology partner who understands both the boardroom and the codebase. Every decision was tied to a real business result.", name: "Elena Rossi", role: "VP Digital, Atlas Group", initials: "ER", color: "pink" },
];

const faqs = [
  ["What IT services do you provide?", "We provide end-to-end strategy, UI/UX, web and mobile development, custom software, cloud, DevOps, cybersecurity, AI automation and managed IT support."],
  ["Can you handle an entire project from design to deployment?", "Yes. Our cross-functional team can own discovery, architecture, experience design, engineering, testing, launch and ongoing optimization."],
  ["Do you work with startups?", "Absolutely. We help founders validate ideas, design MVPs, choose sensible architecture and build a foundation that can scale after launch."],
  ["Can you modernize existing software?", "Yes. We audit your current systems, prioritize risk and value, then modernize incrementally to protect business continuity."],
  ["Do you provide ongoing support?", "Yes. Our managed IT and product support plans cover maintenance, monitoring, security, optimization and feature development."],
  ["Can you work with our internal development team?", "Yes. We can embed a dedicated team, fill specialist gaps or take ownership of a defined workstream alongside your team."],
  ["Do you provide cybersecurity services?", "Yes. Services include security audits, penetration testing, vulnerability assessment, hardening and continuous monitoring."],
  ["Can you integrate AI into our business?", "Yes. We identify valuable use cases, prototype safely and build production AI agents, LLM integrations, chatbots and automated workflows."],
  ["How much does a project cost?", "It depends on scope, complexity and team shape. After a free consultation, we provide a transparent estimate with clear deliverables and milestones."],
  ["How long does a typical project take?", "Focused projects can launch in 4–8 weeks, while larger platforms typically take 3–6 months. We define a realistic roadmap before work begins."],
];

const fade = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };

function SectionHeading({ eyebrow, title, copy, light = false }: { eyebrow: string; title: string; copy?: string; light?: boolean }) {
  return (
    <motion.div className={`section-heading ${light ? "light" : ""}`} variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} transition={{ duration: .65 }}>
      <span className="eyebrow"><Sparkles size={14} />{eyebrow}</span>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </motion.div>
  );
}

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const total = 48;
    const timer = window.setInterval(() => {
      frame += 1;
      setCount(Math.round(value * (1 - Math.pow(1 - frame / total, 3))));
      if (frame >= total) window.clearInterval(timer);
    }, 24);
    return () => window.clearInterval(timer);
  }, [inView, value]);
  return <span ref={ref}>{count}{suffix}</span>;
}

function Ecosystem() {
  const modules = [
    { icon: Code2, label: "Web", pos: "web" }, { icon: Smartphone, label: "Mobile", pos: "mobile" },
    { icon: Cloud, label: "Cloud", pos: "cloud" }, { icon: ShieldCheck, label: "Security", pos: "security" },
    { icon: BrainCircuit, label: "AI", pos: "ai" }, { icon: ServerCog, label: "DevOps", pos: "devops" },
  ];
  return (
    <motion.div className="ecosystem-wrap" initial={{ opacity: 0, y: 40, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: .45, duration: .9 }}>
      <div className="eco-window">
        <div className="window-bar"><span /><span /><span /><div className="window-title">NEXORA Control Center</div><div className="live-pill"><i />Systems live</div></div>
        <div className="eco-grid">
          <aside className="eco-sidebar"><div className="mini-logo">N</div>{[Globe2, Layers3, Workflow, Database].map((Icon, i) => <Icon key={i} size={18} className={i === 0 ? "active" : ""} />)}</aside>
          <div className="eco-stage">
            <div className="grid-lines" />
            <div className="pulse-ring ring-one" /><div className="pulse-ring ring-two" />
            <div className="eco-core"><div className="core-icon"><Zap size={28} /></div><strong>NEXORA</strong><span>Unified technology</span></div>
            {modules.map(({ icon: Icon, label, pos }, i) => <motion.div key={label} className={`eco-module ${pos}`} animate={{ y: [0, -7, 0] }} transition={{ duration: 4 + i * .35, repeat: Infinity, ease: "easeInOut" }}><span><Icon size={17} /></span>{label}<i /></motion.div>)}
            <div className="activity-card"><div><span>Delivery velocity</span><b>+38%</b></div><div className="bars">{[32, 42, 38, 58, 51, 74, 82].map((n, i) => <i key={i} style={{ height: `${n}%` }} />)}</div></div>
            <div className="security-card"><ShieldCheck size={20}/><div><b>All systems protected</b><span>12 checks passed</span></div><CircleCheck size={18}/></div>
          </div>
        </div>
      </div>
      <div className="float-badge float-a"><Star size={16} fill="currentColor"/> 4.9 client rating</div>
      <div className="float-badge float-b"><Zap size={16}/> Shipping 3.2× faster</div>
    </motion.div>
  );
}

function VisualPanel({ type }: { type: string }) {
  if (type === "secure") return <div className="mini-ui security-ui"><div className="ui-top"><span>Security posture</span><span className="status"><i/>Protected</span></div><div className="shield-orbit"><div className="orbit o1"/><div className="orbit o2"/><ShieldCheck size={52}/></div><div className="risk-grid">{["Endpoints", "Cloud", "Identity"].map((x, i) => <div key={x}><i className={`risk r${i}`}/><span>{x}</span><b>{[98, 100, 96][i]}%</b></div>)}</div></div>;
  if (type === "scale") return <div className="mini-ui scale-ui"><div className="ui-top"><span>Global infrastructure</span><span>Live</span></div><div className="node-map"><div className="map-line l1"/><div className="map-line l2"/>{["us", "eu", "ap", "af"].map((x, i) => <span className={`map-node ${x}`} key={x}><i/>{["US", "EU", "APAC", "AFR"][i]}</span>)}</div><div className="scale-stats"><div><small>Requests</small><b>8.4M</b></div><div><small>Latency</small><b>42ms</b></div><div><small>Uptime</small><b>99.99%</b></div></div></div>;
  if (type === "automate") return <div className="mini-ui automate-ui"><div className="ui-top"><span>Customer onboarding</span><span className="status"><i/>Running</span></div><div className="workflow-row"><span className="flow-node purple"><Database size={19}/><i>Trigger</i></span><b/><span className="flow-node blue"><BrainCircuit size={19}/><i>AI analyze</i></span><b/><span className="flow-node pink"><Send size={19}/><i>Route</i></span></div><div className="run-row"><span>Latest run</span><div className="run-progress"><i/></div><b>2.4s</b></div></div>;
  return <div className="mini-ui build-ui"><div className="ui-top"><span>Product velocity</span><span>This month</span></div><div className="sprint-grid"><div className="task-list">{["Auth flow", "Billing API", "Team spaces"].map((x, i) => <div key={x}><span className={`task-dot d${i}`}/><b>{x}</b><i>{["Done", "Review", "Build"][i]}</i></div>)}</div><div className="velocity-chart"><div className="chart-line"/>{[25,42,36,58,49,74,86].map((n,i)=><i key={i} style={{height:`${n}%`}}/>)}</div></div><div className="commit-pill"><Code2 size={15}/> 24 releases shipped</div></div>;
}

function App() {
  const reduceMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSolution, setActiveSolution] = useState<keyof typeof solutions>("Startups");
  const [openFaq, setOpenFaq] = useState(0);
  const [testimonial, setTestimonial] = useState(0);
  const [formSent, setFormSent] = useState(false);
  const current = solutions[activeSolution];
  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => setTestimonial(v => (v + 1) % testimonials.length), 6500);
    return () => window.clearInterval(id);
  }, [reduceMotion]);
  const submit = (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); setFormSent(true); };

  return (
    <main>
      <nav className="nav-shell" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="NEXORA IT home"><span className="brand-mark"><i/><i/><i/></span><b>NEXORA</b><small>IT</small></a>
        <div className="nav-links">{["Services", "Solutions", "Work", "About", "Process", "Resources"].map(link => <a href={`#${link.toLowerCase()}`} key={link}>{link}</a>)}</div>
        <div className="nav-actions"><a className="btn btn-quiet" href="#contact">Let’s Talk</a><a className="btn btn-primary small" href="#contact">Start a Project <ArrowRight size={16}/></a></div>
        <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" aria-expanded={menuOpen}>{menuOpen ? <X/> : <Menu/>}</button>
        <AnimatePresence>{menuOpen && <motion.div className="mobile-menu" initial={{opacity:0,y:-12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-12}}>{["Services", "Solutions", "Work", "About", "Process", "Resources"].map(link => <a onClick={() => setMenuOpen(false)} href={`#${link.toLowerCase()}`} key={link}>{link}<ArrowRight size={17}/></a>)}<a className="btn btn-primary" href="#contact">Start a Project</a></motion.div>}</AnimatePresence>
      </nav>

      <section className="hero" id="top">
        <div className="hero-aurora a1"/><div className="hero-aurora a2"/><div className="hero-grid"/>
        <motion.div className="hero-copy" initial="hidden" animate="visible" variants={{visible:{transition:{staggerChildren:.1}}}}>
          <motion.div variants={fade} className="announcement"><span>⚡</span> Your all-in-one IT partner <i>New</i></motion.div>
          <motion.p variants={fade} className="overline">WE BUILD. WE SECURE. WE SCALE.</motion.p>
          <motion.h1 variants={fade}>Everything your business needs to <span>build, secure &amp; scale.</span></motion.h1>
          <motion.p variants={fade} className="hero-sub">From websites and software to cloud, cybersecurity and AI — we design and deliver technology solutions that move businesses forward.</motion.p>
          <motion.div variants={fade} className="hero-actions"><a className="btn btn-primary large" href="#contact">Start a Project <ArrowRight size={18}/></a><a className="btn btn-secondary large" href="#services"><Play size={16} fill="currentColor"/> Explore Our Services</a></motion.div>
          <motion.div variants={fade} className="trust-points">{["Free consultation", "Fast response", "Flexible solutions"].map(x=><span key={x}><Check size={15}/>{x}</span>)}</motion.div>
        </motion.div>
        <Ecosystem />
      </section>

      <section className="trust-section" aria-label="Trusted by ambitious companies">
        <p>TECHNOLOGY TRUSTED BY AMBITIOUS BUSINESSES</p>
        <div className="logo-marquee"><div>{["MONO", "ARCWAY", "NORTHSTAR", "KINETIC", "VERDANT", "SFERA", "MONO", "ARCWAY", "NORTHSTAR", "KINETIC", "VERDANT", "SFERA"].map((x,i)=><span key={`${x}${i}`}><i/>{x}</span>)}</div></div>
        <div className="metrics">{[[50,"+","Projects delivered"],[20,"+","Technologies"],[99,"%","Client satisfaction"],[24,"/7","Support available"]].map(([n,s,l])=><div key={String(l)}><strong><Counter value={Number(n)} suffix={String(s)}/></strong><span>{l}</span></div>)}</div>
      </section>

      <section className="section services-section" id="services">
        <SectionHeading eyebrow="One connected team" title="One agency. Every IT service you need." copy="Stop managing multiple vendors. We bring your digital technology under one expert team." />
        <div className="bento-grid">{services.map(({icon:Icon,tone,title,copy,tags,size}, i)=><motion.article key={title} className={`service-card ${size || ""}`} variants={fade} initial="hidden" whileInView="visible" viewport={{once:true,margin:"-40px"}} transition={{delay:(i%3)*.08}}><div className={`service-icon ${tone}`}><Icon size={22}/></div><h3>{title}</h3><p>{copy}</p><div className="tag-list">{tags.map(t=><span key={t}>{t}</span>)}</div><a href="#contact" aria-label={`Explore ${title}`}>Explore <ArrowRight size={16}/></a><div className="card-glow"/></motion.article>)}</div>
      </section>

      <section className="partner-section" id="about">
        <div className="partner-inner"><SectionHeading light eyebrow="The full-service advantage" title="Why work with five providers when you can work with one?" copy="Strategy, design, development, infrastructure, security and support — all connected under one technology partner."/>
          <motion.div className="partner-map" initial={{opacity:0,scale:.94}} whileInView={{opacity:1,scale:1}} viewport={{once:true}}>
            <div className="map-glow"/><div className="partner-core"><span className="brand-mark"><i/><i/><i/></span><b>NEXORA</b><small>One technology partner</small></div>
            {["Strategy","Design","Development","Cloud","Security","AI","Support","DevOps"].map((x,i)=>{ const PartnerIcon = [Sparkles,Palette,Code2,Cloud,ShieldCheck,BrainCircuit,LifeBuoy,ServerCog][i]; return <motion.div className={`partner-node node-${i+1}`} key={x} animate={reduceMotion ? {} : {y:[0,-6,0]}} transition={{duration:3.5+i*.2,repeat:Infinity}}><span><PartnerIcon size={18}/></span>{x}</motion.div>; })}
            <div className="orbit-ring or1"/><div className="orbit-ring or2"/>
          </motion.div>
        </div>
      </section>

      <section className="section solutions-section" id="solutions">
        <SectionHeading eyebrow="Solutions by business need" title="Technology built around your next move." copy="Choose your stage. We’ll bring the strategy, specialists and systems to move you forward."/>
        <div className="solution-tabs" role="tablist">{Object.keys(solutions).map(k=><button role="tab" aria-selected={activeSolution===k} key={k} onClick={()=>setActiveSolution(k as keyof typeof solutions)}>{k}</button>)}</div>
        <AnimatePresence mode="wait"><motion.div className="solution-panel" key={activeSolution} initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}} transition={{duration:.35}}><div className="solution-copy"><span className="solution-icon"><current.icon size={25}/></span><small>{current.eyebrow}</small><h3>{current.title}</h3><p>{current.copy}</p><a className="btn btn-dark" href="#contact">{current.cta}<ArrowRight size={17}/></a></div><div className="solution-list"><span>WHAT WE’LL DELIVER</span>{current.items.map((x,i)=><motion.div key={x} initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} transition={{delay:.1+i*.06}}><i>{String(i+1).padStart(2,"0")}</i><b>{x}</b><CircleCheck size={19}/></motion.div>)}</div></motion.div></AnimatePresence>
      </section>

      <section className="tech-section" id="resources"><div className="section"><SectionHeading light eyebrow="Modern by default" title="Built with technology that scales." copy="Battle-tested platforms. The right tool for every job. No trend-chasing, no lock-in."/><div className="tech-cloud">{tech.map((x,i)=><motion.span key={x} initial={{opacity:0,scale:.85}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{delay:(i%8)*.045}}><i className={`tech-dot td${i%6}`}/>{x}</motion.span>)}</div></div></section>

      <section className="section value-section">
        <SectionHeading eyebrow="Outcomes, not output" title="Move faster. Stay safer. Scale smarter." copy="Every part of your technology works better when it is designed as one connected system."/>
        <div className="value-stack">{valueProps.map(({label,title,copy,icon:Icon,type,stat,statLabel},i)=><motion.article className={`value-row ${i%2?"reverse":""}`} key={label} initial={{opacity:0,y:35}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:"-80px"}}><div className="value-copy"><span className="value-label"><Icon size={18}/>{label}</span><h3>{title}</h3><p>{copy}</p><div className="value-stat"><b>{stat}</b><span>{statLabel}</span></div><a href="#contact">See what’s possible <ArrowRight size={16}/></a></div><div className={`value-visual ${type}`}><div className="visual-glow"/><VisualPanel type={type}/></div></motion.article>)}</div>
      </section>

      <section className="process-section" id="process"><div className="section"><SectionHeading light eyebrow="Our process" title="From idea to launch — without the complexity." copy="A clear, collaborative path from your first conversation to long-term growth."/><div className="timeline">{[["Discovery","Understand goals, users and technical requirements."],["Strategy","Define architecture, technology and roadmap."],["Design","Create UX, interfaces and prototypes."],["Development","Build, test and optimize the solution."],["Launch & Scale","Deploy, monitor, maintain and improve."]].map(([t,c],i)=><motion.div className="step" key={t} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.1}}><div className="step-number">{String(i+1).padStart(2,"0")}</div><div className="step-line"><i/></div><h3>{t}</h3><p>{c}</p></motion.div>)}</div></div></section>

      <section className="section work-section" id="work">
        <SectionHeading eyebrow="Selected work" title="Technology that creates real business impact." copy="A glimpse at the platforms, systems and experiences we build for ambitious teams."/>
        <div className="case-grid">{cases.map(({category,title,result,resultLabel,tags,theme,chart})=><article className={`case-card ${theme}`} key={title}><div className="case-top"><span>{category}</span><a href="#contact" aria-label={`Read ${title} case study`}><ArrowRight/></a></div><h3>{title}</h3><div className="case-result"><b>{result}</b><span>{resultLabel}</span></div><div className="case-dashboard"><div className="dash-nav"><i/><i/><i/><span>Insights</span></div><div className="dash-content"><div className="dash-metrics"><span><small>Growth</small><b>{result}</b></span><span><small>Performance</small><b>Excellent</b></span></div><div className="case-chart">{chart.map((n,i)=><i key={i} style={{height:`${n}%`}}/>)}</div></div></div><div className="case-tags">{tags.map(t=><span key={t}>{t}</span>)}</div></article>)}</div>
      </section>

      <section className="why-section"><div className="section"><SectionHeading eyebrow="Why NEXORA" title="More than developers. Your technology partner." copy="Senior expertise, commercial thinking and a team that stays accountable after launch."/><div className="why-grid">{[[Layers3,"Full-Service Expertise","Everything from strategy and design to infrastructure."],[TrendingUp,"Business-First Approach","Technology decisions based on measurable outcomes."],[Boxes,"Scalable Architecture","Solutions designed for your next stage of growth."],[ShieldCheck,"Security by Design","Protection integrated from the first decision."],[Users,"Transparent Communication","Clear ownership and updates throughout every project."],[LifeBuoy,"Long-Term Support","A partner who keeps improving after launch."]].map(([Icon,t,c],i)=><motion.article key={String(t)} initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.07}}><span>{typeof Icon !== "string" && <Icon size={21}/>}</span><h3>{String(t)}</h3><p>{String(c)}</p></motion.article>)}</div></div></section>

      <section className="testimonial-section"><div className="section testimonial-layout"><div><span className="eyebrow"><Quote size={14}/> Client stories</span><h2>Trusted where the stakes are high.</h2><div className="rating"><span>{[1,2,3,4,5].map(x=><Star key={x} size={16} fill="currentColor"/>)}</span><b>4.9/5 average client rating</b></div></div><div className="testimonial-card"><Quote className="big-quote"/><AnimatePresence mode="wait"><motion.div key={testimonial} initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}}><blockquote>“{testimonials[testimonial].quote}”</blockquote><div className="person"><span className={testimonials[testimonial].color}>{testimonials[testimonial].initials}</span><div><b>{testimonials[testimonial].name}</b><small>{testimonials[testimonial].role}</small></div></div></motion.div></AnimatePresence><div className="testimonial-dots">{testimonials.map((_,i)=><button key={i} className={testimonial===i?"active":""} onClick={()=>setTestimonial(i)} aria-label={`View testimonial ${i+1}`}/>)}</div></div></div></section>

      <section className="section engagement-section"><SectionHeading eyebrow="Flexible engagement" title="Work with us your way." copy="Choose the model that fits your goals, timeline and internal capabilities."/><div className="engagement-grid">{[["Project-Based","Best for clearly defined products, migrations and transformation initiatives.","Start a Project"],["Dedicated Team","Experienced designers and engineers, integrated with your business.","Build Your Team"],["Managed IT","Ongoing infrastructure, security, maintenance and technical support.","Talk to an Expert"]].map(([t,c,a],i)=>{ const EngageIcon = [Rocket,Users,LifeBuoy][i]; return <article className={i===1?"popular":""} key={t}>{i===1&&<span className="popular-label">MOST POPULAR</span>}<div className="engage-icon"><EngageIcon size={23}/></div><h3>{t}</h3><p>{c}</p><ul>{[["Defined scope","Milestone delivery","Senior project team"],["Flexible capacity","Specialist expertise","Direct collaboration"],["Proactive monitoring","Priority support","Continuous improvement"]][i].map(x=><li key={x}><Check size={15}/>{x}</li>)}</ul><a className={`btn ${i===1?"btn-primary":"btn-secondary"}`} href="#contact">{a}<ArrowRight size={16}/></a></article>; })}</div></section>

      <section className="section faq-section"><div className="faq-intro"><span className="eyebrow"><Sparkles size={14}/> Questions, answered</span><h2>Everything you need to know.</h2><p>Can’t find what you’re looking for?</p><a href="#contact">Talk to our team <ArrowRight size={15}/></a></div><div className="faq-list">{faqs.map(([q,a],i)=><div className={`faq-item ${openFaq===i?"open":""}`} key={q}><button onClick={()=>setOpenFaq(openFaq===i?-1:i)} aria-expanded={openFaq===i}><span>{q}</span><ChevronDown size={20}/></button><AnimatePresence initial={false}>{openFaq===i&&<motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}}><p>{a}</p></motion.div>}</AnimatePresence></div>)}</div></section>

      <section className="contact-section" id="contact"><div className="contact-glow g1"/><div className="contact-glow g2"/><div className="section contact-layout"><div className="contact-copy"><span className="eyebrow dark"><Sparkles size={14}/> Start something powerful</span><h2>Have an idea?<br/><span>Let’s build it.</span></h2><p>Tell us what you want to create. Our technology team will help turn it into a clear plan—and then into reality.</p><div className="contact-promise">{["Free, no-pressure consultation","A senior expert responds within 24 hours","Clear scope, timeline and next steps"].map(x=><span key={x}><CircleCheck size={18}/>{x}</span>)}</div></div><div className="contact-card">{formSent?<motion.div className="form-success" initial={{opacity:0,scale:.95}} animate={{opacity:1,scale:1}}><span><Check size={32}/></span><h3>Your project is on our radar.</h3><p>Thanks for reaching out. A NEXORA specialist will contact you within one business day.</p><button onClick={()=>setFormSent(false)} className="btn btn-secondary">Send another enquiry</button></motion.div>:<form onSubmit={submit}><div className="form-head"><h3>Tell us about your project</h3><p>We’ll get back to you within 24 hours.</p></div><div className="form-grid"><label>Name<input required name="name" placeholder="Your name"/></label><label>Company<input name="company" placeholder="Company name"/></label><label>Email<input required name="email" type="email" placeholder="you@company.com"/></label><label>Phone<input name="phone" type="tel" placeholder="+1 234 567 890"/></label><label>Service needed<select required defaultValue=""><option value="" disabled>Select a service</option>{["Web Development","Mobile App","Custom Software","Cybersecurity","Cloud / DevOps","AI & Automation","IT Support","UI/UX","Other"].map(x=><option key={x}>{x}</option>)}</select></label><label>Estimated budget<select required defaultValue=""><option value="" disabled>Select a range</option>{["Under $5K","$5K–$15K","$15K–$30K","$30K–$50K","$50K+"].map(x=><option key={x}>{x}</option>)}</select></label><label className="full">Project description<textarea required rows={4} placeholder="What are you looking to build or improve?"/></label></div><button className="btn btn-primary submit" type="submit">Let’s Build It <Send size={17}/></button><small className="privacy-note">By submitting, you agree to our privacy policy. No spam—ever.</small></form>}</div></div></section>

      <footer><div className="section footer-top"><div className="footer-brand"><a className="brand" href="#top"><span className="brand-mark"><i/><i/><i/></span><b>NEXORA</b><small>IT</small></a><p>Your all-in-one technology partner for building, securing and scaling what’s next.</p><div className="socials">{[Users,Code2,Star,X].map((Icon,i)=><a href="#top" aria-label={["LinkedIn","GitHub","Instagram","X"][i]} key={i}><Icon size={17}/></a>)}</div></div>{[["Services","Web Development","Mobile Development","Software Development","UI/UX Design","Cybersecurity","Cloud & DevOps","AI & Automation"],["Solutions","Startups","SMEs","Enterprise","E-commerce","SaaS"],["Company","About","Work","Process","Careers","Contact"],["Resources","Blog","Case Studies","FAQ","Insights"]].map(([title,...links])=><div className="footer-col" key={title}><b>{title}</b>{links.map(x=><a href={x==="Contact"?"#contact":"#top"} key={x}>{x}</a>)}</div>)}</div><div className="footer-bottom"><span>© {new Date().getFullYear()} NEXORA IT. All rights reserved.</span><div><a href="#top">Privacy Policy</a><a href="#top">Terms</a><a href="#top">Cookies</a></div><a href="#top">Back to top ↑</a></div></footer>
    </main>
  );
}

export default function Home() {
  return <App />;
}
