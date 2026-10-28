"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  FileText,
  ListChecks,
  Radio,
  ShieldCheck,
  Target,
  ShoppingBag,
  Workflow,
} from "lucide-react";
import { ChoiceTabs, Reveal } from "./motion-system";

export function TrustStatement() {
  return (
    <section className="trust-statement shell" aria-label="Client trust">
      <span className="trust-mark" aria-hidden="true">
        <svg viewBox="0 0 32 32" fill="none">
          <path
            d="M16 3v26M4.74 9.5l22.52 13M4.74 22.5l22.52-13"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <p>
        Trusted by entrepreneurs
        <br className="trust-break" /> and artists in <strong>Morocco.</strong>
      </p>
      <a href="#work">
        See the work
        <ArrowUpRight size={16} />
      </a>
    </section>
  );
}

const businessGoals = [
  {
    icon: Target,
    title: "Turn visits into enquiries.",
    problem: "People find you. Do they contact you?",
    solution:
      "A website that explains your offer, builds trust and makes contacting you easy.",
    deliverables: [
      "Clear message & service pages",
      "Simple enquiries & bookings",
    ],
    action: "Improve my website",
    focus: "A better website",
    brief:
      "I'd like a website that explains our business clearly and makes it easier for visitors to enquire or book.",
  },
  {
    icon: ShoppingBag,
    title: "Make buying from you easier.",
    problem: "Ready to sell beyond your storefront?",
    solution:
      "An online store built for the way your customers browse, choose and buy on their phones.",
    deliverables: [
      "Product pages & mobile shopping",
      "Payments & checkout integration",
    ],
    action: "Build my online store",
    focus: "A new product",
    brief:
      "I'd like to create or improve an online store, with clear product pages and an easier mobile shopping experience.",
  },
  {
    icon: Workflow,
    title: "Spend less time on admin.",
    problem: "Too much chasing, copying and updating?",
    solution:
      "Custom tools and practical automation that connect your work and help your team get more done.",
    deliverables: [
      "Customer portals & team dashboards",
      "Connected workflows & useful AI",
    ],
    action: "Simplify my operations",
    focus: "AI & automation",
    brief:
      "I'd like to reduce repetitive admin and connect our team, customer information and business workflows.",
  },
];

