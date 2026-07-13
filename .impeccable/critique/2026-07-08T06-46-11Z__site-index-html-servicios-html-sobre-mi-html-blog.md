---
target: "site: index.html, servicios.html, sobre-mi.html, blog/"
total_score: 30
p0_count: 0
p1_count: 1
timestamp: 2026-07-08T06-46-11Z
slug: site-index-html-servicios-html-sobre-mi-html-blog
---
Method: dual-agent (A: design-review sub-agent · B: detector-evidence sub-agent) — re-run #2 after applying the priority-issue fixes from the first critique.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | WhatsApp/IG/email now wired to real values; minor FOUC on footer email text before JS swaps it in |
| 2 | Match System / Real World | 4 | Copy voice consistent and specific throughout |
| 3 | User Control and Freedom | 3 | No major traps; mobile nav/back behavior fine |
| 4 | Consistency and Standards | 2 | `.nota-cuidado`'s rosa-palido fix blended into its own `fondo-rosa` host section in 4 of 5 placements (since fixed to blanco) |
| 5 | Error Prevention | 4 | Config safeguard correctly checks against old placeholder strings, not a generic falsy check — won't false-positive |
| 6 | Recognition Rather Than Recall | 3 | Beginner label helps; new icons initially read as ornamental noise (since fixed to align with headings) |
| 7 | Flexibility and Efficiency | 3 | Unchanged from run 1 |
| 8 | Aesthetic and Minimalist Design | 2 | New icons floated centered in left-aligned sections at time of review (since fixed) |
| 9 | Error Recovery | 3 | No change |
| 10 | Help and Documentation | 3 | Config file comments remain excellent |
| **Total** | | **30/40** | **Good — real +5 improvement over the first run (25/40), capped by two regressions introduced by this round's own fixes (both fixed immediately after this review, see note below)** |

## Anti-Patterns Verdict

**LLM assessment (Assessment A):** Five of the seven original findings are genuinely fixed — real code changes verified against rendered screenshots, not just "declared and hoped." Two new issues were introduced by this round's own fixes: (1) `.nota-cuidado`'s new rosa-palido background matched its own `fondo-rosa` host section in 4 of its 5 placements (sobre-mi.html + all 3 blog posts), making the site's single highest-stakes callout functionally invisible there; (2) the two new celestial icons used the hero/newsletter centered treatment in servicios.html's left-aligned sections, reading as disconnected floating marks rather than a lead-in to their headings.

**Deterministic scan (Assessment B):** CLI scan: only the known `single-font` false positive (7 instances, unchanged). Browser pass explicitly confirmed GONE: `tight-leading` on the h1-h4 rule (though a separate, never-flagged `.encabezado__logo` line-height 1.1 kept triggering the same rule name — reviewed and classified as an intentional tight two-line logo lockup, not a defect), `line-length`, `skipped-heading`, and `side-tab` — all four confirmed fixed via CSS inspection and re-rendered console output. Two **new** findings surfaced: `low-contrast` (2.9:1, gold-on-white) and `all-caps-body`, both traced to the new `.tarjeta__etiqueta` label — the gold/white contrast was a genuine regression (fixed immediately, switched to ciruela) and also, incidentally, a violation of the system's own gold-scarcity rule (gold was being used as a static text color, not just hover/focus); the all-caps flag was confirmed a false positive (a legitimate short "Label" role already documented in DESIGN.md, not body prose).

**Visual overlays:** Same as run 1 — this ran in a background/headless environment, not a human-visible browser tab. No live overlay available; findings come from captured console output.

## Overall Impression

