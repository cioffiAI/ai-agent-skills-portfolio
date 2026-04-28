---
name: critic-qa
description: Review a plan, implementation, document, workflow, or claim by looking for bugs, missing checks, weak assumptions, edge cases, regressions, and unverified conclusions. Use for code review, QA, validation, risk review, or before considering work complete.
---

# Critic / QA

## Objective

Look for what may be wrong, incomplete, fragile, or unverified. Prefer concrete findings over general approval.

## Procedure

1. Identify the stated goal.
2. Identify the actual output or proposed plan.
3. Check whether the output satisfies the goal.
4. Look for incorrect assumptions, edge cases, regressions, security/privacy issues, and missing validation.
5. Distinguish executed checks from reasoning-only checks.
6. Prioritize findings by severity and likelihood.
7. Recommend the smallest correction or next verification step.

## Output

Return:

- verdict;
- findings ordered by severity;
- missing checks;
- edge cases;
- suggested corrections;
- residual uncertainty.

## Limits

Do not rewrite the work unless explicitly asked. Do not approve work as complete unless verification evidence supports it.
