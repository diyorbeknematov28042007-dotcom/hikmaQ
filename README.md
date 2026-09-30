# HIKMA — cinematic landing page

Next.js App Router, React, TypeScript, Tailwind CSS and Motion. Static landing page; no backend or secrets required.

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

## Visual assets

- `public/video/hikma-hero.webm` and `.mp4` are small, silent, 4-second forward/reverse loops cropped from the supplied motion reference. Only the vortex and fragments are in the video. The real UI is HTML.
- `public/assets/vortex-poster.jpg` appears immediately and remains when reduced motion is preferred. The video is paused when the page is hidden.
- `components/logo.tsx` is a vector trace of the triangular logo mark visible in the supplied design reference. Replace it with an original master logo SVG if one becomes available.
- Portfolio cards are original illustrative UI mockups representing project areas, not screenshots or performance claims.

The original video is deliberately not shipped. The produced WebM and MP4 files are approximately 300 KB each.
