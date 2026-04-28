# Codex Setup

## Where To Put Skills

Use one of two locations.

Global user skills:

```text
C:\Users\antonio\.codex\skills\
```

Use this when the skill should be available in any Codex session, across projects.

Project skills:

```text
<project-root>\.agents\skills\
```

Use this when the skill should be available to Codex only inside one repository.

This portfolio stores the source versions in:

```text
skills\
```

To use them as project-level Codex skills, copy them into `.agents\skills\`:

```text
skills\scout        -> .agents\skills\scout
skills\planner      -> .agents\skills\planner
skills\builder      -> .agents\skills\builder
skills\critic-qa    -> .agents\skills\critic-qa
skills\librarian    -> .agents\skills\librarian
skills\operator     -> .agents\skills\operator
skills\guardian     -> .agents\skills\guardian
```

## Copying Skills

To make the seven portfolio skills globally available to Codex, copy each skill folder:

```text
skills\scout        -> C:\Users\antonio\.codex\skills\scout
skills\planner      -> C:\Users\antonio\.codex\skills\planner
skills\builder      -> C:\Users\antonio\.codex\skills\builder
skills\critic-qa    -> C:\Users\antonio\.codex\skills\critic-qa
skills\librarian    -> C:\Users\antonio\.codex\skills\librarian
skills\operator     -> C:\Users\antonio\.codex\skills\operator
skills\guardian     -> C:\Users\antonio\.codex\skills\guardian
```

Each skill folder should contain at minimum:

```text
SKILL.md
```

This portfolio also includes:

```text
agents\openai.yaml
```

## Global vs Project Skills

Global skills are personal defaults. They should describe workflows you want available everywhere, such as planning, review, documentation, and risk control.

Project skills are repository-specific. They should describe procedures, conventions, or workflows that only make sense inside that project.

If the same skill exists globally and in a project, keep the project version more specific and the global version more general.

## AGENTS.md, CLAUDE.md, and SKILL.md

`AGENTS.md` contains stable rules for agents working in this repository. It is always-on project guidance: safety rules, editing rules, verification expectations, and general behavior.

`CLAUDE.md` contains similar persistent project memory for Claude Code. It is useful when the same repository is also used with Claude Code.

`SKILL.md` contains a task-specific operating procedure. It should be used only when the current task matches the skill, such as scouting context, planning, building, reviewing, documenting, operating, or guarding against risk.

Use `AGENTS.md` for Codex-facing rules that are always true. Use `CLAUDE.md` for Claude Code-facing project memory. Use `SKILL.md` for repeatable workflows that are invoked when relevant.

## Invocation Examples

```text
Use $scout to inspect the repository and identify the files relevant to this task.
```

```text
Use $planner to turn this request into a minimal implementation plan before editing.
```

```text
Use $builder to implement the requested change with minimal scope.
```

```text
Use $critic-qa to review this implementation for bugs, weak assumptions, and missing tests.
```

```text
Use $librarian to update the documentation after the work is complete.
```

```text
Use $operator to run this checklist step by step and report anomalies.
```

```text
Use $guardian to assess risks before deleting, overwriting, deploying, or exposing sensitive data.
```
