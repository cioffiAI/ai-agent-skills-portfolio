# Safe Automation Workflow

## Problem

Un'attivita' ripetibile doveva essere automatizzata: validare tutte le skill del portfolio. La richiesta era semplice, ma poteva diventare rischiosa se lo script avesse modificato file, introdotto dipendenze inutili o assunto percorsi non validi.

Il rischio principale era creare automazione opaca invece di uno strumento piccolo, leggibile e verificabile.

## Initial Input

```text
Crea uno script che controlli tutte le skill e dica quali sono valide o mancanti di sezioni obbligatorie.
```

## Agent Roles Used

- Planner
- Guardian
- Builder
- Operator
- Critic / QA

## Workflow

1. Planner definisce il comportamento minimo dello script.
2. Guardian controlla che lo script sia read-only e non distruttivo.
3. Builder implementa `scripts/validate_skills.py`.
4. Operator esegue lo script e registra l'output.
5. Critic / QA controlla se il risultato dimostra davvero che le skill rispettano la struttura minima.

## Output

Automazione finale prodotta:

```text
scripts/validate_skills.py
```

Comportamento:

1. Cerca la cartella `skills/`.
2. Trova ogni file `*/SKILL.md`.
3. Controlla sezioni obbligatorie:
   - frontmatter;
   - `name:`;
   - `description:`;
   - `## Objective`;
   - `## Procedure`;
   - `## Output`;
   - `## Limits`.
4. Stampa `OK` per le skill valide.
5. Stampa `FAIL` e sezioni mancanti per le skill incomplete.
6. Restituisce exit code `0` se non ci sono errori, `1` se ci sono errori.

Output atteso:

```text
OK: skills/builder/SKILL.md
OK: skills/critic-qa/SKILL.md
OK: skills/guardian/SKILL.md
OK: skills/librarian/SKILL.md
OK: skills/operator/SKILL.md
OK: skills/planner/SKILL.md
OK: skills/scout/SKILL.md

Checked skills: 7
Invalid skills: 0
```

## Verification

E' stato controllato:

- che lo script non scriva o cancelli file;
- che funzioni senza dipendenze esterne;
- che rilevi tutte le sette skill;
- che l'output usi percorsi stabili con `/`;
- che il conteggio finale riporti sette skill e zero invalide.

## Limitations

Non e' stato verificato:

- il parsing YAML completo del frontmatter;
- la qualita' semantica delle descrizioni;
- la correttezza dei metadati `agents/openai.yaml`;
- l'esecuzione con il comando `python` quando Python non e' nel PATH locale.

## Lessons Learned

L'automazione utile per un portfolio deve essere piccola, leggibile e non distruttiva.

Il pattern riutilizzabile e':

```text
repeatable check -> read-only script -> explicit output -> exit code -> documented limitation
```

Questo case study mostra come `planner`, `guardian`, `builder`, `operator` e `critic-qa` possono collaborare senza trasformare un controllo semplice in infrastruttura inutile.
