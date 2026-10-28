"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ArrowRight, Check, CircleAlert, Gauge, LockKeyhole, Pause, Play, RefreshCw, ShieldCheck, Workflow } from "lucide-react";
import { GlobeVisual } from "./global-network";
import { ChoiceTabs, Reveal, useLivePreview } from "./motion-system";

const scenarios = [
  {
    label: "Speed", icon: Gauge, problem: "The page keeps them waiting.",
    action: "Less weight. A faster first impression.", outcome: "Ready when your customer is.",
    detail: "We streamline images, code and delivery so customers can get to what matters.",
    signals: ["Heavy images · delayed content", "Optimizing the critical path", "Content ready · next step clear"],
    focus: "A better website", brief: "I'd like to find and improve what is slowing down our website, especially on mobile.",
  },
  {
    label: "Reliability", icon: ShieldCheck, problem: "An enquiry goes nowhere.",
    action: "Find the failure. Check the whole journey.", outcome: "A clear path from interest to enquiry.",
    detail: "We check forms, integrations and error handling, then verify that the important journeys work.",
    signals: ["Form failed · no confirmation", "Checking submission and delivery", "Enquiry received · confirmation shown"],
    focus: "Engineering", brief: "I'd like to review and fix unreliable forms, integrations or customer journeys in our website or software.",
  },
  {
    label: "Workflows", icon: Workflow, problem: "Good work gets stuck between tools.",
    action: "Connect the steps. Keep people in control.", outcome: "The next step is already prepared.",
    detail: "We connect the right tools and automate repeatable steps, with a person reviewing the decisions.",
    signals: ["Copy, paste, chase, repeat", "Connecting the handoff", "Prepared automatically · ready for review"],
    focus: "AI & automation", brief: "I'd like to connect our tools and reduce the repetitive work that slows our team down.",
  },
];

export function BusinessVelocity({ paused, onToggleMotion, onRequest }: {
  paused: boolean;
  onToggleMotion: () => void;
  onRequest: (focus: string, message: string) => void;
}) {
  const [selected, setSelected] = useState(0);
  const [phase, setPhase] = useState(0);
  const reduced = useReducedMotion();
  const live = useLivePreview(3200, () => setPhase((value) => (value + 1) % 3));
  const scenario = scenarios[selected];
  const Icon = scenario.icon;
  const status = ["Friction found", "Improvement in progress", "Ready to move forward"][phase];
  return (
    <section className="velocity-section" id="stay-ahead" aria-labelledby="velocity-title">
      <div className="shell velocity-inner">
        <Reveal className="velocity-heading">
          <span className="eyebrow">STAY AHEAD OF WHAT’S NEXT</span>
          <h2 id="velocity-title">The world moves fast.<br /><span>Your business should too.</span></h2>
          <p>Your customers expect better. Your team deserves easier.<br className="velocity-desktop-break" /> We turn the friction holding you back into your next move forward.</p>
        </Reveal>
        <div className="velocity-experience" ref={live}>
          <div className="velocity-world" aria-hidden="true">
            <div className="velocity-orbit-label"><span /> A world in motion</div>
            <GlobeVisual paused={paused} />
            <div className="world-signal signal-one"><Gauge size={16} /><span>A faster experience</span><i /></div>
            <div className="world-signal signal-two"><Workflow size={16} /><span>A simpler working day</span><i /></div>
            <div className="world-caption">EVERY IMPROVEMENT STARTS WITH A REAL BUSINESS NEED.</div>
          </div>
          <div className="velocity-demo">
            <div className="velocity-demo-heading">
              <span>Small friction. Real consequences.</span>
              <button type="button" onClick={onToggleMotion} aria-label={paused ? "Resume live demonstration" : "Pause live demonstration"} title={paused ? "Resume animations" : "Pause animations"}>{paused ? <Play size={14} /> : <Pause size={14} />}</button>
            </div>
            <ChoiceTabs className="velocity-tabs" labels={scenarios.map((item) => item.label)} selected={selected}
              onSelect={(value) => { setSelected(value); setPhase(0); }} label="Explore business improvements" prefix="velocity-tab" panel="velocity-panel" />
            <div id="velocity-panel" role="tabpanel" aria-labelledby={`velocity-tab-${selected}`} tabIndex={0} className="velocity-panel" data-phase={phase} data-scenario={selected}>
              <div className="velocity-browser" aria-hidden="true">
                <div className="velocity-browser-bar"><span className="browser-controls"><i /><i /><i /></span><span><LockKeyhole size={10} /> your business, online</span><RefreshCw size={11} /></div>
                <div className="velocity-site">
                  <div className="velocity-site-nav"><b>YOUR BUSINESS<span>®</span></b><span /><span /></div>
                  <div className="velocity-site-body">
                    <div className="velocity-site-copy"><span className="site-kicker">MAKE YOUR NEXT MOVE</span><b>Good things.<br />Made easier.</b><span className="site-copy-line" /><span className="site-copy-line short" /><span className="site-action">Let’s talk <ArrowUpRight size={12} /></span></div>
                    <div className="velocity-site-art"><div className="site-orbit" /><div className="site-orbit second" /><Icon size={29} strokeWidth={1.3} /></div>
                  </div>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div key={`${selected}-${phase}`} className="velocity-site-notice" initial={reduced ? false : { opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: reduced ? 0 : 0.22 }}>
                      {phase === 0 ? <CircleAlert size={13} /> : phase === 1 ? <span className="velocity-spinner" /> : <Check size={13} />}{scenario.signals[phase]}
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="velocity-browser-status"><span className="velocity-status-dot" />{status}<span className="velocity-progress"><i /></span></div>
              </div>
              <div className="velocity-demo-copy">
                <span className="velocity-step">{["01 / FIND THE FRICTION", "02 / MAKE THE IMPROVEMENT", "03 / VERIFY THE EXPERIENCE"][phase]}</span>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.h3 key={`${selected}-${phase}`} initial={reduced ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: reduced ? 0 : 0.2 }}>{[scenario.problem, scenario.action, scenario.outcome][phase]}</motion.h3>
                </AnimatePresence>
                <p>{scenario.detail}</p>
              </div>
            </div>
            <div className="velocity-demo-foot"><span>Illustrative sequence</span><button type="button" onClick={() => setPhase((value) => (value + 1) % 3)}>Next step <ArrowRight size={12} /></button></div>
          </div>
        </div>
        <div className="velocity-bottom">
          <p><b>Current thinking. Practical improvements.</b><span>We evaluate new tools, measure the bottlenecks and choose what actually helps your business.</span></p>
          <a href="#contact" onClick={() => onRequest(scenario.focus, scenario.brief)}>Improve what’s holding me back <ArrowUpRight size={19} /></a>
        </div>
      </div>
    </section>
  );
}
