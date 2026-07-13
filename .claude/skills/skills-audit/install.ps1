# Install skills-audit skill
# Usage: powershell -ExecutionPolicy Bypass -File install.ps1

Write-Host "🚀 Installing skills-audit skill..." -ForegroundColor Cyan

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

# Get the script's directory
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path

# Copy skill files
$skillSourceDir = $scriptDir
$skillTargetDir = Join-Path $claudeSkillsDir "skills-audit"

Write-Host "📋 Copying skill files..." -ForegroundColor Yellow

# Remove if exists
if (Test-Path $skillTargetDir) {
    Remove-Item -Recurse -Force $skillTargetDir
}

# Copy entire skills-audit directory
Copy-Item -Path $skillSourceDir -Destination $skillTargetDir -Recurse -Force

Write-Host "✅ Skill installed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "📍 Location: $skillTargetDir" -ForegroundColor Cyan
Write-Host ""
Write-Host "🎯 Quick Start:" -ForegroundColor Cyan
Write-Host "   Type: /skills-audit" -ForegroundColor White
Write-Host "   Then describe your projects and pain points" -ForegroundColor White
Write-Host ""
Write-Host "📚 Documentation: $(Join-Path $skillTargetDir 'README.md')" -ForegroundColor Cyan
