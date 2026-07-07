# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static marketing site (HTML + CSS + vanilla JS, no framework, no build step, no package manager) for the brand "Astrología y Herbolaria" by Francisca Giner Mellado.

## Running locally

The site loads header/footer via `fetch`, so opening `index.html` directly (`file://`) will not work — a local server is required:

- VS Code: right-click `index.html` → "Open with Live Server"
- Terminal (needs Node.js): `npx serve`

There is no build, lint, or test tooling in this repo.

## Architecture

- **Partial loading via fetch, not a templating engine.** [js/site.js](js/site.js) reads `data-partial="nombre"` attributes on `<div>` elements and fetches the matching file from `partials/` (e.g. `partials/header.html`) client-side, injecting it as innerHTML. Every page (root pages and `blog/*.html`) needs these mount divs to get header/footer/newsletter/CTA content.
- **`{{BASE}}` path placeholder.** Root-level pages set `data-base="."` on `<html>`; pages under `blog/` set `data-base=".."`. `site.js` replaces `{{BASE}}` inside fetched partial HTML with this value so links/asset paths in partials resolve correctly regardless of directory depth. When adding a new page under a new subdirectory, set `data-base` accordingly.
- **Single config file drives contact info site-wide.** [js/config.js](js/config.js) defines `window.SITE_CONFIG` (WhatsApp number, Instagram URL, email) — these are the 3 values marked `⚠️ PLACEHOLDER` that must be replaced with real data before launch. `site.js` wires this into any element with `data-wa-msg`, `data-config="instagram"`, or `data-config="email"` at runtime, so contact info never needs editing per-page.
- **Content is separated from design/logic.** Editable copy lives only in the `.html` files (between tags) and in `partials/*.html`. `css/` and `js/site.js` should rarely need to change for content updates — `css/variables.css` centralizes the brand palette/typography as CSS custom properties (see the usage-proportion comments in that file: champán/rosa pálido ~70% backgrounds, ciruela ~25% text/nav, oro ≤5% accents only) and `css/base.css`/`css/componentes.css` hold layout/typography and component styles respectively.
- **Images are placeholders.** `img/placeholder-*.svg` files stand in for real photography (portrait, blog post images) and are referenced by `src` in `sobre-mi.html` and blog articles — swapping them means updating the `src` (and `alt`) attribute, not the SVGs themselves.
- **Newsletter forms are non-functional placeholders.** The `<form>` markup in `partials/newsletter.html` and `partials/footer.html` doesn't submit anywhere yet; it's meant to be replaced with an embed snippet from whatever newsletter provider (e.g. MailerLite) is eventually chosen.

## Frontend/design work

A project skill at `.claude/skills/design-taste-frontend/SKILL.md` governs visual/design decisions on this site (landing-page/portfolio-style anti-slop guidance: infer design direction from the brief, avoid generic AI-default aesthetics). Consult it before making styling or layout changes.

## Recommended Skills for This Project

These skills are optimized for the three project focuses: site improvements, SEO/marketing continuous service, and future business automation.

### For Website Improvements (Astrología/Herbolaria)
- `/design-taste-frontend` - Anti-slop frontend design guidance (custom skill)
- `/design:design-critique` - Design quality review and critique
- `/design:accessibility-review` - WCAG compliance and accessibility checks
- `/code-review` - HTML/CSS/JS code audit
- `/verify` - Test changes in live site

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
- **GitHub** (plugin:engineering:github) - For deployment to Cloudflare Pages/GitHub Pages
- **Notion** (plugin:productivity:notion) - For project organization and documentation
- **Linear** (plugin:productivity:linear) - For task automation (when implementing business automation)
- **Slack** (plugin:productivity:slack) - For notifications and communication (optional)

## Deployment

Intended target is Cloudflare Pages (Workers & Pages → Pages → Connect to Git), with build command empty and output directory `/` (no framework preset). GitHub Pages is a documented fallback (`main` branch as source).
