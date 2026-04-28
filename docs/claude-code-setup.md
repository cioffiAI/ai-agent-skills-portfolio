# Claude Code Setup

## Where To Put Skills

Use one of two locations.

Global user skills:

```text
C:\Users\antonio\.claude\skills\
```

Use this when the skill should be available in any Claude Code session, across projects.

Project skills:

```text
<project-root>\.claude\skills\
```

Use this when the skill belongs only to one project. This portfolio stores its source skill examples in:

```text
skills\
```

If you want Claude Code to use project-local copies, copy them from `skills\` into `.claude\skills\`.

## Copying Skills

To make the seven portfolio skills globally available to Claude Code, copy each skill folder:

```text
skills\scout        -> C:\Users\antonio\.claude\skills\scout
skills\planner      -> C:\Users\antonio\.claude\skills\planner
skills\builder      -> C:\Users\antonio\.claude\skills\builder
skills\critic-qa    -> C:\Users\antonio\.claude\skills\critic-qa
skills\librarian    -> C:\Users\antonio\.claude\skills\librarian
skills\operator     -> C:\Users\antonio\.claude\skills\operator
skills\guardian     -> C:\Users\antonio\.claude\skills\guardian
```

Each skill folder should contain:

```text
SKILL.md
```

## Global vs Project Skills

Global skills are reusable personal workflows. Use them for roles that should follow you across repositories, such as `planner`, `critic-qa`, and `guardian`.

Project skills are local workflows. Use them when instructions depend on a repository's structure, commands, naming, deployment process, or documentation rules.

Avoid putting highly project-specific rules into global skills. A global skill should be safe to use in many repositories.

## AGENTS.md, CLAUDE.md, and SKILL.md

`AGENTS.md` contains stable repository-level guidance for AI coding agents. It is useful when the same repository is also used with Codex or other agent tools.

`CLAUDE.md` contains persistent project memory and operating rules for Claude Code inside this repository. It should describe stable expectations such as safety, verification, documentation style, and workflow discipline.

`SKILL.md` contains a reusable task procedure. It should be invoked when a specific role is needed.

Use `AGENTS.md` for general agent-facing repository rules. Use `CLAUDE.md` for Claude Code project memory. Use `SKILL.md` for focused procedures.

## Invocation Examples

```text
Use the scout skill to find the files and docs relevant to this request.
```

```text
Use the planner skill first. Create a minimal implementation plan and identify risks.
```

```text
Use the builder skill to make the smallest safe change.
```

```text
Use the critic-qa skill to review the result before we call it done.
```

```text
Use the librarian skill to update README or workflow notes with the final decision.
```

```text
Use the operator skill to run this validation checklist and report each result.
```

```text
Use the guardian skill before performing any destructive, costly, or privacy-sensitive action.
```
