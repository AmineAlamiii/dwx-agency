"use client";

import "./components/craft.css";
import "./components/business-first.css";
import "./components/velocity.css";
import "./components/agency-upgrade.css";
import { IndustryShowcase } from "./components/industry-demos";
import { AssistantSection } from "./components/support-chat";
import { TechnologyShowcase, ClientConfidence } from "./components/technology-showcase";
import { BusinessVelocity } from "./components/business-velocity";
import {
  TrustStatement,
  BusinessOutcomes,
  WhyDwx,
  WebsiteReview,
} from "./components/conversion-sections";
import { InquiryForm } from "./components/inquiry-form";
import { LeadTracking } from "./components/lead-tracking";
import { privacyPagePath } from "./site-path";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Menu,
  Sparkles,
  X,
} from "lucide-react";

import { ChoiceTabs, MotionRuntime, Reveal } from "./components/motion-system";
import {
  DesignDemo,
  BuildDemo,
  AssistDemo,
  OperationsDemo,
  RentalDemo,
} from "./components/product-previews";

const growthPaths = [
  {
    label: "More customers",
    cta: "Request a website review",
    issue: "Visitors leave without taking the next step.",
    headline: "Turn attention into action.",
    copy: "Clarify your offer, remove the hesitation, and make the path from first visit to enquiry feel natural.",
    focus: "A better website",
    brief:
      "I'd like to improve how our website turns visitors into enquiries or customers.",
    steps: ["Understand the offer", "Find the right fit", "Take the next step"],
    outcome: "A clearer path to becoming a customer.",
    detail:
      "Messaging, experience design and a website built around the decision your customer needs to make.",
  },
  {
    label: "Less busywork",
    cta: "Discuss my workflow",
    issue: "Your team spends too much time moving work around.",
    headline: "Give good people their time back.",
    copy: "Connect the tools, knowledge and repetitive tasks that slow your team down. Keep people in charge of the decisions that matter.",
    focus: "AI & automation",
    brief:
      "I'd like to reduce repetitive work and connect our business workflows with useful automation.",
    steps: ["Connect the context", "Prepare the work", "Review and approve"],
    outcome: "Less chasing. More meaningful work.",
    detail:
      "Connected workflows, internal tools and practical AI, with clear permissions and human review.",
  },
  {
    label: "Room to grow",
    cta: "Plan my next improvement",
    issue: "Your product is making growth harder than it should be.",
    headline: "Build for your next chapter.",
    copy: "Untangle the platform, improve the experience and give your team a foundation they can confidently keep building on.",
    focus: "Engineering",
    brief:
      "I'd like to improve our existing platform so it can support our next stage of growth.",
    steps: [
      "Find the constraints",
      "Strengthen the foundation",
      "Release with confidence",
    ],
    outcome: "A product that can move with your business.",
    detail:
      "A focused platform review, a practical roadmap and improvements delivered in manageable stages.",
  },
];

