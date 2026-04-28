# Scout Example

## Input

Leggi questo repository e dimmi quali file devo controllare prima di modificare il modo in cui vengono definite le skill.

## Skill Used

scout

## Output

Goal: capire il contesto minimo prima di modificare le skill.

Inspected sources:

- `README.md`
- `AGENTS.md`
- `skills/*/SKILL.md`

Relevant findings:

- `README.md` descrive sette ruoli principali e una struttura prevista per `skills/`.
- `AGENTS.md` richiede modifiche piccole, sicure e verificate.
- Ogni skill ha un `SKILL.md` con frontmatter e procedura operativa.

Observed:

- Le skill esistenti sono procedure leggere, senza script o asset.
- Il repository usa esempi e case study come parte del portfolio.

Inferred:

- Gli esempi dovrebbero mostrare il comportamento pratico delle skill, non solo ripetere la teoria.

Missing:

- Non è ancora chiaro se gli esempi coprano casi reali sufficientemente diversi.

Recommended next step: usare `librarian` per aggiungere esempi documentali oppure `planner` se serve prima definire una struttura più ampia.

## Why This Matters

Questo output è migliore di una risposta generica perché mostra quali fonti sono state controllate, distingue fatti e assunzioni, e indica il prossimo passo senza iniziare modifiche premature.