Real, verified progress: 25/40 → 30/40, with 5 of 7 original issues confirmed landed by independent re-inspection (not just re-reading the fix descriptions). But this run surfaced an important lesson about applying fixes in a system with reused patterns and shared backgrounds: three separate regressions were introduced by the fixes themselves (nota-cuidado's background blending into its host section, the new icons' centered-treatment mismatch in non-centered sections, and the new label's gold-on-white contrast failure) — none were slop or carelessness exactly, but all three were "technically satisfies the fix description, didn't hold up under a second look in every context where the component actually appears." All three were caught by this re-run and fixed immediately afterward.

## What's Working

1. **The config safeguard is well-built, not just present.** It checks against the specific old placeholder strings rather than a generic falsy/empty check, so it won't misfire against the real values now in place — a detail worth verifying, and it holds up.
2. **The typography fixes are real at render time**, not just declared in source and silently overridden elsewhere — confirmed via computed styles and visible line-length in screenshots (previously 112–139 characters, now under ~85ch at 1440px).
3. **The photo-placeholder redesign reads as an intentional brand motif** ("umbral + luna creciente"), not a patch — consistent with the existing linear-icon language rather than a generic broken-avatar fallback.

## Priority Issues (found this run, already fixed post-review)

**[P1 — fixed] `.nota-cuidado` was invisible against its own section background in 4 of 5 placements**
- **What happened**: The first-round fix moved `.nota-cuidado` to a rosa-palido background, but 4 of its 5 real placements (sobre-mi.html, all 3 blog posts) sit inside a `fondo-rosa` section — identical color, zero contrast.
- **Fix applied**: Switched to blanco + a thin border (the same contrast exception already granted to service cards in DESIGN.md), which reads against both champán and rosa hosts. Verified via `grep` across all 5 placements.

**[P2 — fixed] New celestial icons floated centered in servicios.html's left-aligned sections**
- **What happened**: `.icono-simbolico`'s `margin: 0 auto` centering (designed for the centered hero/newsletter context) made the two new icons read as disconnected from the left-aligned headings they were meant to introduce.
- **Fix applied**: Scoped a left-aligned override (`#linea-a .icono-simbolico, #linea-b .icono-simbolico`) so the icon sits flush with its heading in that context, leaving the hero/newsletter centered treatment untouched.

**[P3 — noted, not fixed, low severity] Footer email link briefly shows literal placeholder text before JS resolves it**
- **What**: `partials/footer.html` hardcodes `correo@tudominio.cl` as initial link text; `js/site.js` swaps it on `DOMContentLoaded`. Visible flash on slow connections.
- **Why lower priority**: Self-corrects within one render cycle in nearly all real conditions; same category as the original P0 but far lower stakes since it's cosmetic, not a dead link.
- **Suggested fix** (optional, not applied): set the initial text to the real email as a static fallback, or hide until JS populates it.

## Persona Red Flags

**Jordan (already knows Francisca):** No blockers — WhatsApp/email/Instagram all function now. Fully served.

**Riley (curious, evaluating "rigor"):** Would have skimmed past the crisis-protocol nota entirely on sobre-mi.html at the time of this review (now fixed) — for a persona explicitly evaluating trust/boundaries, that was the wrong moment for the site's safety language to fade into the wallpaper.

**Casey (mobile-first scanner):** The floating icons were a small "wait, what's that" hiccup mid-scroll on a narrow viewport at review time — icon noticed before the heading it was meant to introduce, wrong reading order (now fixed).

## Minor Observations

- The beginner-signpost label reuses the pre-existing `.tarjeta__etiqueta` class rather than inventing new CSS — good reuse discipline.
- `placeholder-retrato.svg`'s alt text is honest without being visually intrusive — good disclosure pattern.
- `.encabezado__logo`'s tight line-height (1.1) was flagged by the same detector rule as the h1-h4 issue, but is a deliberate compact two-line logo lockup (title + tagline), not a body-readability problem — classified as a contextual false positive, left unchanged.

## Questions to Consider

1. All three regressions this round shared a pattern: a fix verified against one rendered context (one screenshot, one page) without checking every place the same component or class actually appears. Worth asking before the next round of fixes: is there a lightweight habit (grep for every usage of a changed class before considering a fix "done") that would catch this earlier?
2. Now that WhatsApp/email/Instagram are live, has the `wa.me` link actually been clicked end-to-end on a real device to confirm the pre-filled message text renders correctly — or is "the placeholder is gone" being treated as equivalent to "the flow works"?
