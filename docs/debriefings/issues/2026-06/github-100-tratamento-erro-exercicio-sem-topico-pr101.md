---
tags:
  - Debrief
  - Dev
created: 2026-06-30
updated: 2026-06-30
issue_source: "github"
issue_ref: "aceleradora-TW/e-acelera-back#100"
issue_url: "https://github.com/aceleradora-TW/e-acelera-back/issues/100"
purpose: debriefing compartilhado para ações corretivas e melhorias
---

# [MVP3] - Corrigir tratamento de erro na criação de exercício sem tópico

**PR:** [#101](https://github.com/aceleradora-TW/e-acelera-back/pull/101) — *merged* 2026-06-30 13:39 UTC  
**Branch:** `100-mvp3corrigir-tratamento-de-erro-na-criacao-de-exercicio-sem-topico` → `main`  
**Autor PR:** Jamile Santana da Silva (`Jhamyllie`)  
**Issue #100:** *closed* com o merge do PR #101.

**Metadados GitHub:** assignees Jhamyllie, Peu-Wan; sem labels; 1 comentário (Jhamyllie: mensagens de erro também adicionadas no DTO de tópicos); critérios: 400 com "Tópico obrigatório" quando `topicId` ausente, sem 500 genérico.

## Resumo do que foi feito

Correção pontual do **tratamento de erro na criação de exercício sem tópico**:

- DTO `CreateExercise.dto.ts` — validação de obrigatoriedade de `topicId` (ajuste de decorators após review).
- `ExerciseService.ts` — tratamento explícito antes de persistir.
- `ExerciseController.ts` — retorno 400 com mensagem "Tópico obrigatório".
- Escopo extra (mencionado na issue): mensagens de tratamento em `CreateTopic.dto.ts`.

Card aberto e entregue no mesmo dia útil: issue 29/06, PR mergeado 30/06. Quatro commits `fix:` na mesma branch, dois deles ajustando decorator no DTO após *changes requested* do review.

## Commits (PR #101)

| SHA (curto) | **Data (autor · committer)** | Branch | Mensagem |
|-------------|------------------------------|--------|----------|
| `1c9e625` | **autor:** 2026-06-29 · **committer:** 2026-06-29 | `100-mvp3corrigir-tratamento-de-erro-…` | fix: ajusta mensagem para topico nao enviado |
| `7c6df81` | **2026-06-30** | `100-mvp3corrigir-tratamento-de-erro-…` | fix: adiciona mensagens de tratamento no dto |
| `e031ce2` | **2026-06-30** | `100-mvp3corrigir-tratamento-de-erro-…` | fix: altera decorator no dto de exercises |
| `3164851` | **2026-06-30** | `100-mvp3corrigir-tratamento-de-erro-…` | fix: altera decorator no dto de exercises |

**Nota autor vs committer:** no commit `1c9e625` autor e committer diferem em ~1 h — rebase ou amend leve, sem gap de dias.

**Tamanho (gh):** +19 / −4; 4 ficheiros; reviews: **jauregao** *changes requested* 2026-06-30 13:23, *approved* 2026-06-30 13:31.

**Timeline:** issue criada 2026-06-29 16:25 UTC; PR aberto 2026-06-29 16:57 UTC; merge 2026-06-30 13:39 UTC (~21 h desde abertura da issue).

## Diagnóstico de duração

- **Pickup zero / entrega rápida:** issue→merge em ~21 h — card bem delimitado.
- **Rework localizado:** sequência de commits no mesmo dia ajustando decorators do DTO após review — iteração saudável, não branch longa.
- **Escopo derivado de #89:** gap residual do card anterior (exercício sem `topicId` ainda caía em 500) — sinal de critérios de aceite incompletos ou teste manual insuficiente no #89.
- **Escopo levemente inflado:** alteração em `CreateTopic.dto.ts` além do exercício — documentado no comentário da issue, mas fora do título do card.
- **PR enxuto:** 4 ficheiros, diff pequeno — bom candidato a hotfix.

**Sinais fracos** de duração prolongada; o card em si foi rápido. O sinal relevante é **dívida residual do #89** gerando follow-up imediato.

## Pendências

- Confirmar deploy de `main` em produção após merge 30/06.
- Teste automatizado: POST `/exercises` sem `topicId` → 400 "Tópico obrigatório"; tópico inexistente → mensagem de tópico inválido (inalterado).
- Checklist do PR (review duplo, QA) desmarcada.
- Avaliar se mensagens do `CreateTopic.dto.ts` deveriam ter ido em issue separada ou no #89.

## Perguntas úteis para reunião

1. **Avanço:** critérios de aceite explícitos (400 + mensagem exata) permitiram entrega em ~1 dia — replicar esse formato nos cards de validação do CMS?
2. **Atrito:** por que o cenário "sem topicId" escapou do #89? Faltou caso de teste na matriz de review ou o DTO/class-validator não cobria `undefined` vs. string vazia?
3. **Coding agent:** agente poderia ter gerado testes de contrato para POST `/exercises` (payloads inválidos) ao fechar o #89? Onde teria ajudado — diff mínimo sugerido a partir da issue, ou checklist de status HTTP por endpoint?