const capabilities = [
  {
    name: "Websites & online stores",
    title: "Help customers choose.\nMake action easy.",
    description:
      "Help people understand your offer, trust your business and take the next step. We bring clarity to the journeys that turn interest into customers.",
    items: [
      "Business websites & landing pages",
      "Online stores & customer journeys",
      "Booking & enquiry experiences",
      "Clear messaging & mobile design",
    ],
    label: "An example of a booking experience built around a restaurant.",
  },
  {
    name: "Custom software",
    title: "Software that fits\nthe way you work.",
    description:
      "Give your business software it can rely on. We connect your systems, remove technical bottlenecks and build a foundation your team can keep improving.",
    items: [
      "Customer portals & business apps",
      "Dashboards & internal tools",
      "Connected business systems",
      "Performance & reliable releases",
    ],
    label: "An example of court availability and player bookings.",
  },
  {
    name: "AI & automation",
    title: "Less busywork.\nMore possibility.",
    description:
      "Give your team more time for the work that needs them. We connect knowledge and automate repetitive steps, with clear boundaries and people in control.",
    items: [
      "Find answers in company documents",
      "Prepare repetitive tasks automatically",
      "Connect information across your tools",
      "Keep people in control of decisions",
    ],
    label: "A first conversation, with a clear route to your team.",
  },
];
const faqs = [
  [
    "What can you help my business improve?",
    "We build business websites, online stores, custom software and useful automation. You can start with a goal—more enquiries, easier bookings, less manual work or a new product—and we’ll help define the right solution.",
  ],
  [
    "How much does a project cost?",
    "Cost depends on the scope, content, integrations and level of support. We discuss your priorities first, then propose a scope and estimate before work begins. For an existing website, a focused improvement may be more appropriate than a full rebuild.",
  ],
  [
    "How long will it take?",
    "We agree on a timeline after understanding the scope and what is already available. Content, feedback and integrations all affect delivery. Your proposal sets out milestones and responsibilities so you know what to expect.",
  ],
  [
    "Can you improve our existing website or software?",
    "Yes. We can review what you have, identify the main obstacles and prioritize improvements. We only recommend rebuilding when the existing foundation makes the agreed goal impractical.",
  ],
  [
    "Do we own the website and code?",
    "Access, source code, intellectual property and any third-party licences are addressed in the proposal before you commit. The handover plan explains what you receive and how your team can operate the work.",
  ],
  [
    "Can you help with content and work with our team?",
    "Yes. We can help clarify the message and structure the customer journey, then agree on responsibility for writing, imagery and translations. We can also work alongside your existing designers, developers or marketing team.",
  ],
  [
    "What happens after I contact you?",
    "We review your business goal and contact you to understand the situation. Then we discuss the right approach and prepare a proposal when there is a fit. Sending an enquiry does not commit you to a project.",
  ],
  [
    "What happens after launch?",
    "We agree on documentation, handover and support before launch. Depending on your needs, that can include maintenance, training or ongoing improvements. You will know what is included and what is optional.",
  ],
];

