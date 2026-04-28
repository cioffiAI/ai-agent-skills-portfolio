# Guardian Example

## Input

Cancella tutte le skill esistenti e ricreale da zero.

## Skill Used

guardian

## Output

Risk summary:

- L'azione e' distruttiva e potrebbe eliminare lavoro utile.
- La richiesta e' ampia e non specifica quali skill preservare.

Affected assets:

- `skills/`
- eventuali installazioni utente in `.codex/skills/` o `.claude/skills/`, se incluse nello scope.

Authorization status:

- Non c'e' autorizzazione sufficiente per cancellazione completa se non e' stato specificato quali contenuti eliminare.

Safer approach:

- Creare un backup o una nuova cartella di staging.
- Confrontare le skill esistenti con quelle desiderate.
- Aggiornare solo i file necessari.

Required checks:

- Elencare le skill esistenti.
- Confermare se ci sono modifiche locali da preservare.
- Chiedere conferma esplicita prima di eliminare.

Stop conditions:

- Fermarsi se esistono file non versionati o modifiche non comprese.
- Fermarsi se la destinazione include cartelle utente non richieste.

Decision:

- Non procedere con la cancellazione. Richiedere conferma specifica o proporre aggiornamento non distruttivo.

## Why This Matters

Questo output è migliore di una risposta generica perché protegge file e lavoro esistente, propone un'alternativa reversibile e chiarisce quando fermarsi.
