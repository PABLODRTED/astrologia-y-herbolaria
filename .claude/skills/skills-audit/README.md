# skills-audit Skill

**Audit and optimize your available skills, agents, and MCP connectors to reduce clutter and resolve conflicts.**

## Installation

### Option 1: Copy Files (Easiest)
1. Create a folder `.claude/skills/skills-audit/` in your project
2. Copy `SKILL.md` to `.claude/skills/skills-audit/`
3. Copy `evals/evals.json` to `.claude/skills/skills-audit/evals/`

### Option 2: Install as Personal Skill
If your Claude Code environment supports custom skills:
1. Save the entire `skills-audit/` folder to `~/.claude/skills/`
2. Restart Claude Code
3. The skill will appear in your available skills list

## Quick Start

Invoke with:
```
/skills-audit

I have 3 projects: [describe your projects]
Pain points: [what's creating clutter]
```

The skill will:
1. Analyze your available skills
2. Create a decision matrix
3. Identify duplicates and conflicts
4. Propose changes to `.claude/settings.json`
5. Ask for approval before applying

## Features

- **Decision Matrix** — Evaluates each skill by: immediate utility (40%), future utility (30%), functional overlap (20%), maintenance (10%)
- **Duplicate Detection** — Finds skills doing the same job
- **Conflict Analysis** — Identifies overlapping functionality
- **MCP Audit** — Lists connectors ready to authenticate
- **Safe Changes** — Asks for approval before modifying config
- **Reversible** — Changes are additive; you can always re-run the audit to undo

## Test Cases

3 test prompts in `evals/evals.json`:
1. **Casual input** — Natural language description of projects
2. **Structured JSON** — Formal project definitions
3. **Minimal input** — Single project scenario

## Usage Examples

### Example 1: Casual
```
I have a static website (HTML/CSS) that needs SEO, I offer SEO services,
and I'm planning to automate CRM stuff. I have 40+ small-business skills
I never use. Help me clean up.
```

### Example 2: Structured
```json
{
  "projects": [
    {"name": "marketing-site", "focus": ["design", "SEO", "content"]},
    {"name": "seo-service", "focus": ["audits", "reporting"]},
    {"name": "automation-future", "focus": ["CRM", "email"]}
  ],
  "pain_points": ["too many skills", "duplicate SEO tools"],
  "mcps_needed": ["github", "linear"]
}
```

### Example 3: Minimal
```
I just have one project: a landing page. What skills do I actually need?
```

## Output

The skill generates:
- **Audit Matrix** — All skills rated by utility
- **Conflict Report** — Duplicates, overlaps, MCPs without auth
- **Proposed Config** — Ready-to-use `.claude/settings.json` snippet
- **Documentation Update** — CLAUDE.md section with recommended skills

## Feedback & Improvements

If you find issues or have suggestions:
1. Document what happened
2. Share the test prompt
3. Note whether changes should be different

This helps improve the skill for all users.

---

**Created:** July 6-7, 2026  
**Status:** Beta (tested on 3 scenarios)  
**License:** Open for reuse in Claude Code projects