export function BusinessOutcomes({
  onRequest,
}: {
  onRequest: (focus: string, message: string) => void;
}) {
  return (
    <section className="business-outcomes shell section-pad" id="growth">
      <Reveal className="section-heading heading-inline">
        <div>
          <span className="eyebrow">WHAT WE CAN DO FOR YOU</span>
          <h2>
            What would help
            <br />
            <span>your business grow?</span>
          </h2>
        </div>
        <p>
          Start with what you want to change. We’ll turn that goal into the
          right website, store or software.
        </p>
      </Reveal>
      <div className="outcome-grid">
        {businessGoals.map((goal, i) => {
          const Icon = goal.icon;
          return (
            <Reveal key={goal.title} className={`outcome-card outcome-${i}`}>
              <div className="outcome-card-top">
                <Icon size={23} strokeWidth={1.4} />
                <span>0{i + 1}</span>
              </div>
              <h3>{goal.title}</h3>
              <p className="outcome-problem">{goal.problem}</p>
              <p className="outcome-solution">{goal.solution}</p>
              <ul>
                {goal.deliverables.map((item) => (
                  <li key={item}>
                    <Check size={15} />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                onClick={() => onRequest(goal.focus, goal.brief)}
              >
                {goal.action}
                <ArrowUpRight size={19} />
              </a>
            </Reveal>
          );
        })}
      </div>
      <div className="outcome-next-step">
        <p>
          <b>Not sure what you need yet?</b> Bring us the problem. We’ll help
          you choose a starting point.
        </p>
        <a
          className="inline-link"
          href="#contact"
          onClick={() =>
            onRequest(
              "Something else",
              "I'd like help choosing the right digital improvement for my business.",
            )
          }
        >
          Talk it through with Dwx
          <ArrowUpRight size={17} />
        </a>
      </div>
    </section>
  );
}

const reasons = [
  {
    icon: FileText,
    title: "Know what you’re getting.",
    copy: "We define the scope, priorities and responsibilities before delivery begins. You can see what’s included and what comes next.",
    artifact: "THE PROJECT PLAN",
    rows: [
      "Business goal & success criteria",
      "Scope, milestones & responsibilities",
      "Estimate & agreed next steps",
    ],
  },
  {
    icon: Radio,
    title: "See progress, as it happens.",
    copy: "Review real work with the people building it. Design decisions and technical decisions stay in the same conversation.",
    artifact: "THE DELIVERY REVIEW",
    rows: [
      "Working release or prototype",
      "Feedback & decisions recorded",
      "Next priorities, clearly agreed",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Be ready to take it forward.",
    copy: "Ownership, handover and support are discussed before launch. Your business gets a clear path to operating and improving the work.",
    artifact: "THE LAUNCH HANDOVER",
    rows: [
      "Access & ownership agreed",
      "Documentation & handover plan",
      "Support options & next priorities",
    ],
  },
];

export function WhyDwx() {
  const [reason, setReason] = useState(0);
  const current = reasons[reason];
  const Icon = current.icon;
  const reduced = useReducedMotion();
  return (
    <section className="why-section shell section-pad" id="about">
      <Reveal className="section-heading heading-inline">
        <div>
          <span className="eyebrow">WHY DWX</span>
          <h2>
            Great work.
            <br />
            <span>A clear way to get there.</span>
          </h2>
        </div>
        <p>
          A business investment deserves more than a good-looking screen. It
          deserves clarity, direct conversations and a plan you can follow.
        </p>
      </Reveal>
      <ChoiceTabs
        className="why-tabs"
        label="Why work with Dwx"
        prefix="why-tab"
        panel="why-panel"
        labels={["Scope", "Progress", "Handover"]}
        selected={reason}
        onSelect={setReason}
      />
      <div id="why-panel" role="tabpanel" aria-labelledby={`why-tab-${reason}`}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            className="why-panel-content"
            key={reason}
            initial={reduced ? false : { opacity: 0, y: 9 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
          >
            <div className="why-panel-copy">
              <h3>{current.title}</h3>
              <p>{current.copy}</p>
              <a className="inline-link" href="#contact">
                Discuss how we could work together
                <ArrowUpRight size={16} />
              </a>
            </div>
            <div className="why-artifact">
              <div>
                <Icon size={17} />
                <span>{current.artifact}</span>
                <i>0{reason + 1}</i>
              </div>
              {current.rows.map((row, j) => (
                <span key={row} className="artifact-row">
                  <Check size={14} />
                  {row}
                  <b>0{j + 1}</b>
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="agency-note">
        <span className="agency-coordinate">
          <i />
          Casablanca, Morocco · Working worldwide
        </span>
        <p>Strategy, design and development in one conversation.</p>
        <a href="#contact">
          Talk directly with Dwx
          <ArrowUpRight size={16} />
        </a>
      </div>
    </section>
  );
}

const checks = [
  {
    question: "What should your website do better?",
    options: [
      "Bring more enquiries",
      "Sell more online",
      "Explain our business clearly",
    ],
    recommendation: [
      "Make the enquiry journey easier.",
      "Make choosing and buying easier.",
      "Make your offer easier to understand.",
    ],
    detail: [
      "Review your offer, trust signals and the steps between arriving and contacting you.",
      "Review product information, shopping on mobile and the steps to checkout.",
      "Review the first screen, service explanations and the evidence customers need to choose you.",
    ],
  },
  {
    question: "Where does it feel weakest?",
    options: [
      "People visit but don’t act",
      "The experience feels outdated",
      "I’m not sure yet",
    ],
    recommendation: [
      "Start with the customer’s decision.",
      "Start with clarity and usability.",
      "Start with a focused review.",
    ],
    detail: [
      "Check whether visitors can find the right service, understand its value and take a clear next step.",
      "Look at readability, mobile navigation and the tasks customers come to complete.",
      "Map what your customers need and what the current website makes difficult.",
    ],
  },
];

export function WebsiteReview({
  onRequest,
}: {
  onRequest: (focus: string, message: string) => void;
}) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([0, 0]);
  const stage = useRef<HTMLDivElement>(null);
  const interacted = useRef(false);
  const reduced = useReducedMotion();
  return (
    <section className="review-section shell" id="review">
      <Reveal className="review-intro">
        <span className="eyebrow">A USEFUL PLACE TO START</span>
        <h2>
          Your website should
          <br />
          <span>work for your business.</span>
        </h2>
        <p>
          If it looks good but brings little business, start by finding what’s
          getting in the way. Two quick questions can help you choose a
          direction.
        </p>
        <div className="review-promise">
          <ListChecks size={19} />
          <span>Clarity first. A rebuild only if it makes sense.</span>
        </div>
      </Reveal>
      <div className="review-tool">
        <div className="review-tool-top">
          <span>YOUR NEXT MOVE</span>
          <span>{step < 2 ? `0${step + 1} / 02` : "YOUR STARTING POINT"}</span>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            className="review-step"
            ref={stage}
            tabIndex={-1}
            aria-live="polite"
            onAnimationComplete={() => {
              if (interacted.current)
                stage.current?.focus({ preventScroll: true });
            }}
            key={step}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
          >
            {step < 2 ? (
              <>
                <h3>{checks[step].question}</h3>
                <div className="review-choices">
                  {checks[step].options.map((option, i) => (
                    <button
                      key={option}
                      onClick={() => {
                        interacted.current = true;
                        setAnswers((current) =>
                          current.map((a, j) => (j === step ? i : a)),
                        );
                        setStep(step + 1);
                      }}
                    >
                      {option}
                      <ArrowUpRight size={17} />
                    </button>
                  ))}
                </div>
                <small>
                  Pick the closest answer. No technical knowledge needed.
                </small>
              </>
            ) : (
              <>
                <span className="review-result-kicker">
                  BASED ON YOUR ANSWERS
                </span>
                <h3>{checks[0].recommendation[answers[0]]}</h3>
                <p>{checks[0].detail[answers[0]]}</p>
                <div className="review-result-detail">
                  <Check size={16} />
                  <span>
                    {checks[1].recommendation[answers[1]]}{" "}
                    {checks[1].detail[answers[1]]}
                  </span>
                </div>
                <a
                  className="pill"
                  href="#contact"
                  onClick={() =>
                    onRequest(
                      "A better website",
                      `I'd like a website review. My priority: ${checks[0].options[answers[0]].toLowerCase()}. Current concern: ${checks[1].options[answers[1]].toLowerCase()}.`,
                    )
                  }
                >
                  Request a website review
                  <ArrowUpRight size={17} />
                </a>
                <small>
                  We’ll discuss your website, the right scope and the cost
                  before any work begins.
                </small>
              </>
            )}
          </motion.div>
        </AnimatePresence>
        {step > 0 && (
          <button
            className="review-back"
            onClick={() => setStep(step === 2 ? 0 : step - 1)}
          >
            {step === 2 ? "Start again" : "Back to the first question"}
          </button>
        )}
      </div>
    </section>
  );
}
