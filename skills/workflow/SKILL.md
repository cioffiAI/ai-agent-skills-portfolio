---
name: workflow
description: Select and run the smallest appropriate combination of scout, planner, builder, critic-qa, librarian, operator, and guardian for the current task.
---

# Workflow Selector

## Objective

Choose the smallest safe agent workflow for the current request.

## Procedure

1. Classify the request:
   - unclear;
   - implementation;
   - review;
   - documentation;
   - repeatable procedure;
   - risky/destructive.

2. Select the workflow:

**Unclear:**

```
scout -> planner
```

**Implementation:**

```
planner -> builder -> critic-qa
```

**Risky implementation:**

```
scout -> planner -> guardian -> builder -> critic-qa
```

**Documentation:**

```
scout -> librarian -> critic-qa
```

**Repeatable procedure:**

```
operator -> critic-qa
```

## Rules

- Do not run every skill by default.
- Before editing files, define:
  - goal;
  - scope;
  - files likely involved;
  - risks;
  - verification.

## Output

Return:

- task type;
- workflow selected;
- reason for selected workflow;
- planned steps;
- verification plan;
- stop conditions.

## Limits

- Do not execute unrelated workflows.
- Do not edit files unless the selected workflow requires implementation or documentation changes.
- Do not perform destructive, costly, privacy-sensitive, or irreversible actions without using `guardian`.
- If the request does not fit a listed category, stop after `scout -> planner` and report the uncertainty.

## After work, report:

- workflow used;
- changed files;
- verification;
- remaining uncertainty.
