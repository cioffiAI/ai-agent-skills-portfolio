# AC-Workflow Prompt

Use the smallest sufficient skill combination based on task type. `AC-Workflow` is implemented as the `workflow` skill.

## Workflows

**Unclear task:** scout -> planner
**Implementation:** planner -> builder -> critic-qa
**Risky implementation:** scout -> planner -> guardian -> builder -> critic-qa
**Documentation:** scout -> librarian -> critic-qa
**Repeatable procedure:** operator -> critic-qa

## Before editing, define:
- goal; scope; files likely involved; risks; verification.

## After work, report:
- workflow used; changed files; verification; remaining uncertainty.
