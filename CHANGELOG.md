# Changelog

All notable changes to this project will be documented in this file.

## Unreleased

- No unreleased changes yet.

## v0.1.1 - npm CLI local skill installer

- Added npm CLI package metadata for `cioffi-agentskills`.
- Added `cioffi-agentskills` command with `doctor`, `list`, and `install` commands.
- Added packaged local skill installation from the npm package contents.
- Added support for installing all packaged skills with `install all`.
- Added support for installing into Codex and Claude Code user skill folders:
  - `$HOME/.codex/skills`
  - `$HOME/.claude/skills`
- Added interactive confirmation for real installs.
- Added `--dry-run`, `--json`, `--yes`, `--force`, and `--target` behavior.
- Documented global npm installation and workflow skill installation examples.
- Documented the `workflow` skill as `AC-Workflow` across repository guidance and setup docs.

## v0.3.0 - Portfolio proof layer

- Added MIT license.
- Added documentation for Codex and Claude Code setup.
- Added workflow principles documentation.
- Added example files for the main skills.
- Added first case study template/example.
- Added skill structure validation script.

## v0.2.0 - Core agent skills

- Added seven core reusable skills:
  - scout
  - planner
  - builder
  - critic-qa
  - librarian
  - operator
  - guardian
- Added `AGENTS.md` for repository-level agent rules.
- Added `CLAUDE.md` for Claude Code project memory and workflow rules.

## v0.1.0 - Initial scaffold

- Created the initial project README.
- Defined the purpose of the portfolio.
- Defined the seven-role model for AI-agent workflows.
