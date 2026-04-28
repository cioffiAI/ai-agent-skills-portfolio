# Workflow Principles

## Purpose

The seven skills are not generic prompts. They are operational roles that make AI-assisted work more repeatable, inspectable, and safer.

Use the smallest role that fits the task.

## Recommended Sequences

For unclear work:

```text
scout -> planner -> guardian -> builder -> critic-qa -> librarian
```

For simple implementation:

```text
planner -> builder -> critic-qa
```

For documentation work:

```text
scout -> librarian -> critic-qa
```

For repeatable procedures:

```text
operator -> critic-qa -> librarian
```

For risky work:

```text
guardian -> planner -> builder/operator
```

## Global Skills vs Project Skills

Global skills live in user-level skill directories:

```text
C:\Users\antonio\.codex\skills\
C:\Users\antonio\.claude\skills\
```

Use them for personal workflows that should be available everywhere.

Project skills live inside a repository:

```text
skills\
.claude\skills\
.agents\skills\
```

Use them for repository-specific procedures and examples.

Global skills answer: "How do I generally work?"

Project skills answer: "How should I work in this project?"

## AGENTS.md, CLAUDE.md, and SKILL.md

`AGENTS.md` is repository-level guidance for AI coding agents. It should contain stable rules that always apply in the project: safety, editing discipline, verification, and scope control.

`CLAUDE.md` is Claude Code project memory. It serves a similar purpose for Claude Code sessions and can include stable conventions, expected workflow, and verification language.

`SKILL.md` is a reusable operating procedure. It should be narrow and invoked only when relevant.

Use this split:

```text
AGENTS.md   -> always-on rules for agents in this repository
CLAUDE.md   -> always-on Claude Code project memory
SKILL.md    -> task-specific workflow loaded when needed
```

Do not put every workflow into `AGENTS.md` or `CLAUDE.md`. If a procedure is only useful sometimes, make it a skill.

## Invocation Examples

Context gathering:

```text
Use $scout to inspect the relevant files and separate observed facts from assumptions.
```

Planning:

```text
Use $planner to produce a minimal plan with scope, risks, verification, and stop conditions.
```

Implementation:

```text
Use $builder to implement the plan with the smallest safe change.
```

Review:

```text
Use $critic-qa to review this output for bugs, weak assumptions, regressions, and missing checks.
```

Documentation:

```text
Use $librarian to preserve the final decision and update the smallest relevant document.
```

Procedure execution:

```text
Use $operator to run this checklist step by step and report outputs and anomalies.
```

Risk control:

```text
Use $guardian before deleting files, changing credentials, deploying, or running expensive tools.
```

## Practical Rule

If a task is unclear, start with `scout` or `planner`.

If a task is risky, start with `guardian`.

If a task is already clear and low risk, use `builder`.

If the work seems finished, use `critic-qa` before calling it complete.

If the work creates reusable knowledge, finish with `librarian`.
