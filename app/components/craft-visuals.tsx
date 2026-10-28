"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Code2, Layers, MousePointer2, Sparkles } from "lucide-react";
import { useLivePreview } from "./motion-system";

export function FlowGraphic() {
  const [active, setActive] = useState(0);
  const live = useLivePreview(2400, () =>
    setActive((value) => (value + 1) % 4),
  );
  const reduced = useReducedMotion();
  return (
    <div
      className="delivery-flow"
      ref={live}
      aria-label="Strategy, design, engineering and intelligence working together"
    >
      <div className="delivery-track" aria-hidden="true">
        <motion.i
          animate={{ width: `${(active + 1) * 25}%` }}
          transition={{ duration: reduced ? 0 : 1 }}
        />
      </div>
      {[Layers, MousePointer2, Code2, Sparkles].map((Icon, i) => (
        <div
          className={`delivery-node ${i <= active ? "is-connected" : ""}`}
          key={i}
        >
          <span>
            <Icon size={18} strokeWidth={1.5} />
          </span>
          <small>{["Strategy", "Design", "Build", "Intelligence"][i]}</small>
        </div>
      ))}
    </div>
  );
}

export function EngagementVisual({ kind }: { kind: number }) {
  const [phase, setPhase] = useState(0);
  const live = useLivePreview(3600 + kind * 350, () =>
    setPhase((value) => 1 - value),
  );
  return (
    <div
      ref={live}
      data-phase={phase}
      className={`engagement-visual engagement-visual-${kind}`}
      aria-hidden="true"
    >
      {kind === 0 ? (
        <>
          <div className="launch-orbit orbit-one" />
          <div className="launch-orbit orbit-two" />
          <div className="launch-core">
            <ArrowLaunch />
          </div>
          <span className="launch-satellite satellite-one" />
          <span className="launch-satellite satellite-two" />
        </>
      ) : kind === 1 ? (
        <>
          <div className="evolve-plane plane-one">
            <i />
            <i />
            <i />
          </div>
          <div className="evolve-plane plane-two">
            <i />
            <i />
            <i />
          </div>
          <span className="evolve-check">
            <Check size={16} />
          </span>
        </>
      ) : (
        <>
          <svg
            className="team-connections"
            viewBox="0 0 240 120"
            preserveAspectRatio="xMidYMid meet"
          >
            <path d="M60 60 H180 M120 28 V92" />
          </svg>
          <span className="team-node team-one">
            <Code2 size={16} />
          </span>
          <span className="team-node team-two">
            <Layers size={16} />
          </span>
          <span className="team-node team-three">
            <Sparkles size={16} />
          </span>
          <span className="team-core">
            <MousePointer2 size={19} />
          </span>
        </>
      )}
    </div>
  );
}

function ArrowLaunch() {
  return (
    <svg viewBox="0 0 32 32" width="30" height="30" fill="none">
      <path
        d="M8 24 24 8M8 8h16v16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
