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

# [BUG] Endpoint POST /themes — debrief do **PR #86** (fechado sem merge)

**PR:** [#86](https://github.com/aceleradora-TW/e-acelera-back/pull/86) — *closed* 2026-05-05  
**Branch:** `79-corrigir-validacao-de-tema` (nome de branch sem acento, distinto do #85 apenas no slug do branch remoto)  
**Autor PR:** Lorenzo Brizolla  
**Issue #79:** **aberta**; PR sem `closingIssuesReferences`.

## Resumo do que foi feito

Conteúdo alinhado ao **PR #85**: mesmo changelog no corpo (payload `nivelamento` vs `leveling`, validação duplicada no create de tema). Conjunto de commits exposto pela API é o **mesmo** que no #85 até ao `a4f0372` (“Correção do bug” com coautoria Neto).

## Commits

Ver tabela no debrief [`github-79-pr-85-validacao-tema-fechado.md`](github-79-pr-85-validacao-tema-fechado.md) — **mesmos SHAs e datas** na resposta JSON do GitHub para os dois PRs.

## Diagnóstico de duração

- **Duplicação de PR (#85 vs #86):** forte sinal de **processo** (dois links de review, possível confusão de qual mergear).
- **Fecho sem merge** em ambos no mesmo dia — provável decisão de consolidar noutro ramo/PR (#87) ou abandonar duplicados.

## Pendências

- Tratar #85/#86 como **histórico**; focar follow-up na **issue #79** e no PR que efetivamente mergear a correção.
- Documentar decisão num comentário na issue #79 (evita reabrir terceiro PR duplicado).

## Perguntas úteis para reunião

1. **Avanço:** havia valor em manter dois PRs abertos ou foi efeito colateral de rename de branch / fork?
2. **Atrito:** quanto tempo de review foi gasto em PR duplicado — dá para sinalizar duplicata automaticamente no GitHub?
3. **Coding agent:** ajudou a comparar diff entre #85 e #86 ou a gerar mensagem de fecho? Que checklist evitaria PRs gémeos?
