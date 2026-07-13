---
name: skills-audit
description: |
  Audit and optimize your available skills, agents, and MCP connectors to reduce clutter and resolve conflicts. 
  Use this skill whenever you need to clean up your Claude tooling, maintain control of available helpers, or after adding new features to your project.
  
  The skill analyzes what tools you actually need vs. what's creating clutter, creates a decision matrix, identifies duplicates and overlaps, and proposes a configuration update plus documentation. Always use this for project tooling hygiene, environment setup, or when juggling multiple projects with different tool needs.
compatibility: |
  Requires: Planning agent, ability to read current system context
  Optional: Access to .claude/settings.json, CLAUDE.md, project configuration files
---

# Skills Audit: Clean Up Your Claude Tooling

This skill helps you maintain a lean, conflict-free set of skills, agents, and MCP connectors across your projects.

## When to Use

- **Project kickoff** — You have multiple projects (web, automation, SEO) and want a clean baseline
- **Tooling bloat** — Skills / agents pile up and `/` autocomplete becomes noisy
- **Conflict resolution** — You notice duplicate skills or overlapping functionality
- **MCP spring cleaning** — You want to know which connectors to authenticate
- **Periodic maintenance** — Every few weeks, audit to keep your setup fresh

## How It Works

### Input: Describe Your Situation

Provide **one or both**:

1. **Prose description** — "I have a static website, I'm offering SEO services, and planning automation work"
2. **JSON structure** (optional) — 
   ```json
   {
     "projects": [
       {"name": "website-astrology", "focus": ["design", "content", "SEO"]},
       {"name": "automation", "focus": ["business process", "integrations"]},
       {"name": "seo-service", "focus": ["audits", "reporting", "strategy"]}
     ],
     "current_pain_points": ["too many small-business skills", "SEO skill duplication"]
   }
   ```

### Process: Decision Matrix & Classification

The skill creates a **decision matrix** using these criteria:

| Criterion | Weight | Details |
|---|---|---|
| **Immediate utility** | 40% | Does this skill help with active projects *right now*? |
| **Future utility** | 30% | Will this skill become useful in planned projects? |
| **Functional overlap** | 20% | Does this duplicate another skill's job? |
| **Maintenance** | 10% | Is this actively maintained? Is it in scope? |

For **each skill/agent/MCP**, the skill classifies it as:

- **✅ USE NOW** — Active, no conflict, highly relevant → keep enabled
- **🔇 DISABLE** — Useful later but clutter now → add to `disabledSkills` / `disabledAgents`
- **📋 DOCUMENT** — Useful but out of scope → note in CLAUDE.md with reason
- **❌ DELETE** — Never useful, not in any project plan → remove entirely (rare)

Identifies:
- **Exact duplicates** — same functionality, different names (e.g., `code-review` vs `engineering:code-review`)
- **Functional overlap** — similar but distinct purposes (e.g., `marketing:seo-audit` vs `searchfit-seo:seo-audit`)
- **MCPs without auth** — connectors that could unlock features but aren't authenticated

### Output: Audit Report + Proposed Changes

The skill produces:

1. **Audit Report** — Human-readable summary with:
   - Decision matrix (all skills rated)
   - Identified conflicts
   - Recommended winners for duplicates
   - MCPs ready to authenticate
   - Changes summary (X skills to disable, Y to document, Z status quo)

2. **Proposed Config** — JSON snippet ready to merge into `.claude/settings.json`:
   ```json
   {
     "disabledSkills": ["marketing:seo-audit", "small-business:crm-cleanup", ...],
     "disabledAgents": ["brand-voice:guideline-generation", ...]
   }
   ```

3. **Updated Documentation** — CLAUDE.md section with:
   - "Recommended Skills for This Project" (by category)
   - Skills to use vs. avoid for each project focus
   - MCP authentication checklist

