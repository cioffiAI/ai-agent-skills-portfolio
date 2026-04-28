# From Messy Request to Execution Plan

## Problem

Una richiesta iniziale era confusa, troppo ampia e potenzialmente rischiosa: l'utente voleva "sistemare tutto il progetto degli agenti" senza indicare quali file modificare, quali risultati aspettarsi o quali cambiamenti evitare.

Il rischio principale era trasformare una richiesta generica in modifiche troppo estese: riscrivere documentazione funzionante, cambiare skill gia' valide, toccare cartelle globali Codex o Claude Code, oppure introdurre struttura non necessaria.

## Initial Input

```text
Voglio rendere questo progetto piu' professionale. Sistema le skill, aggiorna la documentazione, aggiungi esempi e rendilo pronto come portfolio.
```

## Agent Roles Used

- Scout
- Planner
- Guardian
- Critic / QA

## Workflow

1. Scout raccoglie contesto.
2. Planner trasforma la richiesta in piano.
3. Guardian segnala rischi.
4. Critic / QA controlla il piano.

## Output

Piano finale prodotto:

1. Ispezionare `README.md`, `AGENTS.md`, `CLAUDE.md` e la cartella `skills/`.
2. Confermare quali parti del portfolio esistono gia' e quali mancano davvero.
3. Separare il lavoro in blocchi piccoli:
   - skill operative;
   - esempi input/output;
   - documentazione setup;
   - case study;
   - changelog e licenza, solo se richiesti.
4. Non modificare cartelle globali come `C:\Users\antonio\.codex\skills\` o `C:\Users\antonio\.claude\skills\` senza richiesta esplicita.
5. Aggiungere prima i contenuti che dimostrano il metodo del portfolio:
   - esempi pratici;
   - documentazione setup;
   - primo case study.
6. Verificare ogni blocco con controlli semplici:
   - presenza dei file;
   - sezioni richieste;
   - coerenza con la struttura descritta nel README.
7. Fermarsi prima di refactor, automazioni o nuove dipendenze non richieste.

## Verification

E' stato controllato:

- che il README definisse gia' i sette ruoli principali;
- che le skill esistenti avessero una struttura coerente;
- che mancassero esempi e case study pratici;
- che i nuovi file potessero essere aggiunti senza modificare le skill globali;
- che il piano limitasse lo scope alle cartelle del repository.

## Limitations

Non e' stato verificato:

- come Codex o Claude Code caricano effettivamente le skill in una nuova sessione;
- se gli esempi coprono tutti i casi reali futuri;
- se servono script di automazione per installare o validare le skill;
- se il portfolio dovrebbe includere screenshot, demo o link esterni.

## Lessons Learned

Una richiesta ampia diventa riutilizzabile quando viene trasformata in ruoli e passaggi verificabili.

Il pattern riutilizzabile e':

```text
messy request -> scout context -> planner scope -> guardian risk check -> critic review -> safe execution
```

Questo case study mostra che il valore del portfolio non sta solo nei prompt, ma nella capacita' di rendere il lavoro AI-assisted tracciabile, limitato e verificabile.
