---
target: "site: index.html, servicios.html, sobre-mi.html, blog/"
total_score: 25
p0_count: 1
p1_count: 2
timestamp: 2026-07-08T06-13-15Z
slug: site-index-html-servicios-html-sobre-mi-html-blog
---
Method: dual-agent (A: design-review sub-agent · B: detector-evidence sub-agent)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Newsletter forms give zero submit feedback; nav active-state is the only status signal site-wide |
| 2 | Match System / Real World | 4 | Chilean Spanish, CLP pricing, WhatsApp-first booking — all correct for the audience |
| 3 | User Control and Freedom | 2 | No breadcrumb beyond blog's "← Volver al blog"; no way to back out of a service selection before WhatsApp opens |
| 4 | Consistency and Standards | 3 | Components consistent site-wide; the one deviation (`.nota-cuidado` left-border) is already self-flagged in DESIGN.md |
| 5 | Error Prevention | 2 | `config.js` still ships literal placeholder WhatsApp/email/Instagram — every CTA site-wide is currently a dead end |
| 6 | Recognition Rather Than Recall | 3 | Price and "para quién" shown directly on each service card |
| 7 | Flexibility and Efficiency | 1 | No filtering/sorting on the 7-card service list; only two anchor shortcuts |
| 8 | Aesthetic and Minimalist Design | 4 | Genuinely restrained and on-brand — the strongest score on the sheet |
| 9 | Error Recovery | 1 | Partials load via `fetch()`; opening any page via `file://` silently kills header/nav/footer/CTA with zero error message |
| 10 | Help and Documentation | 3 | Excellent code-level docs for the non-technical owner; no user-facing help/FAQ on the site itself |
| **Total** | | **25/40** | **Acceptable — significant improvements needed before users are happy** |

## Anti-Patterns Verdict

**LLM assessment (Assessment A):** Largely *not* slop-coded, which is unusual and worth naming as a strength. Copy is specific to this practice, the two-background alternation is executed with real discipline, gold is genuinely reserved for hover/focus, no box-shadow/gradient-text/glassmorphism anywhere. The one real tell: `sobre-mi.html`'s hero image is a generic gray-outline "no avatar" silhouette (`img/placeholder-retrato.svg`) — on the one page whose entire job is building personal trust for a solo practitioner, this is the internet's most recognizable "unfinished template" glyph. The 7 visually-identical white service cards read a little generated, though that's a legitimate catalog pattern more than a smell.

**Deterministic scan (Assessment B):** `detect.mjs` returned exit code 2 with 7 `single-font` warnings (one per HTML file). Browser-injected `detect.js` additionally found, per page: `tight-leading` (line-height 1.10, all 4 pages), `side-tab` / border-left ≥3px (servicios.html, sobre-mi.html — this is `.nota-cuidado`), `line-length` ~112–139 chars/line (index, servicios, sobre-mi — several paragraphs render without a max-width constraint, unlike the hero subtitle's 60ch and the blog article's 68ch), `cream-palette` (all 4 pages), `ai-color-palette` on the #5a4478 heading color (index.html), and `skipped-heading` on blog/index.html (`<h1>Blog</h1>` followed directly by `<h3>`, no `<h2>`).

Where the two assessments agree and correct each other: **`single-font` and `cream-palette` are confirmed false positives** — DESIGN.md documents the Cormorant Garamond/Mulish pairing and the champán/rosa-pálido two-background rule as deliberate, committed brand identity (the detector's static CSS-custom-property resolution likely can't see the second font/background declared via `var()`). Likewise **`ai-color-palette` on #5a4478 is a false positive** — that's the documented "Ciruela Suave" brand token, not a generic AI-purple artifact. The **`side-tab` finding independently corroborates** Assessment A's manual audit that `.nota-cuidado` is the system's one lateral-border-accent violation (DESIGN.md already self-flags it; no other undocumented instances exist elsewhere in the CSS). The **`tight-leading`, `line-length`, and `skipped-heading` findings are genuine catches the qualitative review didn't surface on its own** — real, fixable technical issues now folded into Priority Issues below.

**Visual overlays:** This critique ran in a background/headless environment, not in a human-visible browser tab — Assessment B injected the detector script via a scripted Playwright session and captured its console output directly rather than presenting a `[Human]`-labeled tab. No user-visible overlay is available from this run; the findings above come from that captured console output, not a live visual highlight you can look at right now.

