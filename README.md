# AI Agent Skills Portfolio

A practical portfolio of reusable AI-agent skills for Codex, Claude Code, and AI-assisted technical workflows.

This repository is designed to show how repeated work patterns can be transformed into clear, reusable, and verifiable agent instructions.

The goal is not to collect generic prompts. The goal is to build a personal operating system for working with AI agents: planning, coding, reviewing, documenting, automating, and controlling risk.

---

## Project Status

This repository contains the first complete version of the seven core AI-agent skills plus `AC-Workflow`, a workflow selector that chooses the smallest safe combination of those skills for the current task.

- scout
- planner
- builder
- critic-qa
- librarian
- operator
- guardian
- workflow

The next layer of the project focuses on examples, case studies, validation scripts, and usage documentation.

---

## Why This Repository Exists

Most people use AI tools as advanced chatbots.

This repository is based on a different idea: AI agents should be treated as operational roles inside a workflow.

Instead of asking the model to “help with a task” every time from scratch, the same recurring patterns can be encoded into reusable skills.

Examples:

- turn a messy request into a clear implementation plan;
- review code without blindly accepting the first solution;
- check assumptions before trusting an output;
- document decisions and changes;
- protect files, costs, credentials, and data;
- produce repeatable workflows instead of isolated conversations.

---

## Core Agent Roles

The portfolio is built around seven main agent roles.

| Role | Purpose | Typical Use |
|---|---|---|
| Scout | Finds and summarizes relevant context | Research, docs, files, examples, sources |
| Planner | Turns unclear goals into an execution plan | Roadmaps, task breakdown, safe implementation steps |
| Builder | Implements the actual change | Code, files, scripts, workflows, documentation |
| Critic / QA | Looks for errors and weak assumptions | Review, bug finding, edge cases, validation |
| Librarian | Organizes and preserves knowledge | README, changelog, notes, decisions, project memory |
| Operator | Executes repeatable procedures | Running scripts, reports, checklists, exports |
| Guardian | Controls risk | File safety, privacy, cost, destructive actions, permissions |

These roles do not need to be seven separate autonomous bots. They are reusable mental and operational modes that can be implemented as skills, prompts, subagents, or workflow steps.

---

## Skills Index

| Skill | Purpose | File |
|---|---|---|
| Scout | Context discovery | [SKILL.md](skills/scout/SKILL.md) |
| Planner | Execution planning | [SKILL.md](skills/planner/SKILL.md) |
| Builder | Focused implementation | [SKILL.md](skills/builder/SKILL.md) |
| Critic / QA | Review and validation | [SKILL.md](skills/critic-qa/SKILL.md) |
| Librarian | Knowledge preservation | [SKILL.md](skills/librarian/SKILL.md) |
| Operator | Repeatable execution | [SKILL.md](skills/operator/SKILL.md) |
| Guardian | Risk control | [SKILL.md](skills/guardian/SKILL.md) |
| AC-Workflow | Workflow selection | [SKILL.md](skills/workflow/SKILL.md) |

---

## CLI Installer

The portfolio includes a small npm CLI for installing the packaged skills into local Codex and Claude Code skill directories.

Install globally:

```bash
npm install -g cioffi-agentskills@0.1.1
```

Check the local environment:

```bash
cioffi-agentskills doctor --json
```

List packaged skills:

```bash
cioffi-agentskills list --json
```

Install all packaged skills into both Codex and Claude Code:

```bash
cioffi-agentskills install all --target both
```

Install only `AC-Workflow`, the workflow selector skill:

```bash
cioffi-agentskills install workflow --target both
```

The CLI installs skills into:

```text
$HOME/.codex/skills/<skill-name>
$HOME/.claude/skills/<skill-name>
```

On Windows, this usually means:

```text
C:\Users\<user>\.codex\skills\<skill-name>
C:\Users\<user>\.claude\skills\<skill-name>
```

Useful options:

```bash
cioffi-agentskills install all --target codex
cioffi-agentskills install all --target claude
cioffi-agentskills install all --target both --dry-run
cioffi-agentskills install all --target both --yes
cioffi-agentskills install all --target both --yes --force
cioffi-agentskills install workflow --target both --dry-run --json
```

Safety behavior:

```text
without --yes, interactive installs ask for confirmation;
with --json, real installs require --yes;
without --force, existing skill folders are skipped;
with --force, existing skill folders are backed up before replacement;
--dry-run shows planned actions without writing files.
```

The installable skill name is `workflow`; the documented workflow name is `AC-Workflow`.

---

## CLI Behavior in v0.1.1

`cioffi-agentskills@0.1.1` installs skills from the packaged npm contents, not from the live GitHub repository.

This makes installations reproducible for a given npm version.

Commands:

```bash
cioffi-agentskills list
```

Lists packaged skills.

```bash
cioffi-agentskills install all --target both
```

