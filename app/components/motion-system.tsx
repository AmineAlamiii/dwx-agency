"use client";

import {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { MotionConfig, motion, useReducedMotion } from "framer-motion";

const MotionState = createContext(false);
export const ease = [0.22, 1, 0.36, 1] as const;

export function MotionRuntime({
  paused,
  children,
}: {
  paused: boolean;
  children: React.ReactNode;
}) {
  return (
    <MotionState.Provider value={paused}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </MotionState.Provider>
  );
}

// Loops run only while their preview is visible and the document is active.
export function useLivePreview(interval: number, onTick: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  const callback = useRef(onTick);
  const paused = useContext(MotionState);
  const reduced = useReducedMotion();
  useEffect(() => {
    callback.current = onTick;
  }, [onTick]);
  useEffect(() => {
    if (paused || reduced || !ref.current) return;
    let visible = false;
    let timer: ReturnType<typeof setInterval> | undefined;
    const sync = () => {
      clearInterval(timer);
      timer =
        visible && !document.hidden
          ? setInterval(() => callback.current(), interval)
          : undefined;
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.2 },
    );
    observer.observe(ref.current);
    document.addEventListener("visibilitychange", sync);
    return () => {
      clearInterval(timer);
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [interval, paused, reduced]);
  return ref;
}

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);
  return (
    <motion.div
      className={`${className} reveal-surface`}
      data-visible={visible || reduced ? "true" : "false"}
      initial={reduced ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      onViewportEnter={() => setVisible(true)}
      onViewportLeave={() => setVisible(false)}
      viewport={{ once: false, amount: 0.12, margin: "-20px" }}
      transition={{
        duration: reduced ? 0 : 0.65,
        delay: reduced ? 0 : delay,
        ease,
      }}
    >
      {children}
    </motion.div>
  );
}

export function ChoiceTabs({
  labels,
  selected,
  onSelect,
  className,
  label,
  prefix,
  panel,
  numbered = false,
}: {
  labels: string[];
  selected: number;
  onSelect: (index: number) => void;
  className: string;
  label: string;
  prefix: string;
  panel: string | ((index: number) => string);
  numbered?: boolean;
}) {
  const identity = useId();
  const reduced = useReducedMotion();
  return (
    <div
      className={`${className} choice-tabs`}
      role="tablist"
      aria-label={label}
    >
      {labels.map((title, i) => (
        <button
          key={title}
          type="button"
          role="tab"
          id={`${prefix}-${i}`}
          aria-selected={selected === i}
          aria-controls={typeof panel === "string" ? panel : panel(i)}
          tabIndex={selected === i ? 0 : -1}
          onClick={() => onSelect(i)}
          onKeyDown={(event) => {
            const next =
              event.key === "Home"
                ? 0
                : event.key === "End"
                  ? labels.length - 1
                  : event.key === "ArrowRight"
                    ? (i + 1) % labels.length
                    : event.key === "ArrowLeft"
                      ? (i + labels.length - 1) % labels.length
                      : null;
            if (next === null) return;
            event.preventDefault();
            onSelect(next);
            document.getElementById(`${prefix}-${next}`)?.focus();
          }}
        >
          {selected === i && (
            <motion.i
              className="choice-active"
              layoutId={`choice-${identity}`}
              initial={false}
              transition={{ duration: reduced ? 0 : 0.4, ease }}
              aria-hidden="true"
            />
          )}
          {numbered && <span className="choice-number">0{i + 1}</span>}
          <span className="choice-label">{title}</span>
        </button>
      ))}
    </div>
  );
}
