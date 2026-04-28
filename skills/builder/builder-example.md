# Builder Example

## Input

Aggiungi una sezione "Verification" a un file `SKILL.md` esistente, mantenendo lo stile del progetto e senza cambiare altre sezioni.

## Skill Used

builder

## Output

Note: this is an illustrative example, not a record of an actual repository change.

Changed files:

- `skills/operator/SKILL.md`

Behavioral change:

- Aggiunta una sezione `## Verification` con istruzioni brevi per riportare comandi eseguiti, risultati e limiti.
- Nessuna modifica alla descrizione della skill, alla procedura principale o ai metadati.

Verification run:

- Letto il file modificato.
- Controllato che il frontmatter sia rimasto invariato.

Verification result:

- La nuova sezione e' presente.
- La struttura del file resta coerente con le altre skill.

Remaining limitations:

- Non e' stata eseguita una validazione automatica se il validatore non era disponibile.

## Why This Matters

Questo output è migliore di una risposta generica perché dice esattamente cosa è cambiato, cosa non è stato toccato e come la modifica è stata verificata.
