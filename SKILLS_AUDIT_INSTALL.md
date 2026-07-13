# 🚀 Install skills-audit Skill - Quick Guide

**One-command installation for the skills-audit skill** — Audit and optimize your Claude tools.

---

## ⚡ Quick Install

### Windows (PowerShell)
```powershell
powershell -ExecutionPolicy Bypass -Command "& {iex(New-Object Net.WebClient).DownloadString('https://raw.githubusercontent.com/PABLODRTED/astrologia-y-herbolaria/main/install-skills-audit.ps1')}"
```

Or if you have the file locally:
```powershell
powershell -ExecutionPolicy Bypass -File ./install-skills-audit.ps1
```

### macOS / Linux (Bash)
```bash
bash <(curl -s https://raw.githubusercontent.com/PABLODRTED/astrologia-y-herbolaria/main/install-skills-audit.sh)
```

Or if you have the file locally:
```bash
bash ./install-skills-audit.sh
```

---

## ✅ Verify Installation

After install:
1. **Restart Claude Code**
2. Type `/` to open autocomplete
3. Look for `skills-audit` in the list
4. Click it or type `/skills-audit`

---

## 📝 First Use Example

```
/skills-audit

I have 3 projects:
1. A static website for my herbal business (HTML/CSS)
2. Offering SEO services to clients
3. Future: automating CRM and invoicing

Problem: I have 40+ small-business skills I don't use, and duplicate SEO tools.
Please audit and suggest what to keep vs disable.
```

---

## 🎯 What the Skill Does

✅ Creates a decision matrix for each skill  
✅ Identifies duplicates and conflicts  
✅ Rates tools by immediate/future utility  
✅ Suggests `.claude/settings.json` changes  
✅ Updates CLAUDE.md with recommendations  
✅ Asks for approval before applying changes  

---

## 📁 Installation Details

**What gets installed:**
```
~/.claude/skills/skills-audit/
├── SKILL.md              # Skill definition
├── README.md             # Full documentation
├── INSTALL.md            # Installation help
├── install.ps1           # Windows installer
├── install.sh            # macOS/Linux installer
└── evals/
    └── evals.json        # 3 test cases
```

**Installation location:**
- Windows: `%USERPROFILE%\.claude\skills\skills-audit\`
- macOS/Linux: `~/.claude/skills/skills-audit/`

---

## 🆘 Troubleshooting

### "PowerShell not found" (Windows)
→ Try running as Administrator or use Git Bash

### "Permission denied" (macOS/Linux)
→ Try: `chmod +x install-skills-audit.sh && bash install-skills-audit.sh`

### Skill doesn't appear after install
→ Restart Claude Code completely

### Files won't download
→ Check internet connection and try again  
→ Or do manual install (see `.claude/skills/skills-audit/INSTALL.md`)

---

## 📚 Full Documentation

- **Setup & Usage:** `.claude/skills/skills-audit/README.md`
- **Skill Details:** `.claude/skills/skills-audit/SKILL.md`
- **Test Cases:** `.claude/skills/skills-audit/evals/evals.json`

---

## 🔗 Repository

Source: https://github.com/PABLODRTED/astrologia-y-herbolaria/tree/main/.claude/skills/skills-audit

---

**Ready?** Run one of the install commands above, then use `/skills-audit` in Claude Code! 🎉
