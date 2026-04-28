# Code Review with Critic / QA

## Problem

Una modifica sembrava completa perché i file erano stati creati e la documentazione aggiornata, ma mancava una revisione esplicita per controllare coerenza, verifiche, file non tracciati e claim non dimostrati.

Il rischio principale era confondere "file presenti" con "workflow pronto": senza una review, il portfolio poteva contenere sezioni obsolete, roadmap non allineata o esempi non collegati alle skill reali.

## Initial Input

```text
Controlla se il lavoro fatto sulle skill e sulla documentazione e' davvero coerente prima di considerarlo finito.
```

## Agent Roles Used

- Scout
- Critic / QA
- Librarian

## Workflow

1. Scout identifica i file modificati e la struttura effettiva del repository.
2. Critic / QA confronta output dichiarato, file presenti e README.
3. Critic / QA segnala incongruenze, mancanze e verifiche non eseguite.
4. Librarian aggiorna la documentazione minima necessaria.

## Output

Review finale prodotta:

1. Confermare che le sette skill core esistono in `skills/`.
2. Verificare che ogni skill abbia `SKILL.md` e metadati `agents/openai.yaml`.
3. Controllare che la documentazione setup distingua:
   - skill globali;
   - skill project-level;
   - sorgenti portfolio.
4. Controllare che il README non descriva come pianificati file gia' esistenti.
5. Evidenziare eventuali parti mancanti:
   - case study incompleti;
   - esempi non indicizzati;
   - workflow pubblici ancora da mostrare.
6. Eseguire `scripts/validate_skills.py` per verificare la struttura minima delle skill.
7. Separare cio' che e' verificato da cio' che resta solo ragionamento.

## Verification

E' stato controllato:

- che `skills/` contenga le sette skill core;
- che `scripts/validate_skills.py` validi tutte le skill;
- che `docs/` contenga setup Codex, setup Claude Code e principi workflow;
- che `case-studies/` contenga case study con sezioni standard;
- che il README rifletta la struttura corrente invece di una struttura solo pianificata.

## Limitations

Non e' stato verificato:

- se i prompt di invocazione coprono tutti i casi d'uso futuri;
- se un nuovo agente carica automaticamente le skill in ogni ambiente;
- se la documentazione e' sufficiente per utenti non tecnici;
- se servono test automatici anche per docs e case study.

## Lessons Learned

Una review utile non deve limitarsi a correggere testo. Deve confrontare intenzione, file reali, verifiche e stato del repository.

Il pattern riutilizzabile e':

```text
claimed completion -> inspect artifacts -> review gaps -> verify checks -> document corrections
```

Questo case study mostra il ruolo di `critic-qa`: impedire che una risposta convincente venga trattata come completamento senza evidenza.
