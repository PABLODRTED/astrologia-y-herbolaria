#!/bin/bash
# 🚀 Install skills-audit skill - One-Command Installer
# Usage:
#   bash install-skills-audit.sh
# Or:
#   curl -s https://raw.githubusercontent.com/PABLODRTED/astrologia-y-herbolaria/main/install-skills-audit.sh | bash

echo "╔════════════════════════════════════════╗"
echo "║  Installing skills-audit skill         ║"
echo "╚════════════════════════════════════════╝"
echo ""

# GitHub repository details
GITHUB_REPO="PABLODRTED/astrologia-y-herbolaria"
GITHUB_BRANCH="main"
SKILL_NAME="skills-audit"
SKILL_PATH=".claude/skills/skills-audit"

# Detect .claude/skills directory
CLAUDE_SKILLS_DIR="$HOME/.claude/skills"

# Create directory if needed
if [ ! -d "$CLAUDE_SKILLS_DIR" ]; then
    echo "📁 Creating .claude/skills directory..."
    mkdir -p "$CLAUDE_SKILLS_DIR"
fi

SKILL_TARGET_DIR="$CLAUDE_SKILLS_DIR/$SKILL_NAME"

# Files to download
declare -a files=(
    "https://raw.githubusercontent.com/$GITHUB_REPO/$GITHUB_BRANCH/$SKILL_PATH/SKILL.md:SKILL.md"
    "https://raw.githubusercontent.com/$GITHUB_REPO/$GITHUB_BRANCH/$SKILL_PATH/README.md:README.md"
    "https://raw.githubusercontent.com/$GITHUB_REPO/$GITHUB_BRANCH/$SKILL_PATH/INSTALL.md:INSTALL.md"
    "https://raw.githubusercontent.com/$GITHUB_REPO/$GITHUB_BRANCH/$SKILL_PATH/evals/evals.json:evals/evals.json"
)

echo "📥 Downloading $SKILL_NAME from GitHub..."

# Remove existing skill if present
if [ -d "$SKILL_TARGET_DIR" ]; then
    rm -rf "$SKILL_TARGET_DIR"
fi

# Create skill directory
mkdir -p "$SKILL_TARGET_DIR/evals"

# Download files
all_success=true
for file_spec in "${files[@]}"; do
    IFS=':' read -r url name <<< "$file_spec"
    echo "  ⬇️  $name..."

    target_path="$SKILL_TARGET_DIR/$name"
    target_dir=$(dirname "$target_path")
    mkdir -p "$target_dir"

    if curl -sf "$url" -o "$target_path"; then
        echo "      ✓ Done"
    else
        echo "      ✗ Failed"
        all_success=false
    fi
done

if [ "$all_success" = true ]; then
    echo ""
    echo "╔════════════════════════════════════════╗"
    echo "║  ✅ Installation Complete!             ║"
    echo "╚════════════════════════════════════════╝"
    echo ""
    echo "📍 Location: $SKILL_TARGET_DIR"
    echo ""
    echo "🎯 Quick Start:"
    echo "   1. Restart Claude Code"
    echo "   2. Type: /skills-audit"
    echo "   3. Describe your projects and pain points"
    echo ""
    echo "📚 Documentation: $SKILL_TARGET_DIR/README.md"
    echo ""
else
    echo ""
    echo "❌ Installation failed. Some files could not be downloaded."
    echo "Check your internet connection and try again."
    exit 1
fi
