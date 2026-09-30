# HIKMA — cinematic landing page

Next.js App Router, React, TypeScript, Tailwind CSS, Motion, React Three Fiber, Three.js, Drei and a custom GLSL vortex shader. No backend or secrets required.

## Local development

```bash
npm install
npm run dev
```

## Validation

```bash
npm run lint
npm run typecheck
npm run build
```

## Vercel

Import this repository. Framework preset: **Next.js**. Root directory: repository root. Build command: `npm run build`. No environment variables are required for the site to render. Set `NEXT_PUBLIC_SITE_URL=https://your-domain.example` in Vercel if a custom domain is attached, so Open Graph links resolve to that domain. The primary CTA opens the HIKMA Telegram bot configured in `components/landing.tsx`.

## Real-time hero

- `shaders/vortex.ts` generates the emerald energy ring and dark center procedurally on the GPU.
- `components/three/hero-scene.tsx` renders 440 / 260 / 140 deterministic triangular instances for desktop / tablet / mobile with one `InstancedMesh`. The camera uses subtle pointer parallax on desktop. DPR is capped and adapts to frame rate.
- `components/hero-visual.tsx` loads the 3D scene on capable devices, pauses it when the hero is offscreen or the page is hidden, and keeps a CSS-only vortex as the fallback for WebGL failure and reduced motion.
- There are no video files, video frames or prerendered motion assets in the website. The supplied video was used only for visual guidance.
- `components/logo.tsx` is a vector trace of the triangular logo mark visible in the supplied design reference. Replace it with an original master logo SVG if one becomes available.
- Portfolio cards are original illustrative UI mockups representing project areas, not screenshots or performance claims.
