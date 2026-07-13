# 🚀 Install skills-audit skill - One-Command Installer
# Usage in Claude Code:
#   powershell -ExecutionPolicy RemoteSigned -File install-skills-audit.ps1
#   OR (if RemoteSigned fails):
#   powershell -ExecutionPolicy Bypass -File install-skills-audit.ps1
#
# SECURITY NOTE: ExecutionPolicy Bypass disables script signing requirements.
# Only run this script from trusted sources (official repository).
# RemoteSigned is safer — it allows locally-created scripts but blocks internet downloads without signing.

Write-Host "╔════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  Installing skills-audit skill         ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""
Write-Host "⚠️  Security Notice:" -ForegroundColor Yellow
Write-Host "   This script downloads files from GitHub." -ForegroundColor Gray
Write-Host "   Only run this from official sources." -ForegroundColor Gray
Write-Host ""

# GitHub repository details
$GITHUB_REPO = "PABLODRTED/astrologia-y-herbolaria"
$GITHUB_BRANCH = "main"
$SKILL_NAME = "skills-audit"
$SKILL_PATH = ".claude/skills/skills-audit"

# Detect .claude/skills directory
$claudeSkillsDir = if ($IsLinux -or $IsMacOS) {
    "$HOME/.claude/skills"
} else {
    "$HOME\.claude\skills"
}

# Create directory if needed
if (-not (Test-Path $claudeSkillsDir)) {
    Write-Host "📁 Creating .claude/skills directory..." -ForegroundColor Yellow
    New-Item -ItemType Directory -Path $claudeSkillsDir -Force | Out-Null
}

$skillTargetDir = Join-Path $claudeSkillsDir $SKILL_NAME

# Files to download
$files = @(
    @{url = "https://raw.githubusercontent.com/$GITHUB_REPO/$GITHUB_BRANCH/$SKILL_PATH/SKILL.md"; name = "SKILL.md"},
    @{url = "https://raw.githubusercontent.com/$GITHUB_REPO/$GITHUB_BRANCH/$SKILL_PATH/README.md"; name = "README.md"},
    @{url = "https://raw.githubusercontent.com/$GITHUB_REPO/$GITHUB_BRANCH/$SKILL_PATH/INSTALL.md"; name = "INSTALL.md"},
    @{url = "https://raw.githubusercontent.com/$GITHUB_REPO/$GITHUB_BRANCH/$SKILL_PATH/evals/evals.json"; name = "evals/evals.json"}
)

Write-Host "📥 Downloading $SKILL_NAME from GitHub..." -ForegroundColor Yellow

# Remove existing skill if present
if (Test-Path $skillTargetDir) {
    Remove-Item -Recurse -Force $skillTargetDir
}

# Create skill directory
New-Item -ItemType Directory -Path $skillTargetDir -Force | Out-Null
New-Item -ItemType Directory -Path "$skillTargetDir/evals" -Force | Out-Null

# Download files
$allSuccess = $true
foreach ($file in $files) {
    try {
        Write-Host "  ⬇️  $($file.name)..." -ForegroundColor Gray
        $targetPath = Join-Path $skillTargetDir $file.name
        (New-Object System.Net.WebClient).DownloadFile($file.url, $targetPath)
        Write-Host "      ✓ Done" -ForegroundColor Green
    } catch {
        Write-Host "      ✗ Failed: $_" -ForegroundColor Red
        $allSuccess = $false
    }
}

if ($allSuccess) {
    Write-Host ""
    Write-Host "╔════════════════════════════════════════╗" -ForegroundColor Green
    Write-Host "║  ✅ Installation Complete!             ║" -ForegroundColor Green
    Write-Host "╚════════════════════════════════════════╝" -ForegroundColor Green
    Write-Host ""
    Write-Host "📍 Location: $skillTargetDir" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "🎯 Quick Start:" -ForegroundColor Cyan
    Write-Host "   1. Restart Claude Code" -ForegroundColor White
    Write-Host "   2. Type: /skills-audit" -ForegroundColor White
    Write-Host "   3. Describe your projects and pain points" -ForegroundColor White
    Write-Host ""
    Write-Host "📚 Documentation: $skillTargetDir/README.md" -ForegroundColor Cyan
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "❌ Installation failed. Some files could not be downloaded." -ForegroundColor Red
    Write-Host "Check your internet connection and try again." -ForegroundColor Red
    exit 1
}
