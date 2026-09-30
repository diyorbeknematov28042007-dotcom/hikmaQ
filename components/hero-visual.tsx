"use client";

import { useEffect, useRef, useState } from "react";

export function HeroVisual() {
  const root = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [playMotion, setPlayMotion] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPlayMotion(!preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!playMotion) return;
    const element = root.current;
    const movie = video.current;
    if (!element || !movie) return;
    const canTrack = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    let frame = 0;
    const move = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        element.style.setProperty("--px", `${((event.clientX - rect.left) / rect.width - .5) * -10}px`);
        element.style.setProperty("--py", `${((event.clientY - rect.top) / rect.height - .5) * -8}px`);
      });
    };
    const reset = () => { element.style.setProperty("--px", "0px"); element.style.setProperty("--py", "0px"); };
    const visibility = () => { if (document.hidden) movie.pause(); else movie.play().catch(() => {}); };
    if (canTrack) { element.addEventListener("pointermove", move); element.addEventListener("pointerleave", reset); }
    document.addEventListener("visibilitychange", visibility);
    visibility();
    return () => {
      cancelAnimationFrame(frame);
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerleave", reset);
      document.removeEventListener("visibilitychange", visibility);
      movie.pause();
    };
  }, [playMotion]);

  return <div className="hero-visual" ref={root} aria-hidden="true">
    <div className="vortex-shell">
      <div className="vortex-image" />
      {playMotion && <video ref={video} className="vortex-video" autoPlay muted loop playsInline preload="metadata" poster="/assets/vortex-poster.jpg" disablePictureInPicture>
        <source src="/video/hikma-hero.webm" type="video/webm" />
        <source src="/video/hikma-hero.mp4" type="video/mp4" />
      </video>}
    </div>
    <div className="visual-haze" />
    <div className="triangle triangle-a" /><div className="triangle triangle-b" /><div className="triangle triangle-c" />
    <div className="triangle triangle-d" /><div className="triangle triangle-e" /><div className="triangle triangle-f" />
    <div className="triangle triangle-g" /><div className="triangle triangle-h" />
    <span className="orb orb-a" /><span className="orb orb-b" /><span className="orb orb-c" />
  </div>;
}
