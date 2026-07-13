#!/bin/bash
# Install skills-audit skill
# Usage: bash install.sh

echo "🚀 Installing skills-audit skill..."
echo ""

# Detect .claude/skills directory
CLAUDE_SKILLS_DIR="$HOME/.claude/skills"

# Create directory if needed
if [ ! -d "$CLAUDE_SKILLS_DIR" ]; then
    echo "📁 Creating .claude/skills directory..."
    mkdir -p "$CLAUDE_SKILLS_DIR"
fi

# Get the script's directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Copy skill files
SKILL_TARGET_DIR="$CLAUDE_SKILLS_DIR/skills-audit"

echo "📋 Copying skill files..."

# Remove if exists
if [ -d "$SKILL_TARGET_DIR" ]; then
    rm -rf "$SKILL_TARGET_DIR"
fi

# Copy entire skills-audit directory
cp -r "$SCRIPT_DIR" "$SKILL_TARGET_DIR"

echo "✅ Skill installed successfully!"
echo ""
echo "📍 Location: $SKILL_TARGET_DIR"
echo ""
echo "🎯 Quick Start:"
echo "   Type: /skills-audit"
echo "   Then describe your projects and pain points"
echo ""
echo "📚 Documentation: $SKILL_TARGET_DIR/README.md"
