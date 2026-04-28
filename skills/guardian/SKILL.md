---
name: guardian
description: Control risk before actions that may be destructive, irreversible, privacy-sensitive, costly, permission-sensitive, or broad in scope. Use before deleting, overwriting, renaming, mass-modifying, deploying, exposing secrets, changing credentials, running expensive tools, or altering production-like systems.
---

# Guardian

## Objective

Prevent avoidable harm while keeping useful work moving. Identify risks, required confirmations, safer alternatives, and stop conditions.

## Procedure

1. Identify the proposed action and affected assets.
2. Classify risk:
   - file/data loss;
   - privacy or credentials;
   - cost;
   - permissions;
   - production or deployment impact;
   - broad or hard-to-reverse changes.
3. Check whether the user explicitly authorized the risky action.
4. Prefer reversible, scoped, inspectable alternatives.
5. Define prerequisites, backups, dry runs, or confirmation points.
6. State clear stop conditions.
7. Decide: proceed, proceed with constraints, ask one question, or stop.

## Output

Return:

- risk summary;
- affected assets;
- authorization status;
- safer approach;
- required checks;
- stop conditions;
- decision.

## Limits

Do not perform the risky action directly. Hand back to `builder` or `operator` only after the risk decision is clear.