4. **Before You Apply** — The skill asks you to review and confirm before making changes. You can:
   - Accept all changes
   - Tweak the decision matrix (override specific classifications)
   - Dry-run (see what would change without applying)
   - Reject and iterate

---

## Input Format

You can be **casual and descriptive** or **structured**. Examples:

### Example 1: Casual Description
```
I have three things going on:
1. A static website for my herbal business - just HTML/CSS, needs design improvements and SEO
2. I want to offer SEO/marketing as a service to clients
3. Future: automating business stuff (CRM, invoicing, etc.)

I'm drowning in small-business skills I don't use, and I see duplicate SEO tools. Help me clean up.
```

### Example 2: Structured
```json
{
  "projects": [
    {"name": "marketing-site", "technologies": ["HTML", "CSS", "vanilla JS"], "focus": ["design", "SEO", "content"]},
    {"name": "seo-service-offering", "focus": ["audits", "strategy", "reporting"]},
    {"name": "automation-future", "focus": ["CRM", "task management", "integrations"]}
  ],
  "pain_points": [
    "40+ small-business skills are noise",
    "SEO: choose between marketing:seo-audit and searchfit-seo:seo-audit",
    "design skill duplication"
  ],
  "known_conflicts": ["code-review vs engineering:code-review"]
}
```

You can mix formats — the skill will parse either.

---

## Output: The Audit Report

The skill will show you:

### Section 1: Audit Matrix (High-Level)

| Category | Skill | Immediate | Future | Overlap | Verdict |
|---|---|---|---|---|---|
| SEO | searchfit-seo:seo-audit | ✅ 40% | ✅ 30% | ⚠️ -20% | **USE NOW** |
| SEO | marketing:seo-audit | ❌ 0% | ❌ 0% | ❌ -20% | **DISABLE** |
| Design | design-taste-frontend | ✅ 40% | ✅ 30% | ✅ 0% | **USE NOW** |
| Automation | small-business:crm-cleanup | ❌ 0% | ✅ 30% | ⚠️ -10% | **DISABLE** |

### Section 2: Conflict Analysis

```
DUPLICATE FOUND:
  - code-review (skill)
  - engineering:code-review (skill)
  → Winner: code-review (more direct, commonly used)
  → Action: Disable engineering:code-review

OVERLAP FOUND:
  - marketing:seo-audit (generic)
  - searchfit-seo:seo-audit (specialized)
  → Winner: searchfit-seo:seo-audit (better for SEO-as-service)
  → Action: Disable marketing:seo-audit

MCPs WITHOUT AUTH (can unlock):
  - plugin:engineering:github (Cloudflare Pages deployment)
  - plugin:productivity:notion (project org)
  - plugin:productivity:linear (task automation)
```

### Section 3: Changes Summary

```
✅ Skills to Keep Enabled: 15
🔇 Skills to Disable: 28
📋 Skills to Document: 12
❌ Skills to Delete: 0

If approved:
- .claude/settings.json will add disabledSkills + disabledAgents
- CLAUDE.md will add "Recommended Skills for This Project" section
- /autocomplete will show ~20 relevant skills instead of ~100
```

### Section 4: Review & Approval

```
Before I apply these changes, review and confirm:
- Does the "USE NOW" list match your actual needs?
- Any skills you want to keep that I marked DISABLE?
- Any you want to disable that I marked USE NOW?

Respond with:
  approve → Apply all changes
  revise: "keep small-business:*, disable design:critique" → Modify and reshow
  dry-run → Show what would change without applying
  cancel → Stop here
```

---

## What Happens After Approval

1. ✅ `.claude/settings.json` is updated (or created) with `disabledSkills` and `disabledAgents`
2. ✅ `CLAUDE.md` gets a new "Recommended Skills for This Project" section (or replaces existing)
3. ✅ MCPs without auth are listed with a reminder to authenticate in claude.ai settings
4. ✅ Summary of changes applied is shown
5. ✅ Next time you type `/`, your autocomplete will be cleaner and focused

---