Installs all packaged skills into Codex and Claude Code user skill folders.

```bash
cioffi-agentskills install workflow --target both
```

Installs only `AC-Workflow`.

Safety behavior:

```text
--dry-run previews actions without writing files;
--json requires --yes for real installs;
existing skill folders are skipped unless --force is used;
--force backs up existing skill folders before replacing them.
```

---

## Install on Another Machine

On another machine with Node.js 18 or newer:

```powershell
npm install -g cioffi-agentskills@0.1.1
cioffi-agentskills doctor --json
cioffi-agentskills install all --target both
```

Verify installation:

```powershell
Get-ChildItem "$HOME\.codex\skills"
Get-ChildItem "$HOME\.claude\skills"
```

Expected installed skills:

```text
builder
critic-qa
guardian
librarian
operator
planner
scout
workflow
```

---

## Manual Uninstall

Until a CLI `uninstall` command is added, remove installed skills manually.

PowerShell:

```powershell
$skills = @(
  "builder",
  "critic-qa",
  "guardian",
  "librarian",
  "operator",
  "planner",
  "scout",
  "workflow"
)

foreach ($skill in $skills) {
  Remove-Item -Recurse -Force "$HOME\.codex\skills\$skill" -ErrorAction SilentlyContinue
  Remove-Item -Recurse -Force "$HOME\.claude\skills\$skill" -ErrorAction SilentlyContinue
}
```

---

## Repository Structure

Current structure:

```text
ai-agent-skills-portfolio/
├── AGENTS.md
├── CHANGELOG.md
├── CLAUDE.md
├── LICENSE
├── README.md
├── case-studies/
│   ├── 01-from-messy-request-to-plan.md
│   ├── 02-code-review-with-critic.md
│   └── 03-safe-automation-workflow.md
├── docs/
│   ├── claude-code-setup.md
│   ├── codex-setup.md
│   └── workflow-principles.md
├── scripts/
│   └── validate_skills.py
├── skills/
│   ├── builder/
│   │   ├── SKILL.md
│   │   ├── agents/
│   │   │   └── openai.yaml
│   │   └── builder-example.md
│   ├── critic-qa/
│   │   ├── SKILL.md
│   │   ├── agents/
│   │   │   └── openai.yaml
│   │   └── critic-qa-example.md
│   ├── guardian/
│   │   ├── SKILL.md
│   │   ├── agents/
│   │   │   └── openai.yaml
│   │   └── guardian-example.md
│   ├── librarian/
│   │   ├── SKILL.md
│   │   ├── agents/
│   │   │   └── openai.yaml
│   │   └── librarian-example.md
│   ├── operator/
│   │   ├── SKILL.md
│   │   ├── agents/
│   │   │   └── openai.yaml
│   │   └── operator-example.md
│   ├── planner/
│   │   ├── SKILL.md
│   │   ├── agents/
│   │   │   └── openai.yaml
│   │   └── planner-example.md
│   ├── scout/
│   │   ├── SKILL.md
│   │   ├── agents/
│   │   │   └── openai.yaml
│   │   └── scout-example.md
│   └── workflow/
│       └── SKILL.md
```

The repository also includes the npm CLI entrypoint in `bin/cioffi-agentskills.js` and package metadata in `package.json`.

---

## How Skills Are Intended to Work

Each skill should be narrow, practical, and easy to trigger.

A good skill should define:

- when to use it;
- when not to use it;
- the expected input;
- the expected output;
- the required checks;
- the risks to watch for;
- examples of correct usage.

A skill should not be a vague motivational prompt. It should behave like a reusable operating procedure.

---

## Example Skill Format

```markdown
---
name: critic-qa
description: Review a plan, code change, document, or workflow by looking for errors, missing checks, weak assumptions, edge cases, and unverified claims.
---

# Critic / QA Skill

## Objective

Do not confirm the work too quickly. Look for what may be wrong, incomplete, fragile, or unverified.

## Procedure

1. Identify the stated goal.
2. Identify the actual output.
3. Check whether the output satisfies the goal.
4. Look for missing assumptions.
5. Look for edge cases.
6. Check whether verification was performed.
7. Separate verified facts from reasoning-based judgments.

## Output

Return:

- verdict;
- problems found;
- missing checks;
- suggested correction;
- remaining uncertainty.
```

---

## Example Workflow

A typical workflow should not jump directly from request to implementation.

`AC-Workflow` is the workflow selector for this portfolio. Use it when the task is not obviously a single role. It classifies the request and selects the smallest safe sequence instead of running every skill by default.

Preferred sequence:

```text
Scout → Planner → Guardian → Builder → Critic / QA → Librarian
```

For simpler tasks:

```text
Planner → Builder → Critic / QA
```

For recurring tasks:

```text
Operator → Critic / QA → Librarian
```

