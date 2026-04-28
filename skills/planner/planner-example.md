# Planner Example

## Input

Voglio migliorare il README e aggiungere esempi per le skill, ma non voglio cambiare la struttura del progetto più del necessario.

## Skill Used

planner

## Output

Goal: aggiungere esempi pratici mantenendo la struttura esistente.

Scope:

- Creare `examples/` se non esiste.
- Aggiungere un file esempio per ogni skill.
- Evitare modifiche non richieste a configurazione, skill operative o cartelle utente.

Assumptions:

- Gli esempi devono essere documentazione del portfolio.
- Non servono script o dipendenze.

Risks:

- Scrivere esempi troppo generici.
- Duplicare contenuto già presente nei `SKILL.md`.
- Modificare file non necessari.

Plan:

1. Controllare se `examples/` esiste.
2. Creare i sette file richiesti.
3. Usare la stessa struttura in ogni file.
4. Verificare che i file siano presenti e leggibili.
5. Riportare cosa e' stato aggiunto.

Verification:

- Eseguire un controllo dei file creati con `Get-ChildItem examples`.
- Leggere almeno un esempio per confermare la struttura.

Stop conditions:

- Fermarsi se esistono gia' esempi con contenuto diverso da preservare.
- Non modificare installazioni globali Codex o Claude.

## Why This Matters

Questo output è migliore di una risposta generica perché definisce scope, rischi, verifiche e stop condition prima di agire, riducendo modifiche accidentali.
