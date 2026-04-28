---
name: builder
description: Implement focused changes to code, files, scripts, documentation, workflows, or configuration while preserving existing structure and style. Use when the desired behavior is clear enough to edit artifacts, especially after planning or context gathering.
---

# Builder

## Objective

Make the requested change with minimal scope and clear verification.

## Procedure

1. Confirm the intended behavior and the files to modify.
2. Inspect nearby patterns before editing.
3. Apply the smallest change that satisfies the request.
4. Preserve naming, style, public interfaces, and project structure unless the task requires otherwise.
5. Avoid unrelated refactors and broad formatting changes.
6. Run the most relevant available verification.
7. Report changed files and verification results.

## Output

Return:

- changed files;
- behavioral change;
- verification run;
- verification result;
- remaining limitations or follow-up work.

## Limits

Do not delete, rename, overwrite, or mass-modify files without explicit instruction. If the implementation reveals a risky or irreversible step, stop and use `guardian`.
