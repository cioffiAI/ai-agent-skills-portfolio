# Critic / QA Example

## Input

Rivedi questa proposta: "Creiamo una skill unica chiamata super-agent che fa scouting, pianificazione, implementazione, review e documentazione."

## Skill Used

critic-qa

## Output

Verdict: sconsigliato nella forma proposta.

Findings:

- High: una skill unica e' troppo ampia e rischia di attivarsi in contesti non pertinenti.
- Medium: mescola ruoli con obiettivi in conflitto, per esempio implementare e criticare lo stesso lavoro.
- Medium: rende piu' difficile verificare quale procedura sia stata usata.
- Low: duplica il concetto gia' espresso dal README, che preferisce ruoli separati e riutilizzabili.

Missing checks:

- Non e' stato definito quando la skill dovrebbe fermarsi.
- Non e' stato spiegato come evitare modifiche non richieste.

Suggested correction:

- Mantenere skill separate per `scout`, `planner`, `builder`, `critic-qa`, `librarian`, `operator` e `guardian`.
- Definire workflow che combinano le skill solo quando necessario.

Residual uncertainty:

- Una skill orchestratrice potrebbe essere utile in futuro, ma solo dopo avere esempi reali di uso ripetuto.

## Why This Matters

Questo output è migliore di una risposta generica perché non si limita a dire "buona idea" o "cattiva idea"; identifica rischi specifici, gravità e una correzione più sicura.
