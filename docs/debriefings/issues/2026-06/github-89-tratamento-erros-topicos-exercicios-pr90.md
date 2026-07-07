---
tags:
  - Debrief
  - Dev
created: 2026-06-30
updated: 2026-06-30
issue_source: "github"
issue_ref: "aceleradora-TW/e-acelera-back#89"
issue_url: "https://github.com/aceleradora-TW/e-acelera-back/issues/89"
purpose: debriefing compartilhado para ações corretivas e melhorias
---

# [MVP3] fix: tratamento de erros na criação de tópicos e exercícios

**PR:** [#90](https://github.com/aceleradora-TW/e-acelera-back/pull/90) — *merged* 2026-06-25 18:08 UTC  
**Branch:** `89-mvp3-fix-tratamento-de-erros-na-criacao-de-topicos` → `main`  
**Autor PR:** Jamile Santana da Silva (`Jhamyllie`)  
**Issue #89:** *closed* com o merge do PR #90.

**Metadados GitHub:** assignees Jhamyllie, NETONoHands; sem labels; 0 comentários na issue; critérios: front consegue criar tópicos/exercícios, erros de validação com status e mensagem corretos, sem 500 indevido.

## Resumo do que foi feito

Correção do **tratamento de erros na criação de tópicos e exercícios** para desbloquear o CMS no front:

- `TopicController.ts` / `TopicService.ts` — mensagens e status em `createTopic`, tema inválido, update.
- `ExerciseController.ts` / `ExerciseService.ts` — tratamento em `createExercise` (contribuição de NETONoHands no commit `ddae812`).
- `CreateTopic.dto.ts` — whitelist, mensagens e alinhamento front/back (`d08810c`).

Trabalho distribuído em ~6 semanas na branch: primeiro commit no dia da issue (14/05), colaboração de NETONoHands (27/05), série de ajustes de mensagens e DTO (mai–jun), commit tardio de tema inválido (16/06). Gerou follow-up imediato na issue [#100](https://github.com/aceleradora-TW/e-acelera-back/issues/100) (exercício sem `topicId` ainda retornava 500).

## Commits (PR #90)

| SHA (curto) | **Data (autor)** | Branch | Mensagem |
|-------------|------------------|--------|----------|
| `4d80057` | **2026-05-14** | `89-mvp3-fix-tratamento-de-erros-…` | fix: ajusta tratamento de erros para criacao de topicos @NETONoHands refs ## 89 |
| `ddae812` | **2026-05-27** | `89-mvp3-fix-tratamento-de-erros-…` | fix: improve error handling in ExerciseController and ExerciseService |
| `964b566` | **2026-05-27** | `89-mvp3-fix-tratamento-de-erros-…` | fix: atualiza mensagem de erro das funcoes de update e delete refs #89 |
| `ac52602` | **2026-05-27** | `89-mvp3-fix-tratamento-de-erros-…` | fix: desfaz alteracoes da funcao delete |
| `f141690` | **2026-05-29** | `89-mvp3-fix-tratamento-de-erros-…` | fix: ajusta tratamento de erros na criacao e atualizacao de topicos e exercicios refs #89 |
| `c45c5a7` | **2026-06-02** | `89-mvp3-fix-tratamento-de-erros-…` | fix: atualiza mensagens de erro @Lorenzo-Brizolla refs #89 |
| `b7fa8b4` | **2026-06-02** | `89-mvp3-fix-tratamento-de-erros-…` | fix: add whitelist property |
| `d08810c` | **2026-06-03** | `89-mvp3-fix-tratamento-de-erros-…` | fix: ajusta dto para tratar inconsistencia entre frontend e backend |
| `edaec62` | **2026-06-16** | `89-mvp3-fix-tratamento-de-erros-…` | fix: adiciona tratamento de erro para tema invalido e ajusta mensagens de retorno |

**Nota autor vs committer:** datas coincidem nos commits listados.

**Tamanho (gh):** +93 / −36; 5 ficheiros no diff final; reviews: **jauregao** *changes requested* 2026-05-25 e 2026-05-27, *approved* 2026-06-05.

**Timeline:** issue criada 2026-05-14; PR aberto 2026-05-19; aprovação 2026-06-05; merge 2026-06-25 (~42 dias desde issue; ~20 dias entre aprovação e merge).

## Diagnóstico de duração

- **Branch longa:** ~42 dias issue→merge; ~37 dias com PR aberto.
- **Review wait prolongado:** aprovado 05/06, merge só 25/06 (~20 dias) — fila de merge, WIP paralelo ou espera de validação front?
- **Rework em sequência:** 9 commits `fix:` sobre controllers, services e DTO — várias iterações de mensagem e escopo (incluiu update/delete, depois reverteu delete `ac52602`).
- **Colaboração cross-dev:** NETONoHands no exercício; Lorenzo-Brizolla citado em mensagens — sinal de pair/review informal.
- **Escopo inflado vs. card:** tratamento de tema inválido e funções update/delete além do `create` — review pediu extensão ("edição de tópico") em 25/05.
- **Horizontal slicing leve:** DTO alinhado ao front (`d08810c`) — dependência de contrato cross-repo.
- **Dívida residual:** issue #100 aberta 29/06 para cenário não coberto (sem `topicId` → 500) — critérios de aceite do #89 incompletos na prática.
- **Issue sem thread:** zero comentários; vai-e-vem de review no PR, não na issue.

**Sinais fortes** de branch longa, review wait pós-aprovação e rework; entrega funcional mas gerou follow-up imediato (#100).

## Pendências

- Confirmar deploy de `main` após merge 25/06 e se front (#298, #299) passou a criar tópicos/exercícios sem 500.
- Matriz de testes manuais/automatizados por endpoint (400, 401, 403, 404, 500) — PR descreve cenários mas checklist QA desmarcada.
- Documentar convenção de mensagens de erro entre DTO (class-validator) e service/controller — evitar duplicidade e 500 genérico.
- Avaliar se escopo de update/delete deveria ter sido cards separados (review jauregao 25/05).

## Perguntas úteis para reunião

1. **Avanço:** a colaboração de NETONoHands no exercício e o alinhamento DTO↔front (`d08810c`) desbloquearam o CMS — o que replicar em cards de integração front/back?
2. **Atrito:** por que 20 dias entre aprovação (05/06) e merge (25/06)? O gap 16/06→25/06 (sem commits) indica fila ou dependência do front? Por que o cenário "sem topicId" virou #100 em vez de ser pego no QA deste card?
3. **Coding agent:** agente poderia ter listado payloads inválidos por DTO e gerado testes de integração ao abrir o PR? Onde teria ajudado — separar escopo create vs. update/delete, ou checklist de paridade com issues #298/#299 no front?
