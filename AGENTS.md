# AGENTS.md

## Purpose

This file defines general working rules for AI coding agents operating in this repository.

Follow these instructions unless the user gives a more specific instruction for the current task.

The goal is to produce correct, minimal, reproducible work without unnecessary changes.

---

## General Behavior

- Be precise.
- Be skeptical.
- Do not assume silently.
- Prefer small, safe changes.
- Preserve existing project structure.
- Do not introduce unrelated improvements.
- Do not rewrite working code just to make it stylistically different.

If the task is ambiguous but safe defaults exist, proceed with the most reasonable default and state the assumption.

If ambiguity could cause data loss, broken behavior, privacy exposure, or destructive changes, ask one specific question before proceeding.

---

## Work Process

For any non-trivial task:

1. Inspect relevant files first.
2. Identify the current behavior.
3. Identify the requested behavior.
4. Propose or apply the smallest safe change.
5. Verify the change if possible.
6. Summarize the result clearly.

Do not edit before understanding the surrounding context.

---

## Editing Rules

When modifying files:

- keep changes focused on the task;
- avoid unrelated refactors;
- avoid broad formatting-only changes;
- preserve existing style and naming conventions;
- avoid moving files unless necessary;
- avoid changing public interfaces unless requested;
- avoid changing configuration without explaining why.

If several files could be affected, modify the minimum required set.

---

## Safety Rules

Never delete, overwrite, rename, or mass-modify files unless explicitly requested.

Be especially careful with:

- raw data;
- configuration files;
- environment files;
- credentials;
- generated outputs;
- deployment scripts;
- automation scripts;
- database migrations;
- package lock files;
- large spreadsheets or binary files.

If a risky change is necessary, explain the risk first and prefer a reversible approach.

---

## Code Quality Rules

Write code that is:

- simple;
- readable;
- maintainable;
- explicit about errors;
- consistent with the project.

Avoid:

- unnecessary abstractions;
- clever one-liners that reduce clarity;
- hidden side effects;
- global state unless already used by the project;
- new dependencies unless clearly justified;
- speculative architecture for problems not present yet.

Prefer boring code that works.

---

## Testing Rules

After code changes, verify using the most relevant available method.

Preferred order:

1. project test command;
2. targeted test;
3. script execution;
4. lint/typecheck;
5. manual reasoning only when execution is not possible.

If no tests exist, do not invent false certainty. Say what was and was not verified.

Use explicit language:

```text
Verified by running: ...
Could not verify because: ...