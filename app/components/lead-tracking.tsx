"use client";

import { useEffect } from "react";

export function trackConversion(event: string, source = "general") {
  // Firebase Hosting has no D1 binding; do not send events to a missing API.
  if (process.env.NEXT_PUBLIC_AGGREGATE_TRACKING === "disabled") return;
  if (navigator.doNotTrack === "1") return;
  void fetch("/api/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event, source }),
    keepalive: true,
  }).catch(() => {});
}

export function LeadTracking() {
  useEffect(() => {
    trackConversion("page_view");
    const click = (event: MouseEvent) => {
      const anchor = (event.target as Element)?.closest<HTMLAnchorElement>(
        'a[href="#contact"]',
      );
      if (anchor)
        trackConversion(
          "contact_clicked",
          anchor.closest("section")?.id || "navigation",
        );
    };
    document.addEventListener("click", click);
    return () => document.removeEventListener("click", click);
  }, []);
  return null;
}