## The Decision Matrix in Detail

For each skill, the audit scores on these dimensions:

### Immediate Utility (40% weight)
- **40–100%** — Used for active project right now, high relevance
- **20–40%** — Tangentially relevant, may use in coming weeks
- **0–20%** — No current use case
- **0%** — Out of scope entirely

### Future Utility (30% weight)
- **30–100%** — Planned project will definitely use this
- **10–30%** — Planned project might use this
- **0–10%** — Possible use case but not planned
- **0%** — No future project plans include this

### Functional Overlap (20% weight, negative)
- **0%** — Unique, no other skill does this
- **-10%** — Similar but distinct approach (both worth keeping)
- **-20%** — Significant overlap with another skill
- **-30%** — Exact duplicate of another skill

### Maintenance (10% weight)
- **10%** — Active, up-to-date, in-scope
- **5%** — Older but stable
- **0%** — Abandoned or out-of-scope

**Verdict = (Immediate × 0.4) + (Future × 0.3) + (Overlap × 0.2) + (Maintenance × 0.1)**

- **Verdict > 30** → USE NOW
- **Verdict 10–30** → DISABLE (for now, but keep available)
- **Verdict < 10** → DOCUMENT (note why it exists, keep if user confirms)
- **Verdict < 0 and overlap < -25%** → DELETE (rare; only exact duplicates with zero utility)

---

## Tips for Best Results

1. **Be specific about projects** — "web design" is vague; "static HTML/CSS site with Tailwind" is clear
2. **List pain points** — "I have 40 small-business skills I never use" helps identify clutter
3. **Mention your workflow** — "I use Notion for docs and Linear for tasks" hints at useful MCPs
4. **Don't over-decide** — The audit will classify each skill; you just confirm or tweak
5. **Re-run periodically** — Every few months, especially after adding a new project

---

## Example: Full Audit Session

**User input:**
```
Projects:
1. Static astrology/herbal site — HTML/CSS, need design + SEO
2. Offering SEO as a service
3. Future: automation (CRM, email, etc.)

Pain: 40 small-business skills, duplicate SEO audits, not sure which design skills to use
```

**Skill output:**
```
Analyzing 120 available skills...

AUDIT MATRIX:
✅ USE NOW (15 skills)
  - design-taste-frontend, design:design-critique, design:accessibility-review
  - searchfit-seo:seo-audit, searchfit-seo:on-page-seo, ...
  - code-review, verify
  - marketing:draft-content, design:ux-copy

🔇 DISABLE (28 skills)
  - marketing:seo-audit ← duplicate of searchfit-seo:seo-audit
  - engineering:code-review ← duplicate of code-review
  - 25+ small-business:* ← future use, disable now

📋 DOCUMENT (12 skills)
  - engineering:* (6 skills) ← static site, no backend needed
  - anthropic-skills:video, image, docx ← out of scope

CONFLICTS FOUND:
- DUPLICATE: code-review vs engineering:code-review → Keep code-review
- OVERLAP: marketing:seo-audit vs searchfit-seo:seo-audit → Keep searchfit-seo
- OVERLAP: brand-voice:discover-brand (skill) vs agent → Keep skill, disable agent

MCPS TO AUTHENTICATE:
- GitHub (deployment to Cloudflare Pages)
- Notion (documentation)
- Linear (automation later)

Ready to apply? (approve / revise / dry-run / cancel)
```

---

## Troubleshooting

**"I disagree with a classification"**
→ Use `revise:` and list specific changes. The skill will re-evaluate and reshow.

**"I want to keep a skill you marked DISABLE"**
→ Respond `revise: "keep small-business:customer-pulse"` and it will stay enabled.

**"Will this affect my existing setups?"**
→ Use `dry-run` to see changes before applying. Changes only apply on `approve`.

**"Can I undo this?"**
→ Yes — the skill saves backups of old config and CLAUDE.md, and you can always re-run the audit to flip things back.
