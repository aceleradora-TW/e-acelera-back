---
tags:
  - Debrief
  - Dev
created: 2026-06-02
updated: 2026-06-02
issue_source: "github"
issue_ref: "aceleradora-TW/e-acelera-back#79"
issue_url: "https://github.com/aceleradora-TW/e-acelera-back/issues/79"
purpose: debriefing compartilhado para ações corretivas e melhorias
---

# [BUG] Endpoint POST /themes retorna 400 (Invalid data) para payload válido

**PR:** [#88](https://github.com/aceleradora-TW/e-acelera-back/pull/88) — *merged* 2026-05-29 17:59 UTC  
**Branch:** `79-corrigir-validação-de-tema` → `main`  
**Autor PR:** Lorenzo Brizolla (`Lorenzo-Brizolla`)  
**Issue #79:** **aberta** após merge; label `bug`; "Notas da Resolução" preenchidas na issue.

**PRs anteriores (fechados sem merge):** [#85](https://github.com/aceleradora-TW/e-acelera-back/pull/85), [#86](https://github.com/aceleradora-TW/e-acelera-back/pull/86), [#87](https://github.com/aceleradora-TW/e-acelera-back/pull/87) — ver debriefs em `issues/2026-05/`.

**Metadados GitHub:** assignees NETONoHands, Lorenzo-Brizolla; critérios de aceite sobre mensagens de erro e POST 200/201.

## Resumo do que foi feito

Correção da validação de temas no backend, concentrada em `ThemeController.ts`:

- Identificação da divergência **nivelamento** (front) vs **leveling** (back) como causa do 400.
- Remoção de validação duplicada no `catch` da criação de tema (já coberta por `validateOrReject` / class-validator).
- Ajustes em **Update**, **GetById** e tratamento de erro em `getThemes`.

Entrega alinhada às "Notas da Resolução" na issue #79.

## Commits (PR #88)

| SHA (curto) | **Data (autor)** | Branch | Mensagem |
|-------------|------------------|--------|----------|
| `f375914` | **2026-05-05** | `79-corrigir-validação-de-tema` | fix: correção de bugs na validação de temas |
| `d56f89a` | **2026-05-07** | `79-corrigir-validação-de-tema` | Implementado correção no Update e GetById |
| `62f5f0b` | **2026-05-07** | `79-corrigir-validação-de-tema` | fix(theme): improve error handling in getThemes method |

**Nota autor vs committer:** datas coincidem — sem rebase tardio.

**Tamanho (gh):** +126 / −122; 1 ficheiro; review: **jauregao** *approved* 2026-05-07.

**Timeline:** PR criado 2026-05-07; aprovado 2026-05-07; merge 2026-05-29 (~22 dias após aprovação, ~52 dias com branch aberta desde primeiro commit).

## Diagnóstico de duração

- **Múltiplas tentativas:** quatro PRs (#85–#88) para a mesma issue — sinal forte de rework operacional e fila de merge.
- **Espera pós-aprovação extrema:** aprovado 07/05, merge só 29/05 (~22 dias) sem novos commits.
- **Branch de vida longa:** ~24 dias desde criação do PR até merge; ~52 dias desde primeiro commit funcional.
- **PR focado:** 1 ficheiro, escopo aderente — anti-padrão "PR gigante" não se aplica ao diff funcional.
- **Issue não fechada:** código em `main` mas card permanece aberto — desalinhamento board vs. entrega.
- **Critérios parcialmente atendidos:** causa raiz (category) corrigida; mensagens de erro detalhadas por campo (critério 2–4) podem precisar validação separada.

**Sinais fortes** de duração operacional (fila de merge, tentativas repetidas); escopo técnico bem delimitado.

## Pendências

- **Fechar issue #79** e atualizar estado no Project board.
- Confirmar se critérios 2–4 (mensagens por campo, não genérico "Invalid data") estão satisfeitos ou viram follow-up.
- Alinhar valores de `category` entre front (`nivelamento`/`autoestudo`) e back (`leveling`/`selfstudy`) — possível card de contrato compartilhado.
- Checklist do PR (review, QA) desmarcada no corpo do merge.

## Perguntas úteis para reunião

1. **Avanço:** as "Notas da Resolução" na issue e o PR de commit único (#87) reduziram ruído para revisores em relação a #85/#86?
2. **Atrito:** o que manteve #88 aprovado por 22 dias sem merge? Fila no board, conflito com outro card, ou espera por validação front (#79 category)?
3. **Coding agent:** foi usado em alguma das tentativas (#85–#88)? Que apoio teria ajudado (contract test front/back para `category`, teste automatizado POST /themes)?
