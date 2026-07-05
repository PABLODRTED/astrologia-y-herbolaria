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

## Deployment

Intended target is Cloudflare Pages (Workers & Pages → Pages → Connect to Git), with build command empty and output directory `/` (no framework preset). GitHub Pages is a documented fallback (`main` branch as source).
