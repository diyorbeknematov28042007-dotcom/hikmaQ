"use client";

import dynamic from "next/dynamic";
import { Component, useCallback, useEffect, useRef, useState, type ReactNode } from "react";

const HeroScene = dynamic(() => import("./three/hero-scene").then(module => module.HeroScene), { ssr: false });
type Quality = "mobile" | "tablet" | "desktop";

class SceneBoundary extends Component<{ children: ReactNode; onFailure: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onFailure(); }
  render() { return this.state.failed ? null : this.props.children; }
}

function StaticVortex() {
  return <div className="static-vortex" aria-hidden="true">
    <div className="static-vortex-ring" />
    <div className="static-vortex-core" />
    <span className="static-triangle static-triangle-a" />
    <span className="static-triangle static-triangle-b" />
    <span className="static-triangle static-triangle-c" />
    <span className="static-triangle static-triangle-d" />
    <span className="static-triangle static-triangle-e" />
  </div>;
}

export function HeroVisual() {
  const root = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const [supported, setSupported] = useState(false);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(true);
  const [quality, setQuality] = useState<Quality>("desktop");

  const fail = useCallback(() => { setSupported(false); setReady(false); }, []);
  const markReady = useCallback(() => setReady(true), []);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 640px)");
    const tablet = window.matchMedia("(max-width: 900px)");
    const update = () => {
      setQuality(mobile.matches ? "mobile" : tablet.matches ? "tablet" : "desktop");
      if (preference.matches) { setSupported(false); setReady(false); return; }
      try {
        const test = document.createElement("canvas");
        setSupported(Boolean(test.getContext("webgl2") || test.getContext("webgl")));
      } catch { setSupported(false); }
    };
    update();
    [preference, mobile, tablet].forEach(query => query.addEventListener("change", update));
    return () => [preference, mobile, tablet].forEach(query => query.removeEventListener("change", update));
  }, []);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting && !document.hidden), { threshold: .01 });
    const visibility = () => setActive(!document.hidden && element.getBoundingClientRect().bottom > 0);
    observer.observe(element);
    document.addEventListener("visibilitychange", visibility);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", visibility); };
  }, []);

  useEffect(() => {
    if (quality === "mobile" || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const move = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth - .5) * 2;
      pointer.current.y = (.5 - event.clientY / window.innerHeight) * 2;
    };
    const reset = () => { pointer.current.x = 0; pointer.current.y = 0; };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("blur", reset);
    return () => { window.removeEventListener("pointermove", move); window.removeEventListener("blur", reset); };
  }, [quality]);

  return <div className={`hero-visual${ready ? " ready" : ""}`} ref={root} aria-hidden="true" data-renderer={ready ? "webgl" : "css"}>
    <StaticVortex />
    {supported && <SceneBoundary onFailure={fail}>
      <HeroScene quality={quality} active={active} pointer={pointer} onReady={markReady} onFailure={fail} />
    </SceneBoundary>}
    <div className="visual-haze" />
  </div>;
}
