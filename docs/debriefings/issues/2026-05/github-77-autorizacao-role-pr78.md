---
tags:
  - Debrief
  - Dev
created: 2026-05-19
updated: 2026-05-19
issue_source: "github"
issue_ref: "aceleradora-TW/e-acelera-back#77"
issue_url: "https://github.com/aceleradora-TW/e-acelera-back/issues/77"
purpose: debriefing compartilhado para ações corretivas e melhorias
---

# [MVP3] Backend: Corrigir autorização por role nas rotas administrativas

**PR:** [#78](https://github.com/aceleradora-TW/e-acelera-back/pull/78) — *merged* 2026-05-13 (UTC)  
**Branch:** `77/corrigir-autorizacao-role-adm` → `main`  
**Autor PR:** Pedro Wantuir (`Peu-Wan`)  
**Issue #77:** **aberta** após merge; label `critical`.

**Metadados GitHub:** assignees Peu-Wan, NETONoHands; 0 comentários na issue.

## Resumo do que foi feito

Correção da autorização nas rotas administrativas para usar a **role persistida no banco**, não só claims do token:

- **`src/routes/index.ts`:** reordenação de rotas para middlewares `validateToken` e `authorizeRoleMiddleware` funcionarem em cadeia.
- **`validateTokenMiddleware.ts`:** roles dinâmicas na validação.
- **`authorizeRoleMiddleware.ts`:** autorização baseada na role do utilizador no DB.
- **`TokenService.ts`:** ajuste pontual (+1 linha).

Commits de **Geoziihdev** em 2026-04-27 removem `console.log(token)`, comentários e try/catch desnecessário (feedback de review).

## Commits (PR #78)

| SHA (curto) | **Data (autor)** | Mensagem |
|-------------|------------------|----------|
| `2ee84e8` | **2026-04-19** | Rotas protegidas! teste de erro pendente |
| `0109fc7` | **2026-04-23** | Rotas protegidas com testes feitos |
| `5834b51` | **2026-04-24** | console.logs de teste retirados |
| `ac17459` | **2026-04-27** | chore: remove console.log(token) *(Geoziihdev — feedback review)* |
| `861c035` | **2026-04-27** | chore: remove comentário desnecessário no middleware |
| `585b73d` | **2026-04-27** | refactor: remove try/catch desnecessário do authorizeRoleMiddleware |
| `bd27341` | **2026-04-27** | docs: atualiza TODO sobre role e OAUTH no validateTokenMiddleware |
| `965e8f4` | **2026-04-28** | mensagens de erro do validateToken corrigidas |

**Tamanho (gh):** +37 / −18; 4 ficheiros; 5 reviews (**jauregao:** changes requested 2026-04-27, **approved** 2026-04-29).

**Timeline crítica:** último commit funcional **2026-04-28**; merge só **2026-05-13** (~15 dias após aprovação, ~24 dias com PR aberto desde criação 2026-04-24).

## Diagnóstico de duração

- **Espera pós-aprovação:** aprovado 2026-04-29, merged 2026-05-13 — gap longo sem novos commits (fila de merge, QA, ou prioridade).
- **Card critical aberto:** label `critical` + issue não fechada sugere desalinhamento board/issue vs. código já em `main`.
- **Rework de review:** sequência de chores/refactors em 27/04 após *changes requested* (logs, try/catch, mensagens de erro).
- **Testes manuais:** corpo do PR descreve testes com token copiado de produção — possível atrito de ambiente local.

**Sinais moderados** de duração operacional (merge tardio), não de escopo inflado (+37 linhas).

## Pendências

- **Fechar a issue #77** e remover/atualizar label `critical` se o fix está validado em prod/staging.
- Checklist do PR (review, QA) desmarcada — confirmar se QA executou cenários 401/403 descritos.
- Relacionar com **#80** (matriz RBAC documental, PR #84): enforcement granular pode ser próximo passo além deste fix de role/token.
- TODO sobre OAuth/role no middleware — card de follow-up ou fechar explicitamente.

## Perguntas úteis para reunião

1. **Avanço:** o que tornou o fix claro (issue com referências de código, review da Geovana nos middlewares)?
2. **Atrito:** por que ~15 dias entre aprovação (29/04) e merge (13/05)? QA, deploy, conflito com outro card, ou fila no board?
3. **Coding agent:** houve uso de agente neste card? Que apoio teria ajudado (testes automatizados de middleware, matriz de rotas × roles, script de smoke 401/403)?
