# Install skills-audit

Quick install of the **skills-audit** skill for Claude Code.

## One-Command Install

### Windows (PowerShell)
```powershell
# Option 1: Direct from GitHub
powershell -Command "& {[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; $url = 'https://github.com/PABLODRTED/astrologia-y-herbolaria/raw/main/.claude/skills/skills-audit/install.ps1'; $dest = '$HOME\.claude\skills\install-skills-audit.ps1'; (New-Object System.Net.WebClient).DownloadFile($url, $dest); & $dest }"

# Option 2: If you have the files locally
cd path/to/skills-audit
powershell -ExecutionPolicy Bypass -File install.ps1
```

### macOS / Linux (Bash)
```bash
# Option 1: Direct from GitHub
bash <(curl -s https://raw.githubusercontent.com/PABLODRTED/astrologia-y-herbolaria/main/.claude/skills/skills-audit/install.sh)

# Option 2: If you have the files locally
cd path/to/skills-audit
bash install.sh
```

---

## Manual Install (3 Steps)

### 1. Download
- Download from: https://github.com/PABLODRTED/astrologia-y-herbolaria/tree/main/.claude/skills/skills-audit
- Or: Get the ZIP file `skills-audit.zip`

### 2. Extract
```bash
# Windows
unzip skills-audit.zip -d %USERPROFILE%\.claude\skills\

# macOS/Linux
unzip skills-audit.zip -d ~/.claude/skills/
```

### 3. Verify
Open Claude Code and type `/skills-audit` — it should appear in autocomplete.

---

## What Gets Installed

```
~/.claude/skills/skills-audit/
├── SKILL.md           (Skill definition)
├── README.md          (Documentation)
├── install.ps1        (Windows installer)
├── install.sh         (Linux/Mac installer)
└── evals/
    └── evals.json     (Test cases)
```

---

## Verify Installation

After install, in Claude Code:
1. Type `/` to open autocomplete
2. Look for `skills-audit` in the list
3. Click it or type the name

If not visible:
- Restart Claude Code
- Check that files are in `~/.claude/skills/skills-audit/`
- Verify SKILL.md exists in that directory

---

## First Use

```
/skills-audit

I have 3 projects:
1. A static HTML/CSS website that needs SEO
2. Offering SEO as a service to clients
3. Future: automating business stuff

I'm drowning in 40+ small-business skills I don't need.
Help me clean this up!
```

The skill will analyze and propose changes.

---

## Uninstall

Simply delete:
- Windows: `%USERPROFILE%\.claude\skills\skills-audit\`
- macOS/Linux: `~/.claude/skills/skills-audit/`

---

## Issues?

If install fails:
1. Check that `~/.claude/skills/` directory exists
2. Verify you have write permissions
3. Try manual install (see above)
4. Check that SKILL.md was copied correctly

---

**Questions?** See README.md or contact the author.