## Overall Impression

This is disciplined, restrained brand work that mostly avoids AI-slop tells — rare for a hand-built static site. The gap isn't taste, it's follow-through: the site's only conversion mechanism (`config.js`'s WhatsApp/email/Instagram values) is still placeholder data, the one page built to earn personal trust ships a generic avatar icon instead of a photo, and a few CSS details (unconstrained paragraph widths, tight heading line-height, a skipped heading level) are quick, low-risk fixes that both assessments independently flagged. The single biggest opportunity: close the gap between what PRODUCT.md commits to (a "ritual wellness + celestial accent" layer) and what's actually visible today (one repeated crescent icon) — the emotional register currently lives almost entirely in the copy, not the interface.

## What's Working

1. **The two-background discipline is actually held, everywhere.** Every section alternates strictly between champán and rosa pálido, gold never appears as a surface color, no `box-shadow` anywhere in `componentes.css`. Rare execution fidelity for a stated design-system rule.
2. **Copy genuinely serves both stated personas without forking the site.** "No es necesario tener experiencia previa" speaks to the curious first-timer while per-service "para quién" microcopy and direct pricing serve the already-decided referral visitor — both live on the same pages, exactly as PRODUCT.md's principle 4 demands.
3. **`.icono-simbolico`'s linear-gold-only treatment** is a correctly restrained execution of "acento, no overhaul" — thin stroke, no fill, gold reserved to the trace. It's a ready-made template for extending the new celestial-accent direction without breaking the gold-scarcity rule.

## Priority Issues

**[P0] `js/config.js` ships live with placeholder contact data**
- **Why it matters**: `whatsapp: "56900000000"`, `instagram: ".../tu_usuario"`, `email: "hola@tudominio.cl"` are still literal placeholders. Every "Agendar hora" button on every page — the site's only conversion path — currently points nowhere real.
- **Fix**: Replace with real values before any traffic hits the site. Consider a runtime `console.warn` (or a visible dev-only banner) that fires if placeholder values are still detected, so this can't silently ship again.
- **Suggested command**: `/impeccable harden`

**[P1] Generic placeholder-avatar SVG on the trust-critical `sobre-mi.html`**
- **Why it matters**: For a solo practitioner whose value proposition rests on personal credibility, a gray "no-avatar" silhouette in the exact spot a portrait belongs undercuts the one asset most able to carry the brand's "calidez" half — right where a first-timer is evaluating trust.
- **Fix**: Source and place a real photo before launch. If a photo isn't ready yet, swap the generic silhouette for an intentional, on-system symbolic linear glyph (consistent with `.icono-simbolico`) rather than the generic broken-profile-pic pattern.
- **Suggested command**: `/impeccable polish`

**[P1] Blog heading hierarchy skips a level** *(confirmed by detector, independent of Assessment A)*
- **Why it matters**: `blog/index.html` has `<h1>Blog</h1>` followed directly by `<h3>` post titles with no `<h2>` — breaks the document outline for screen-reader users and is a straightforward accessibility/SEO defect.
- **Fix**: Insert an `<h2>` (visible or visually-hidden, e.g. "Artículos recientes") between the page `<h1>` and each post's `<h3>`, or promote post titles to `<h2>`.
- **Suggested command**: `/impeccable audit`

**[P2] Servicios' Línea A is a 7-card wall with no beginner signpost**
- **Why it matters**: Violates the ≤4-item chunking guideline and forces a full read-and-compare pass across visually identical cards, exactly where the curious-first-timer persona (named in PRODUCT.md) needs the least friction.
- **Fix**: Sub-group by intent (e.g. "primera vez" vs. "ya conoces tu carta," already implied by the existing "para quién" lines), or flag the natal-chart card (already positioned first) with a one-line "si es tu primera vez, empieza aquí."
- **Suggested command**: `/impeccable distill`

**[P2] Typography readability metrics** *(both findings confirmed by detector, not caught by manual review)*
- **Why it matters**: Heading line-height sits at 1.10 (detector wants ≥1.3) on all four pages, and several body paragraphs on index/servicios/sobre-mi render at ~112–139 characters per line (vs. the hero subtitle's 60ch and the blog article's 68ch) because they lack a max-width constraint — both quietly hurt readability without looking obviously broken.
- **Fix**: Bump heading `line-height` per DESIGN.md's own hierarchy values, and apply a `max-width` (e.g. `65ch`, matching the existing "Qué es" section) to any paragraph currently rendering full-container-width.
- **Suggested command**: `/impeccable typeset`

