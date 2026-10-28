"use client";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
export function GlobeVisual({ paused }: { paused: boolean }) {
  const pausedRef = useRef(paused);
  const restart = useRef<() => void>(() => {});
  useEffect(() => {
    pausedRef.current = paused;
    restart.current();
  }, [paused]);
  const canvas = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    let frame = 0;
    let alive = true;
    let land: number[][][] = [];
    let phase = 0;
    let inView = false;
    let ready = false;
    let lastFrame = 0;
    const c = canvas.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const points: { lat: number; lon: number }[] = [];
    const inside = (x: number, y: number, p: number[][]) => {
      let hit = false;
      for (let i = 0, j = p.length - 1; i < p.length; j = i++) {
        const a = p[i],
          b = p[j];
        if (
          a[1] > y !== b[1] > y &&
          x < ((b[0] - a[0]) * (y - a[1])) / (b[1] - a[1]) + a[0]
        )
          hit = !hit;
      }
      return hit;
    };
    const draw = (timestamp = 0) => {
      if (!alive || !inView) {
        frame = 0;
        return;
      }
      if (
        timestamp &&
        !reduced &&
        !pausedRef.current &&
        timestamp - lastFrame < 32
      ) {
        frame = requestAnimationFrame(draw);
        return;
      }
      lastFrame = timestamp;
      const w = c.clientWidth,
        h = c.clientHeight,
        dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (c.width !== w * dpr || c.height !== h * dpr) {
        c.width = w * dpr;
        c.height = h * dpr;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const r = Math.min(w * 0.4, h * 0.46),
        cx = w / 2,
        cy = h / 2;
      const angle = 0.45 + Math.sin(phase * .5) * .6,
        tilt = -0.18;
      const project = (lat: number, lon: number, lift = 0) => {
        const a = (lat * Math.PI) / 180,
          b = (lon * Math.PI) / 180 + angle;
        const x = Math.cos(a) * Math.sin(b),
          y = Math.sin(a),
          z = Math.cos(a) * Math.cos(b);
        return {
          x: cx + r * (1 + lift) * x,
          y: cy - r * (1 + lift) * (y * Math.cos(tilt) - z * Math.sin(tilt)),
          z: y * Math.sin(tilt) + z * Math.cos(tilt),
        };
      };
      const wash = ctx.createRadialGradient(cx - r * .3, cy - r * .35, r * .1, cx, cy, r);
      wash.addColorStop(0, "rgba(255,255,255,.65)");
      wash.addColorStop(.85, "rgba(243,119,65,.025)");
      wash.addColorStop(1, "rgba(243,119,65,.08)");
      ctx.fillStyle = wash;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(185,139,114,.14)";
      ctx.lineWidth = 0.7;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath();
        let started = false;
        for (let lon = -180; lon <= 180; lon += 2) {
          const p = project(lat, lon);
          if (p.z > 0) {
            if (!started) ctx.moveTo(p.x, p.y);
            else ctx.lineTo(p.x, p.y);
            started = true;
          } else started = false;
        }
        ctx.stroke();
      }
      for (let lon = -180; lon < 180; lon += 30) {
        ctx.beginPath();
        let started = false;
        for (let lat = -90; lat <= 90; lat += 2) {
          const p = project(lat, lon);
          if (p.z > 0) {
            if (!started) ctx.moveTo(p.x, p.y);
            else ctx.lineTo(p.x, p.y);
            started = true;
          } else started = false;
        }
        ctx.stroke();
      }
      for (const point of points) {
        const p = project(point.lat, point.lon);
        if (p.z < 0) continue;
        ctx.fillStyle = `rgba(239,100,42,${0.14 + p.z * 0.6})`;
        ctx.beginPath();
        ctx.arc(
          p.x,
          p.y,
          (0.65 + p.z * 0.5) * Math.max(0.8, w / 650),
          0,
          Math.PI * 2,
        );
        ctx.fill();
      }
      const cities = [
        [51.5, -0.12],
        [40.7, -74],
        [25.2, 55.3],
        [1.35, 103.8],
        [35.68, 139.7],
        [-23.5, -46.6],
      ];
      // Great-circle routes share no single origin. Packets illustrate movement,
      // rather than implying that the agency operates a global server network.
      const routePoint = (from: number[], to: number[], t: number) => {
        const unit = ([lat, lon]: number[]) => {
          const a = lat * Math.PI / 180, b = lon * Math.PI / 180;
          return [Math.cos(a) * Math.cos(b), Math.sin(a), Math.cos(a) * Math.sin(b)];
        };
        const a = unit(from), b = unit(to);
        const omega = Math.acos(Math.max(-1, Math.min(1, a.reduce((sum, v, i) => sum + v * b[i], 0))));
        const sin = Math.sin(omega);
        const v = a.map((n, i) => (n * Math.sin((1 - t) * omega) + b[i] * Math.sin(t * omega)) / sin);
        return project(Math.asin(v[1]) * 180 / Math.PI, Math.atan2(v[2], v[0]) * 180 / Math.PI, Math.sin(t * Math.PI) * .11);
      };
      for (const [index, [from, to]] of [[0, 1], [1, 5], [0, 2], [2, 3], [3, 4]].entries()) {
        ctx.beginPath();
        let connected = false;
        for (let step = 0; step <= 50; step++) {
          const p = routePoint(cities[from], cities[to], step / 50);
          if (p.z > .02) {
            if (!connected) ctx.moveTo(p.x, p.y);
            else ctx.lineTo(p.x, p.y);
            connected = true;
          } else connected = false;
        }
        ctx.strokeStyle = "rgba(242,103,41,.29)";
        ctx.lineWidth = 1;
        ctx.stroke();
        const packet = routePoint(cities[from], cities[to], (phase * 6 + index * .23) % 1);
        if (packet.z > .02) {
          ctx.shadowColor = "rgba(255,112,50,.55)";
          ctx.shadowBlur = 8;
          ctx.fillStyle = "#f56b2c";
          ctx.beginPath();
          ctx.arc(packet.x, packet.y, 2.3, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
      for (const [lat, lon] of cities) {
        const p = project(lat, lon);
        if (p.z < 0.1) continue;
        ctx.fillStyle = "#f56b2c";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "rgba(245,107,44,.25)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 8 + Math.sin(phase * 10) * 2, 0, Math.PI * 2);
        ctx.stroke();
        ctx.strokeStyle = "rgba(185,139,114,.14)";
      }
      if (!reduced && !pausedRef.current && !document.hidden) {
        phase += 0.0018;
        frame = requestAnimationFrame(draw);
      } else frame = 0;
    };
    const synchronize = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      if (ready && inView && !document.hidden) draw();
    };
    restart.current = synchronize;
    document.addEventListener("visibilitychange", synchronize);
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (!inView) {
        cancelAnimationFrame(frame);
        frame = 0;
      } else if (ready && !frame) draw();
    });
    observer.observe(c);
    const resize = new ResizeObserver(() => {
      if (ready && inView && (reduced || pausedRef.current)) draw();
    });
    resize.observe(c);
    fetch("/data/land.json")
      .then((r) => r.json() as Promise<number[][][]>)
      .then((data: number[][][]) => {
        if (!alive) return;
        land = data;
        const density = c.clientWidth < 500 ? 2 : 1.4;
        for (let lat = -58; lat < 82; lat += density) {
          const step = density / Math.max(0.3, Math.cos((lat * Math.PI) / 180));
          for (let lon = -180; lon < 180; lon += step) {
            if (land.some((p) => inside(lon, lat, p)))
              points.push({ lat, lon });
          }
        }
        ready = true;
        draw();
      })
      .catch(() => {
        ready = true;
        draw();
      });
    return () => {
      alive = false;
      restart.current = () => {};
      document.removeEventListener("visibilitychange", synchronize);
      observer.disconnect();
      resize.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [reduced]);
  return (
    <div className="globe-visual">
      <canvas
        ref={canvas}
        role="img"
        aria-label="An illustrative rotating globe with moving connections around the world"
      />
    </div>
  );
}
