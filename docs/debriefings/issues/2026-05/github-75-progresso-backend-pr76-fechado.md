---
tags:
  - Debrief
  - Dev
created: 2026-05-26
updated: 2026-05-26
issue_source: "github"
issue_ref: "aceleradora-TW/e-acelera-back#75"
issue_url: "https://github.com/aceleradora-TW/e-acelera-back/issues/75"
purpose: debriefing compartilhado para ações corretivas e melhorias
---

# [BUG] Correção do fluxo de autenticação e validação nas rotas de progresso (Backend)

**PR:** [#76](https://github.com/aceleradora-TW/e-acelera-back/pull/76) — *closed* 2026-05-13 (sem merge)  
**Branch:** `fix/progress-401-backend`  
**Autor PR:** Geovana Santos (`Geoziihdev`)  
**Issue #75:** **aberta**; labels `bug`, `em ajuste`; assignees NETONoHands, Lorenzo-Brizolla.

## Resumo do que foi feito

Investigação do erro 401 nas rotas de progresso, com melhorias propostas em validação e observabilidade:

- **`ProgressController`:** validação de `topicId`/`itemId` inválidos retornando **400** antes do service; refatoração de mensagens de erro.
- **`validateTokenMiddleware`:** logs diagnósticos (posteriormente removidos/simplificados em commits de refactor).
- **CORS:** tentativa de `CORS_ALLOWED_ORIGINS` por ambiente — **revertida** (`revert: restore previous CORS configuration`).
- **`docs/progress-401-investigation.md`:** documento de investigação (depois `docs/` adicionado ao `.gitignore`).
- Vários commits de limpeza pós-review (remover logs, `_error` no catch, `requestMeta` não utilizado).

## Commits (PR #76)

| SHA (curto) | **Data (autor)** | Mensagem |
|-------------|------------------|----------|
| `f66bf6d` | **2026-04-07** | fix: ajusta autenticacao e validacao das rotas de progresso no backend |
| `53a799f` | **2026-04-10** | chore: ignore generated investigation doc |
| `74fe445` | **2026-04-10** | revert: restore previous CORS configuration |
| `142f616`–`240c4ff` | **2026-04-28–29** | refactor: remove logs de investigação; simplifica ProgressController |
| `ab39e93`–`2963868` | **2026-05-04** | chore: docs/ no .gitignore; limpeza middleware |

**Tamanho (gh):** +160 / −81; 4 ficheiros; reviews: **peueueu** *changes requested* (2026-04-17), **jauregao** *changes requested* (2026-04-30).

**Timeline:** PR aberto 2026-04-07, fechado 2026-05-13 (~36 dias) **sem merge**.

## Diagnóstico de duração

- **PR fechado sem merge** com issue aberta — entrega não integrada via #76.
- **Rework em sequência:** CORS adicionado e revertido; logs adicionados e removidos — sinal de iteração pós-feedback.
- **Review bloqueante:** duas *changes requested* sem aprovação final; comentário de peueueu sobre logs e pasta `docs/`.
- **Horizontal slicing:** par com front #313 / PR #314 (fechado no mesmo dia) — fatia backend isolada.
- **Branch longa:** ~36 dias; trabalho concentrado em abril, fechamento em maio sem merge.

**Sinais fortes** de duração prolongada e entrega incompleta.

## Pendências

- Verificar se validação de params no `ProgressController` existe em `main` por outro caminho.
- Decidir destino do doc de investigação (repo vs. debriefings vs. issue comments).
- Fechar ou replanejar issue #75 com critérios mensuráveis (400 vs 401, CORS, logs em prod).
- Card front #323 referenciado na issue — confirmar relação e dependências.

## Perguntas úteis para reunião

1. **Avanço:** a validação 400 antes do service ainda é desejada — o que falta para mergear ou reimplementar?
2. **Atrito:** feedback de review (logs, `docs/`, CORS) foi endereçado antes do fechamento? Por que fechar sem merge?
3. **Coding agent:** foi usado agente na investigação 401 ou nos refactors? Apoio útil seria testes de integração auth+progress ou pair com front #313?
