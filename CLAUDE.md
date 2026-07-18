# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Marketing site for the brand "Astrología y Herbolaria" by Francisca Giner Mellado, built with **Next.js 16 (App Router) + React 19 + Tailwind CSS 4**, using `shadcn`-based components. The site is statically exported (`output: "export"` in [next.config.ts](next.config.ts)) with one serverless function ([api/subscribe.js](api/subscribe.js)) for the newsletter signup.

The newsletter ("El cielo del mes") is fully functional: it collects email, birth date/time/city, computes sun/moon/ascendant signs via [lib/ephemeris.js](lib/ephemeris.js), and subscribes the user through [lib/mailerlite.js](lib/mailerlite.js) → MailerLite.

## Running locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Hot reload on save. `npm run build` produces the static export in `out/`. `npm run lint` runs ESLint.

For the newsletter form to work locally, copy `.env.local.example` to `.env.local` and set `MAILERLITE_API_KEY` (and optionally `MAILERLITE_GROUP_ID`).

## Architecture

- **App Router pages** live in `app/`: `page.tsx` (inicio), `servicios/page.tsx`, `sobre-mi/page.tsx`, `blog/page.tsx` (+ per-article routes), `privacidad/page.tsx`, and `layout.tsx` (shared shell: Header, Footer, fonts). Copy for each page lives directly in its `page.tsx` or in the `components/*.tsx` it uses.
- **Shared UI** lives in `components/` (Header, Footer, Newsletter, cards, buttons, etc.), all React/TSX.
- **Single config file drives contact info site-wide.** [lib/site-config.ts](lib/site-config.ts) holds WhatsApp number, Instagram URL, and email — update it there and it propagates through header, footer, and "agendar hora" buttons automatically.
- **Newsletter/astrology logic** is in `lib/`: `ephemeris.js` (sign calculations), `mailerlite.js` (API client), `utils.ts` (misc helpers). `data/ciudades-chile.json` powers the birth-city selector.
- **Images are placeholders.** `public/img/placeholder-*.svg` stand in for real photography (portrait, blog images), referenced by `src` in `app/sobre-mi/page.tsx` and blog pages — swap the `src` (and `alt`) to real files, not the SVGs.
- **Static export target.** Because `next.config.ts` sets `output: "export"`, avoid Next.js features that require a live server (dynamic SSR, image optimization API, middleware) outside of the one Vercel serverless function already in use for `/api/subscribe`.

## Frontend/design work

A project skill at `.claude/skills/design-taste-frontend/SKILL.md` governs visual/design decisions on this site (landing-page/portfolio-style anti-slop guidance: infer design direction from the brief, avoid generic AI-default aesthetics). Consult it before making styling or layout changes.

## Recommended Skills for This Project

These skills are optimized for the three project focuses: site improvements, SEO/marketing continuous service, and future business automation.

### For Website Improvements (Astrología/Herbolaria)
- `/design-taste-frontend` - Anti-slop frontend design guidance (custom skill) ⭐
- `/design:design-critique` - Design quality review and critique
- `/design:accessibility-review` - WCAG compliance and accessibility checks
- `/design:ux-copy` - Website copywriting and UX microcopy
- `/code-review` - React/TypeScript/Tailwind code audit
- `/simplify` - Code cleanup and refactoring
- `/verify` - Test changes in live site
- `/run` - Launch the site locally

### For SEO/Marketing Continuous Service
- `/searchfit-seo:seo-audit` - Full SEO audit and analysis
- `/searchfit-seo:on-page-seo` - Meta tags, headings, keyword placement optimization
- `/searchfit-seo:schema-markup` - Structured data (JSON-LD) implementation
- `/searchfit-seo:technical-seo` - Performance, mobile usability, Core Web Vitals
- `/searchfit-seo:broken-links` - Link health and broken link detection
- `/searchfit-seo:internal-linking` - Internal navigation and link structure
- `/searchfit-seo:content-strategy` - Content planning and strategy
- `/searchfit-seo:content-brief` - Content briefing and preparation

### For Content & Copy
- `/marketing:draft-content` - Content creation and drafting
- `/design:ux-copy` - Website copywriting and microcopy
- `/brand-voice:enforce-voice` - Brand consistency and voice enforcement
- `/brand-voice:discover-brand` - Brand audit and discovery

### For Business Automation (When Implemented)
These skills are disabled by default but available when you start implementing business automation:
- `/small-business:crm-cleanup` - CRM data cleanup
- `/small-business:customer-pulse` - Customer insights
- `/productivity:task-management` - Task management (works best with Linear/Notion auth)

**Note:** Many other skills are available but not recommended for current projects. See `.claude/settings.json` for the full `disabledSkills` list.

## MCP Connectors & Authentication

For full functionality, these MCP servers can be authenticated via claude.ai settings or `/mcp`:
- **GitHub** (plugin:engineering:github) - For source control; Vercel deploys automatically from the `origin` remote
- **Notion** (plugin:productivity:notion) - For project organization and documentation
- **Linear** (plugin:productivity:linear) - For task automation (when implementing business automation)
- **Slack** (plugin:productivity:slack) - For notifications and communication (optional)

## Deployment

Deployed on Vercel — project `astrologia-y-herbolaria1/astrologia-herbolaria`, linked to the `origin` remote (`github.com/franciscaginer-hash/astrologia-y-herbolaria`) for automatic deploys on push. Vercel auto-detects the Next.js framework (`npm run build`, static export + the `api/subscribe.js` serverless function) — no manual build config needed. Requires `MAILERLITE_API_KEY` (and optionally `MAILERLITE_GROUP_ID`) set in Vercel → Settings → Environment Variables for the newsletter to work in production. Live at https://astrologia-herbolaria.vercel.app. Cloudflare Pages / GitHub Pages are no longer the deploy target.