**[P2] `.nota-cuidado` is under-weighted for its stakes**
- **Why it matters**: The site's single highest-stakes reassurance moment (the crisis-protocol callout) is styled as its least visually prominent element — small type, soft color, tucked after a bullet list — reading like trailing legal fine print. It's also the system's one confirmed lateral-border-accent rule violation (independently corroborated by the detector's `side-tab` finding; no other undocumented instances exist).
- **Fix**: Move to a full pale-pink background block at body type size. Dropping the border-left accent in favor of the full-background treatment resolves both the rule violation and the under-weighting in one pass.
- **Suggested command**: `/impeccable harden`

**[P3] The new "ritual wellness + celestial accent" direction has almost no visual footprint yet**
- **Why it matters**: This is an opportunity, not a current failure — PRODUCT.md's new pillar is carried entirely by word choice today ("umbral," "ceremonial"), with one repeated crescent icon used identically in two places. A visitor skimming rather than reading closely may not perceive "ritual wellness" at all.
- **Fix**: Extend a small, consistent set of 2-3 lineal celestial/tarot glyphs to section transitions, Línea A/B headers, and CTA blocks, staying within the existing gold-scarcity rule.
- **Suggested command**: `/impeccable adapt`

## Persona Red Flags

**Jordan (Confused First-Timer)**
- Lands on Línea A's 7-card grid with no "start here" cue — must read all 7 titles, prices, and italic "para quién" lines to self-triage.
- The homepage's `cta-destacado` reassures "escríbeme y coordinamos una hora," but that expectation-setting line doesn't appear next to the individual service-card WhatsApp buttons on servicios.html — clicking a card CTA directly gives no signal this opens a conversation rather than a firm booking.
- Hits the placeholder-silhouette on `sobre-mi.html` exactly when evaluating "is this person credible."

**Riley (Deliberate Stress Tester)**
- Opening any page via `file://` (plausible for the non-technical owner previewing her own edits) silently breaks `fetch()`-based partials — header, nav, footer, newsletter, and every CTA vanish with zero error message.
- Submitting either newsletter form triggers a native browser GET-to-self reload since no JS handler is wired yet — no confirmation, no error, just an unexplained reload.
- Discovering the WhatsApp number is a placeholder only happens *after* WhatsApp actually opens — no earlier failure signal exists.

**Casey (Distracted Mobile User)**
- Genuine strength: the sticky header keeps "Agendar hora" one tap away at all scroll depths — right call for this persona.
- `servicios.html` on mobile is a very long single-column scroll (7 + 2 stacked cards, plus nota-cuidado and the final CTA) with no secondary sticky/quick-jump affordance for fast skimming.
- The homepage's "El cielo del mes" newsletter block sits directly before the final conversion CTA — for a distracted scroller, this inserts an email-capture decision exactly where momentum toward booking should be uninterrupted.

## Minor Observations

- `.icono-simbolico`'s exact same crescent path is reused identically in the hero and the newsletter block — a missed variety opportunity, related to the P3 celestial-accent gap.
- Blog dates are consistent with the current date — content isn't stale.
- The `data-wa-msg` attribute pattern for building WhatsApp deep-links from `config.js` is a clean, maintainable technical solution — worth preserving as-is when fixing the P0 placeholder-data issue.
- Prices show raw CLP figures with no currency label — fine given the Santiago-only positioning, worth revisiting only if the site ever gets non-Chilean traffic.
- Two detector-reported console errors (`net::ERR_CONNECTION_RESET`) on every page during the browser pass were unrelated to any anti-pattern rule — likely a missing favicon or similar asset, not a design finding.

## Questions to Consider

1. If `config.js` still has placeholder WhatsApp/email/Instagram values, has this site already been live and collecting dead-end clicks on its only conversion action — and is there any way to know?
2. The brand thesis is "rigor and warmth held in tension," but the one asset most capable of carrying warmth — a real photo of Francisca — is still a stock silhouette. Is a portrait actually in progress?
3. If a visitor skims without reading closely, would they perceive "ritual wellness" at all today — or does the site currently read as a conventional refined-serif service business that happens to sell astrology?
