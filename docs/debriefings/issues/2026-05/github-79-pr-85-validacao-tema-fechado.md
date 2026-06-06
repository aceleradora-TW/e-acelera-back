---
tags:
  - Debrief
  - Dev
created: 2026-05-12
updated: 2026-05-12
issue_source: "github"
issue_ref: "aceleradora-TW/e-acelera-back#79"
issue_url: "https://github.com/aceleradora-TW/e-acelera-back/issues/79"
purpose: debriefing compartilhado para ações corretivas e melhorias
---

# [BUG] Endpoint POST /themes — debrief do **PR #85** (fechado sem merge)

**PR:** [#85](https://github.com/aceleradora-TW/e-acelera-back/pull/85) — *closed* 2026-05-05  
**Branch:** `79-corrigir-validação-de-tema`  
**Autor PR:** Lorenzo Brizolla  
**Issue #79:** permanece **aberta** no GitHub; este PR **não** consta em `closingIssuesReferences` (não fechou a issue automaticamente).

## Resumo do que foi feito

Histórico do branch mistura trabalho anterior (rotas protegidas, middleware, mensagens de `validateToken`, vários autores) com commit final **“Correção do bug”** (2026-05-05, `Co-authored-by: Neto Trindade`). O corpo do PR descreve foco em **400 por divergência `nivelamento` vs `leveling`** e remoção de **validação duplicada** no fluxo de criação de tema (`ThemeController`, rotas, middlewares).

## Commits (lista relevante ao PR — datas em UTC a partir da API GitHub)

**Nota:** *autor* vs *committer* — quando iguais, uma data.

| SHA (curto) | **Data (autor)** | **Data (committer)** | Mensagem / autores |
|-------------|------------------|----------------------|---------------------|
| `2ee84e8` | 2026-04-19 | igual | Rotas protegidas! teste de erro pendente (Peu-Wan) |
| `0109fc7` | 2026-04-23 | igual | Rotas protegidas com testes feitos |
| `5834b51` | 2026-04-24 | igual | console.logs de teste retirados |
| `ac17459` | 2026-04-27 | igual | chore: remove console.log(token)… (Geovana) |
| `861c035` | 2026-04-27 | igual | chore: remove comentário desnecessário no middleware |
| `585b73d` | 2026-04-27 | igual | refactor: remove try/catch desnecessário… |
| `bd27341` | 2026-04-27 | igual | docs: atualiza TODO… validateTokenMiddleware |
| `965e8f4` | 2026-04-28 | igual | mensagens de erro do validateToken corrigidas |
| `a4f0372` | 2026-05-05 | igual | Correção do bug (Lorenzo + Co-authored-by Neto) |

**Branch longa / escopo:** vários dias entre primeiro e último commit; mistura **auth/middleware** com **bug de tema** — possível **horizontal slicing** ou acumulação de PR não rebaseado antes de abrir o PR de correção.

## Diagnóstico de duração

- **PR fechado sem merge** — custo de contexto para o time; ver PR #86 e #87 (mesmo tema).
- **Duplicação:** #85 e #86 têm corpo e commits **muito similares** (dois PRs quase redundantes) — anti-padrão de processo.
- **Issue ainda aberta** — entrega não concluída no rastreio do GitHub para #79.

## Pendências

- Confirmar se a correção desejada entrou noutro PR mergeado a `main` após o fecho destes (a issue #79 segue **OPEN** à data da consulta).
- Alinhar **contrato** `nivelamento` / `leveling` com o front (há nota na issue #79 sobre a descoberta).

## Perguntas úteis para reunião

1. **Avanço:** o `Co-authored-by` e o par Lorenzo/Neto ajudaram a desbloquear o entendimento do payload?
2. **Atrito:** por que existiram **dois** PRs (#85 e #86) com o mesmo propósito — faltou fechar duplicado cedo ou alinhar branch base?
3. **Coding agent:** foi usado para rastrear `class-validator` / `validateOrReject` ou para limpar validação duplicada? Onde faltaria apoio (teste de regressão automatizado do POST /themes)?