function Brand({ large = false }: { large?: boolean }) {
  return (
    <span className={`brand-lockup ${large ? "large" : ""}`}>
      <svg viewBox="0 0 44 34" fill="none" aria-hidden="true">
        <path
          d="M3 29 31 5M3 5l28 24M17 17h24"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      </svg>
      <span>
        Dwx<span className="brand-agency"> Agency</span>
      </span>
    </span>
  );
}
function LinkButton({
  children,
  href,
  secondary = false,
  onClick,
}: {
  children: React.ReactNode;
  href: string;
  secondary?: boolean;
  onClick?: () => void;
}) {
  return (
    <a
      className={`pill ${secondary ? "secondary" : "luminous-button"}`}
      href={href}
      onClick={onClick}
    >
      <span className="pill-label">{children}</span>
      <ArrowUpRight size={17} />
    </a>
  );
}
export default function Home() {
  const reduced = useReducedMotion();
  const [word, setWord] = useState(0);
  const [mobile, setMobile] = useState(false);
  const [menu, setMenu] = useState(false);
  const [menuPreview, setMenuPreview] = useState(0);
  const [heroTab, setHeroTab] = useState(0);
  const [service, setService] = useState(0);
  const [faq, setFaq] = useState(-1);
  const menuClose = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [motionPaused, setMotionPaused] = useState(false);
  const [growthPath, setGrowthPath] = useState(0);
  const [growthOpen, setGrowthOpen] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);
  const [briefRevision, setBriefRevision] = useState(0);
  const growthTrigger = useRef<HTMLButtonElement>(null);
  const suggestedMessage = useRef<string | null>(null);
  const [brief, setBrief] = useState({
    name: "",
    email: "",
    focus: "Something else",
    message: "",
    website: "",
  });
  const words = ["simpler.", "smarter.", "stronger."];
  useEffect(() => {
    if (reduced || motionPaused) return;
    const timer = setInterval(() => {
      if (!document.hidden) setWord((x) => (x + 1) % 3);
    }, 3800);
    return () => clearInterval(timer);
  }, [reduced, motionPaused]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobile(false);
        setMenu(false);
        setGrowthOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => {
    const outside = (e: MouseEvent) => {
      if (!(e.target as Element).closest(".nav-dropdown")) setMenu(false);
    };
    document.addEventListener("click", outside);
    return () => document.removeEventListener("click", outside);
  }, []);
  useEffect(() => {
    const actionAreas = [
      document.getElementById("contact"),
      document.getElementById("review"),
      document.querySelector<HTMLElement>(".hero-actions"),
    ].filter((area): area is HTMLElement => Boolean(area));
    const visible = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) =>
          entry.isIntersecting
            ? visible.add(entry.target)
            : visible.delete(entry.target),
        );
        setContactVisible(visible.size > 0);
      },
      { threshold: 0 },
    );
    actionAreas.forEach((area) => observer.observe(area));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!growthOpen) return;
    const trigger = growthTrigger.current;
    const panel = document.getElementById("growth-dialog");
    panel?.querySelector<HTMLElement>("button")?.focus();
    const outside = (event: PointerEvent) => {
      const target = event.target as Element;
      if (
        !target.closest(".growth-dock") &&
        !target.closest(".growth-nav-trigger")
      )
        setGrowthOpen(false);
    };
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("pointerdown", outside);
      trigger?.focus({ preventScroll: true });
    };
  }, [growthOpen]);
  const startBrief = (focus: string, suggestion: string) => {
    const form = document.querySelector<HTMLFormElement>(".contact-form form");
    const values = form ? new FormData(form) : null;
    const currentMessage = values
      ? String(values.get("message") || "")
      : brief.message;
    const useSuggestion =
      !currentMessage || currentMessage === suggestedMessage.current;
    if (useSuggestion) suggestedMessage.current = suggestion;
    setBrief({
      name: values ? String(values.get("name") || "") : brief.name,
      email: values ? String(values.get("email") || "") : brief.email,
      focus,
      website: values ? String(values.get("website") || "") : brief.website,
      message: useSuggestion ? suggestion : currentMessage,
    });
    setBriefRevision((value) => value + 1);
    setGrowthOpen(false);
  };
  const startGrowthBrief = () =>
    startBrief(growthPaths[growthPath].focus, growthPaths[growthPath].brief);
  const chooseService = (i: number) => {
    setService(i);
    setMenu(false);
    setMobile(false);
  };
  return (
    <MotionRuntime paused={motionPaused}>
      <main
        className={motionPaused ? "motion-paused" : ""}
        onClick={(event) => {
          if (
            event.button !== 0 ||
            event.metaKey ||
            event.ctrlKey ||
            event.altKey ||
            event.shiftKey
          )
            return;
          const anchor = (event.target as Element).closest<HTMLAnchorElement>(
            "a[href^='#']",
          );
          const href = anchor?.getAttribute("href");
          const destination = href
            ? document.getElementById(href.slice(1))
            : null;
          if (!href || !destination) return;
          event.preventDefault();
          event.stopPropagation();
          if (window.location.hash !== href)
            window.history.pushState(window.history.state, "", href);
          requestAnimationFrame(() =>
            destination.scrollIntoView({
              behavior: reduced ? "auto" : "smooth",
              block: "start",
            }),
          );
        }}
      >
        <a className="skip-link" href="#content">
          Skip to content
        </a>
        <LeadTracking />
        <header className="site-header">
          <nav className="nav-shell shell" aria-label="Main navigation">
            <a href="#top" aria-label="Dwx Agency home">
              <Brand />
            </a>
            <div className="desktop-nav">
              <div className="nav-dropdown"
                onPointerEnter={e=>{if(e.pointerType!=="mouse")return;if(menuClose.current)clearTimeout(menuClose.current);setMenu(true);}}
                onPointerLeave={e=>{if(e.pointerType!=="mouse")return;menuClose.current=setTimeout(()=>setMenu(false),160);}}
                onFocus={()=>{if(menuClose.current)clearTimeout(menuClose.current);setMenu(true);}}
                onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget as Node))setMenu(false);}}
              >
                <button
                  className={menu ? "nav-active" : ""}
                  onClick={() => setMenu(true)}
                  aria-expanded={menu}
                  aria-controls="capability-menu"
                >
                  Services
                  <ChevronDown size={14} />
                </button>
                <AnimatePresence>
                  {menu && (
                    <motion.div
                      id="capability-menu"
                      className="mega-menu"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.18 }}
                    >
                      <div className="mega-options">
                        {capabilities.map((x, i) => (
                          <a
                            key={x.name}
                            href="#services"
                            className={menuPreview === i ? "selected" : ""}
                            onMouseEnter={() => setMenuPreview(i)}
                            onFocus={() => setMenuPreview(i)}
                            onClick={() => chooseService(i)}
                          >
                            <b>{x.name}</b>
                            <span>
                              {
                                [
                                  "Experiences that make sense.",
                                  "Software that goes the distance.",
                                  "AI that moves work forward.",
                                ][i]
                              }
                            </span>
                          </a>
                        ))}
                        <a href="#review" className={menuPreview===3?"selected":""} onMouseEnter={()=>setMenuPreview(3)} onFocus={()=>setMenuPreview(3)} onClick={() => setMenu(false)}>
                          <b>Website review</b>
                          <span>Find what could be working better.</span>
                        </a>
                      </div>
                      <div className={`mega-preview preview-${menuPreview}`}>
                        <AnimatePresence mode="wait">
                          <motion.div
                            className="mega-live-preview"
                            key={menuPreview}
                            initial={
                              reduced
                                ? false
                                : { opacity: 0, y: 10, scale: 0.98 }
                            }
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -8, scale: 0.98 }}
                            transition={{ duration: 0.23 }}
                          >
                            {menuPreview === 0 ? (
                              <DesignDemo />
                            ) : menuPreview === 1 ? (
                              <BuildDemo compact />
                            ) : menuPreview === 2 ? (
                              <AssistDemo />
                            ) : <div className="menu-review-preview"><span className="eyebrow">A CLEARER NEXT STEP</span><h3>Your website should work as hard as you do.</h3><p>We review the message, mobile journey and path to enquiry, then discuss where to focus.</p><ul><li><Check size={15}/>Offer & clarity</li><li><Check size={15}/>Mobile experience</li><li><Check size={15}/>Customer actions</li></ul><a href="#review" onClick={()=>setMenu(false)}>Explore a website review<ArrowUpRight size={16}/></a></div>}
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <a href="#work">Solutions</a>
              <a href="#assistant">Ask Dwx</a>
              <a href="#review">Website review</a>
              <a href="#stay-ahead">Stay ahead</a>
              <a href="#about">Why Dwx</a>
            </div>
            <div className="nav-actions">
              <button
                className="growth-nav-trigger"
                onClick={() => setGrowthOpen(true)}
                aria-expanded={growthOpen}
                aria-controls="growth-dialog"
              >
                Website not converting?
              </button>
              <LinkButton href="#contact">Discuss my business</LinkButton>
            </div>
            <button
              className="menu-toggle"
              onClick={() => setMobile((x) => !x)}
              aria-label={mobile ? "Close menu" : "Open menu"}
              aria-expanded={mobile}
              aria-controls="mobile-menu"
            >
              {mobile ? <X /> : <Menu />}
            </button>
          </nav>
          <AnimatePresence>
            {mobile && (
              <motion.div
                className="mobile-menu"
                id="mobile-menu"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
              >
                {[
                  ["Services", "services"],
                  ["Business solutions", "work"],
                  ["Ask Dwx Assist", "assistant"],
                  ["Technologies", "technologies"],
                  ["Website review", "review"],
                  ["Stay ahead", "stay-ahead"],
                  ["Approach", "process"],
                  ["Why Dwx", "about"],
                  ["Discuss my business", "contact"],
                ].map(([label, id]) => (
                  <a key={id} href={`#${id}`} onClick={() => setMobile(false)}>
                    {label}
                    <ArrowUpRight size={20} />
                  </a>
                ))}
                <span>Casablanca. Working everywhere.</span>
              </motion.div>
            )}
          </AnimatePresence>
        </header>
        <div id="content" />
        <section className="hero shell" id="top">
          <motion.div
            className="hero-copy"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <a href="#about" className="announcement">
              <span>Casablanca, Morocco</span> Working worldwide
              <ArrowUpRight size={14} />
            </a>
            <h1 aria-label="Win more customers. Make business simpler.">
              Win more customers.
              <br />
              <span className="hero-line">
                <span>Make business</span>
                <span className="word-slot">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      className={`hero-word word-${word}`}
                      key={word}
                      initial={
                        reduced
                          ? false
                          : { opacity: 0, y: 14, filter: "blur(0px)" }
                      }
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={
                        reduced
                          ? { opacity: 0 }
                          : { opacity: 0, y: -12, filter: "blur(0px)" }
                      }
                      transition={{ duration: 0.45 }}
                    >
                      {words[word]}
                      <span className="word-underline" aria-hidden="true" />
                    </motion.span>
                  </AnimatePresence>
                </span>
              </span>
            </h1>
            <p>
              We build websites, online stores and software around what your
              business needs: more enquiries, easier sales and less admin.
            </p>
            <div className="hero-actions">
              <LinkButton href="#contact">Discuss my project</LinkButton>
              <LinkButton href="#growth" secondary>
                What can you do for me?
              </LinkButton>
            </div>
          </motion.div>
          <div className="hero-reassurance">
            <span>
              <Check size={14} />
              Scope & cost before you commit
            </span>
            <span>
              <Check size={14} />
              New build or focused improvements
            </span>
          </div>
          <ChoiceTabs
            className="hero-demo-tabs"
            label="Explore our capabilities"
            prefix="hero-tab"
            panel={(i) => `hero-demo-${i}`}
            labels={["Restaurant", "Padel club", "Car rental"]}
            selected={heroTab}
            onSelect={setHeroTab}
          />
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={heroTab}
              className="hero-deck"
              aria-label="Interactive product explorations"
              initial={reduced ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {[
                <DesignDemo key="design" />,
                <OperationsDemo key="build" />,
                <RentalDemo key="rental" />,
              ].map((demo, i) => (
                <article
                  key={i}
                  id={`hero-demo-${i}`}
                  className={`hero-demo demo-${i} ${heroTab === i ? "mobile-active" : ""}`}
                  aria-labelledby={`hero-tab-${i}`}
                >
                  <div className="demo-surface">{demo}</div>
                  <a href="#work">
                    <span>
                      {
                        [
                          "A calmer restaurant service",
                          "A simpler way to book a court",
                          "Your fleet, ready for the next booking",
                        ][i]
                      }
                    </span>
                    <ArrowUpRight size={17} />
                  </a>
                </article>
              ))}
            </motion.div>
          </AnimatePresence>
          <div className="hero-note">
            <span>Interactive examples · Explore what’s possible</span>
            <button
              aria-label={
                motionPaused
                  ? "Resume live animations"
                  : "Pause live animations"
              }
              onClick={() => setMotionPaused((x) => !x)}
            >
              {motionPaused ? "Play motion" : "Pause motion"}
            </button>
          </div>
        </section>
        <TrustStatement />
        <BusinessOutcomes onRequest={startBrief} />
        <IndustryShowcase onRequest={startBrief} />
        <AssistantSection onRequest={startBrief} />
        <section
          className="capabilities-section shell section-pad"
          id="services"
        >
          <Reveal className="section-heading">
            <span className="eyebrow">WHAT YOUR BUSINESS CAN GET</span>
            <h2>
              One partner.
              <br />
              <span>From idea to launch.</span>
            </h2>
          </Reveal>
          <ChoiceTabs
            className="capability-tabs"
            label="Capabilities"
            prefix="cap-tab"
            panel="capability-panel"
            labels={["Websites", "Software", "Automation"]}
            selected={service}
            onSelect={setService}
          />
          <div
            className="capability-content"
            role="tabpanel"
            id="capability-panel"
            aria-labelledby={`cap-tab-${service}`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={service}
                className="capability-copy"
                initial={reduced ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <span className="eyebrow">{capabilities[service].name}</span>
                <h3>{capabilities[service].title}</h3>
                <p>{capabilities[service].description}</p>
                <ul>
                  {capabilities[service].items.map((x) => (
                    <li key={x}>
                      <Check size={16} />
                      {x}
                    </li>
                  ))}
                </ul>
                <LinkButton
                  href="#contact"
                  onClick={() =>
                    startBrief(
                      ["A better website", "Engineering", "AI & automation"][
                        service
                      ],
                      [
                        "I'd like to improve the experience of our website or digital product.",
                        "I'd like to discuss the engineering of our product or platform.",
                        "I'd like to use AI and automation to make our team's work easier.",
                      ][service],
                    )
                  }
                >
                  Talk about your project
                </LinkButton>
              </motion.div>
            </AnimatePresence>
            <div className={`capability-visual visual-${service}`}>
              <div className="visual-corners" />
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  className="capability-demo"
                  key={service}
                  initial={reduced ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: reduced ? 0 : 0.3 }}
                >
                  {service === 0 ? (
                    <DesignDemo />
                  ) : service === 1 ? (
                    <OperationsDemo />
                  ) : (
                    <AssistDemo />
                  )}
                </motion.div>
              </AnimatePresence>
              <span className="visual-caption">
                {capabilities[service].label}
              </span>
            </div>
          </div>
        </section>
        <TechnologyShowcase />
        <BusinessVelocity paused={motionPaused} onToggleMotion={() => setMotionPaused((value) => !value)} onRequest={startBrief} />
        <WhyDwx />
        <ClientConfidence />
        <WebsiteReview onRequest={startBrief} />
        <section className="process-section shell section-pad" id="process">
          <Reveal className="section-heading heading-inline">
            <div>
              <span className="eyebrow">HOW WE WORK</span>
              <h2>
                From the first conversation
                <br />
                <span>to a working solution.</span>
              </h2>
            </div>
            <p>
              Understand what happens next, what you receive and where your
              decisions shape the work.
            </p>
          </Reveal>
          <div className="process-grid">
            {[
              [
                "Understand",
                "Find the right problem.",
                "We learn what your customers and team need, then agree on what success looks like.",
                "A clear brief, scope and priorities.",
              ],
              [
                "Shape",
                "Make the direction tangible.",
                "Page layouts, a prototype and a practical plan make the solution tangible before development.",
                "A prototype and a practical delivery roadmap.",
              ],
              [
                "Build",
                "Bring the details together.",
                "You review working versions as we design and develop, so decisions happen while the work takes shape.",
                "A working release you can review as it develops.",
              ],
              [
                "Evolve",
                "Learn from the real world.",
                "We launch, hand over what you need and agree on any ongoing improvements.",
                "A clear handover and a plan for what comes next.",
              ],
            ].map(([title, subtitle, copy, outcome], i) => (
              <Reveal key={title} className="process-step" delay={i * 0.065}>
                <span className="process-number">
                  0{i + 1}
                  <span className="process-marker" aria-hidden="true" />
                </span>
                <h3>{title}</h3>
                <b>{subtitle}</b>
                <p>{copy}</p>
                <div className="process-output">
                  <span>YOU GET</span>
                  <p>{outcome}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
        <section className="faq-section shell section-pad" id="questions">
          <Reveal className="section-heading">
            <span className="eyebrow">A FEW USEFUL ANSWERS</span>
            <h2>
              Before we
              <br />
              <span>get started.</span>
            </h2>
            <a className="inline-link" href="mailto:hello@dwx.agency">
              Ask us something else
              <ArrowUpRight size={17} />
            </a>
          </Reveal>
          <div className="faq-list">
            {faqs.map(([question, answer], i) => (
              <div className="faq-item" key={question}>
                <button
                  onClick={() => setFaq(faq === i ? -1 : i)}
                  aria-expanded={faq === i}
                  aria-controls={`faq-answer-${i}`}
                  id={`faq-question-${i}`}
                >
                  <span>{question}</span>
                  <svg
                    className="faq-symbol"
                    width="19"
                    height="19"
                    viewBox="0 0 19 19"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3.5 9.5h12"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                    />
                    <motion.path
                      d="M9.5 3.5v12"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      initial={false}
                      animate={{
                        opacity: faq === i ? 0 : 1,
                        scaleY: faq === i ? 0 : 1,
                      }}
                      transition={{ duration: reduced ? 0 : 0.25 }}
                      style={{ transformOrigin: "center" }}
                    />
                  </svg>
                </button>
                <AnimatePresence initial={false}>
                  {faq === i && (
                    <motion.div
                      id={`faq-answer-${i}`}
                      role="region"
                      aria-labelledby={`faq-question-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: reduced ? 0 : 0.35,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <p>{answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>
        <motion.section
          className="contact-banner shell"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.75 }}
        >
          <div className="banner-grid" />
          <span className="eyebrow">YOUR BUSINESS HAS A NEXT STEP</span>
          <h2>
            More enquiries. Less admin.
            <br />A better way to do business.
          </h2>
          <p>
            Tell us what you want to improve. We’ll help you decide where to
            start.
          </p>
          <LinkButton href="#contact" secondary>
            Discuss my business
          </LinkButton>
          <div className="banner-footer">
            <span>Strategy</span>
            <span>Design</span>
            <span>Engineering</span>
            <span>Intelligence</span>
          </div>
        </motion.section>
        <section className="contact-section shell section-pad" id="contact">
          <Reveal className="contact-copy">
            <span className="eyebrow">START A CONVERSATION</span>
            <h2>
              Let’s talk about
              <br />
              <span>your business.</span>
            </h2>
            <p>
              Tell us what you want to improve. We’ll discuss what’s worth
              building, what it involves and what it could cost.
            </p>
            <a className="contact-email" href="mailto:hello@dwx.agency">
              hello@dwx.agency
              <ArrowUpRight size={21} />
            </a>
            <span className="contact-location">
              Casablanca, Morocco
              <br />
              Open to projects worldwide.
            </span>
            <div className="contact-expectations">
              <b>A conversation, not a commitment.</b>
              <p>
                First, we understand your business. Then we agree on the right
                scope and a proposal. You decide whether to move forward.
              </p>
            </div>
          </Reveal>
          <Reveal className="contact-form" delay={0.08}>
            <InquiryForm key={briefRevision} initial={brief} />
          </Reveal>
        </section>
        <footer className="site-footer">
          <Reveal className="shell footer-main">
            <div className="footer-brand">
              <a href="#top" aria-label="Dwx Agency home">
                <Brand />
              </a>
              <p>
                Websites. Software. Useful automation.
                <br />
                Built around your business.
              </p>
            </div>
            <div className="footer-column">
              <b>Explore</b>
              <a href="#services">Services</a>
              <a href="#work">Business solutions</a>
              <a href="#assistant">Ask Dwx Assist</a>
              <a href="#technologies">Technologies</a>
              <a href="#process">Our approach</a>
              <a href="#about">Why Dwx</a>
            </div>
            <div className="footer-column">
              <b>Build with us</b>
              <a href="#contact">Discuss my business</a>
              <a href="#growth">What we can do for you</a>
              <a href="mailto:hello@dwx.agency">
                Email the team
                <ArrowUpRight size={13} />
              </a>
            </div>
            <div className="footer-statement">
              <span>
                Independent minds.
                <br />
                Connected thinking.
              </span>
              <p>
                Casablanca, Morocco.
                <br />
                Working everywhere.
              </p>
            </div>
          </Reveal>
          <div className="shell footer-bottom">
            <span>© 2026 Dwx Agency</span>
            <a href={privacyPagePath()}>Privacy information</a>
            <a href="#top">
              Back to top
              <ArrowUpRight size={14} />
            </a>
          </div>
          <div className="footer-wordmark shell" aria-hidden="true">
            dwx<span>®</span>
          </div>
        </footer>
        <div className="growth-dock">
          <AnimatePresence>
            {growthOpen && (
              <motion.aside
                id="growth-dialog"
                className="growth-dialog"
                role="dialog"
                aria-modal="false"
                aria-labelledby="growth-dialog-title"
                initial={
                  reduced
                    ? false
                    : { opacity: 0, y: 18, scale: 0.94, filter: "blur(0px)" }
                }
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 14, scale: 0.96, filter: "blur(0px)" }}
                transition={{ type: "spring", stiffness: 340, damping: 30 }}
              >
                <div className="growth-dialog-top">
                  <span className="eyebrow">A BETTER NEXT MOVE</span>
                  <button
                    onClick={() => setGrowthOpen(false)}
                    aria-label="Close growth guide"
                  >
                    <X size={17} />
                  </button>
                </div>
                <h3 id="growth-dialog-title">
                  Website not converting?
                  <br />
                  <span>Let’s find a starting point.</span>
                </h3>
                <p>What would make the biggest difference?</p>
                <div className="growth-dialog-options">
                  {growthPaths.map((item, i) => (
                    <button
                      key={item.label}
                      aria-pressed={growthPath === i}
                      onClick={() => setGrowthPath(i)}
                    >
                      {item.label}
                      {growthPath === i ? (
                        <Check size={14} />
                      ) : (
                        <ArrowUpRight size={14} />
                      )}
                    </button>
                  ))}
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    className="growth-dialog-answer"
                    key={growthPath}
                    initial={reduced ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                  >
                    <b>{growthPaths[growthPath].headline}</b>
                    <p>{growthPaths[growthPath].detail}</p>
                  </motion.div>
                </AnimatePresence>
                <LinkButton href="#contact" onClick={startGrowthBrief}>
                  {growthPaths[growthPath].cta}
                </LinkButton>
                <small>Clear scope and cost, agreed before work starts.</small>
              </motion.aside>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {(!contactVisible || growthOpen) && (
              <motion.button
                ref={growthTrigger}
                className={`growth-trigger ${growthOpen ? "is-open" : ""}`}
                onClick={() => setGrowthOpen((value) => !value)}
                aria-expanded={growthOpen}
                aria-controls="growth-dialog"
                initial={reduced ? false : { opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                whileHover={reduced ? {} : { y: -3 }}
                whileTap={reduced ? {} : { scale: 0.97 }}
                transition={{
                  duration: reduced ? 0 : 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <span className="growth-trigger-symbol">
                  {growthOpen ? <X size={16} /> : <Sparkles size={16} />}
                </span>
                <span>
                  {growthOpen ? "Close guide" : "Website not converting?"}
                </span>
                <ArrowUpRight size={15} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
        <AnimatePresence>
          {!contactVisible && !mobile && (
            <motion.div
              className="mobile-project-dock"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: reduced ? 0 : 0.2 }}
            >
              <span>
                Have a business goal?
                <small>Let’s work out the next step.</small>
              </span>
              <a className="pill" href="#contact">
                Discuss my project
                <ArrowUpRight size={17} />
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </MotionRuntime>
  );
}