The important part is not the number of agents. The important part is knowing which role is needed, in which order, and with which limits.

---

## Usage with Codex

Codex skills can be placed inside a project-level `.agents/skills/` directory or a user-level skills directory.

Example project-level layout:

```text
.agents/
└── skills/
    └── critic-qa/
        └── SKILL.md
```

A typical instruction to Codex could be:

```text
Use the critic-qa skill to review this implementation plan before editing files.
Look for risky assumptions, unnecessary changes, and missing verification steps.
```

Recommended repository-level instruction file:

```text
AGENTS.md
```

This file should contain rules that are always true for the project, while skills should contain procedures that are used only when relevant.

---

## Usage with Claude Code

Claude Code skills can be placed inside a project-level `.claude/skills/` directory or a user-level skills directory.

Example project-level layout:

```text
.claude/
└── skills/
    └── planner/
        └── SKILL.md
```

A typical instruction to Claude Code could be:

```text
Use the planner skill first. Create a minimal implementation plan and identify which files should not be touched.
Do not edit files until the plan is clear.
```

Recommended repository-level memory file:

```text
CLAUDE.md
```

This file should contain stable working rules, project conventions, and safety expectations.

---

## Principles

### 1. Small beats impressive

A narrow skill that consistently improves a workflow is more useful than a generic “super agent”.

### 2. Verification matters

AI output should not be trusted just because it sounds coherent.

Every serious workflow should distinguish:

- executed checks;
- reasoning-based checks;
- unverified assumptions.

### 3. Reuse beats repetition

If the same instruction is used several times, it should become a skill, checklist, script, or project rule.

### 4. Agents need limits

Useful agents should know when to stop, when to ask for confirmation, and when a task is risky.

### 5. Documentation is part of the system

If a workflow cannot be explained, repeated, or audited, it is not yet mature.

---

## Skill Details

### Scout

Research and context-gathering skill.

Expected responsibilities:

- collect relevant files or sources;
- summarize useful context;
- separate facts from assumptions;
- identify missing information.

### Planner

Task decomposition and implementation planning skill.

Expected responsibilities:

- define the goal;
- identify files involved;
- propose the smallest safe change;
- list risks;
- define verification steps.

### Builder

Implementation skill.

Expected responsibilities:

- implement the requested change;
- preserve existing style;
- avoid unrelated refactors;
- report changed files.

### Critic / QA

Review and validation skill.

Expected responsibilities:

- find bugs;
- challenge assumptions;
- check edge cases;
- identify missing tests;
- avoid premature agreement.

### Librarian

Knowledge organization skill.

Expected responsibilities:

- update documentation;
- maintain decision logs;
- organize notes;
- preserve reusable knowledge.

### Operator

Repeatable execution skill.

Expected responsibilities:

- run procedures step by step;
- follow checklists;
- produce standard outputs;
- report anomalies.

### Guardian

Risk-control skill.

Expected responsibilities:

- prevent destructive actions;
- protect sensitive data;
- control cost and tool usage;
- flag irreversible changes;
- define stop conditions.

---

## Case Study Template

Each case study should use this structure:

```markdown
# Case Study Title

## Problem

What needed to be done?

## Initial Input

What was given to the agent?

## Agent Roles Used

- Scout
- Planner
- Builder
- Critic / QA

## Workflow

Step-by-step description.

## Output

What was produced?

## Verification

What was checked?

## Limitations

What remains uncertain?

## Lessons Learned

What should be reused in future workflows?
```

---

## Roadmap

### v0.1 - Scaffold

- [x] Initial README
- [x] Project purpose
- [x] Seven-role model

### v0.2 - Core Skills

- [x] Scout
- [x] Planner
- [x] Builder
- [x] Critic / QA
- [x] Librarian
- [x] Operator
- [x] Guardian
- [x] AC-Workflow
- [x] AGENTS.md
- [x] CLAUDE.md

### v0.3 - Portfolio Proof Layer

- [x] Add examples for each skill
- [x] Add first case study
- [x] Add validation script
- [x] Add setup documentation
- [x] Add changelog
- [x] Add license
- [x] Add npm CLI installer
- [x] Add packaged local skill installation
- [x] Add `install all` workflow
- [x] Add confirmation, dry-run, JSON, skip, and force behavior

### v0.4 - Public Presentation

- [x] Add 3 complete case studies
- [ ] Add a short demo workflow
- [ ] Add before/after examples

---

## What This Portfolio Is Meant to Demonstrate

This repository is intended to demonstrate practical AI-agent orchestration:

- not just using AI tools;
- not just writing prompts;
- but designing reusable procedures that make AI-assisted work safer, clearer, and more repeatable.

The final objective is to show a working method:

```text
input → agent role → procedure → output → verification → documentation
```

That loop is the real portfolio.

---

## License

This project is released under the MIT License.
See [LICENSE](LICENSE).
