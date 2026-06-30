---
tags:
  - Debrief
  - Dev
created: 2026-06-23
updated: 2026-06-23
issue_source: "github"
issue_ref: "aceleradora-TW/e-acelera-back#98"
issue_url: "https://github.com/aceleradora-TW/e-acelera-back/issues/98"
purpose: debriefing compartilhado para ações corretivas e melhorias
---

# [MVP3] fix: Visualização de exercício por ID

**PR:** [#99](https://github.com/aceleradora-TW/e-acelera-back/pull/99) — *merged* 2026-06-22 17:05 UTC  
**Branch:** `98-visualizacao-exercicio-id` → `main`  
**Autor PR:** Jamile Santana da Silva (`Jhamyllie`)  
**Issue #98:** *closed* com o merge do PR #99.

**Metadados GitHub:** assignees Jhamyllie, Peu-Wan, Lorenzo-Brizolla; sem labels; 0 comentários na issue; critérios: GET by ID, front exibe dados completos sem campos vazios.

## Resumo do que foi feito

Exposição da rota **GET `/exercises/:id`** no router Express — o controller e service (`ExerciseController.getExerciseById`, `ExerciseService.getExerciseById`) já existiam; faltava registrar o endpoint:

- `src/routes/index.ts` — +4 linhas: `router.get('/exercises/:id', …)` antes das rotas Stackby.

Entrega mínima e alinhada ao card. Desbloqueia o BFF do front (`getExerciseById`) mergeado no PR #336 (issue #302). Merge do back **5 dias depois** do merge do front — período em que o detalhe de exercício em produção poderia falhar sem deploy sincronizado.

## Commits (PR #99)

| SHA (curto) | **Data (autor)** | Branch | Mensagem |
|-------------|------------------|--------|----------|
| `0686280` | **2026-06-08** | `98-visualizacao-exercicio-id` | fix: adiciona rota para buscar exercicio por id |

**Nota autor vs committer:** datas coincidem — sem rebase tardio.

**Tamanho (gh):** +4 / −0; 1 ficheiro; review: **jauregao** *approved* 2026-06-16.

**Timeline:** issue criada 2026-06-08; commit no mesmo dia; PR aberto 2026-06-09; aprovação 2026-06-16; merge 2026-06-22 (~14 dias com PR aberto, ~6 dias após aprovação).

## Diagnóstico de duração

- **Implementação imediata:** código no mesmo dia da abertura da issue — pickup zero no back.
- **Review wait:** aprovação em ~7 dias após abertura do PR; merge só ~6 dias depois da aprovação — fila de merge ou dependência de deploy?
- **Desalinhamento front/back:** front #302 merged 17/06; back merged 22/06 — horizontal slicing entre repos; detalhe de exercício depende de ambos em `main`.
- **PR enxuto:** mudança trivial mas crítica — candidato a cherry-pick rápido ou merge prioritário quando front já consumindo a rota.
- **Issue sem discussão:** zero comentários; não documenta que controller já existia (só faltava rota).

**Sinais moderados** de fila de merge e coordenação cross-repo; implementação em si trivial.

## Pendências

- Confirmar deploy de `main` do back em produção após merge 22/06.
- Documentar no card ou README que GET by ID já tinha service — evitar retrabalho em futuros cards.
- Teste de integração ou e2e GET `/exercises/:id` (auth, 404, payload com `topic`) — não evidenciado no PR.
- Alinhar convenção de commit do back (`fix(exercise): … - @handle`) — mensagem do commit sem escopo no hook pattern.

## Perguntas úteis para reunião

1. **Avanço:** ter controller/service prontos permitiu PR de 4 linhas — o que antecipou essa implementação (CRUD #63)? Vale replicar “rota por último” em outros recursos?
2. **Atrito:** por que merge do back 5 dias após o front — fila de review, Vercel, ou espera de outro PR? Como evitar detalhe CMS quebrado em homologação?
3. **Review:** intervalo aprovação (16/06) → merge (22/06) — bloqueio conhecido ou batch de merges?
4. **Coding agent:** agente poderia ter detectado “rota ausente” ao implementar #302 no front (grep de routes vs client API)? Onde teria ajudado — checklist cross-repo front+back ou script que valida rotas referenciadas no BFF?
