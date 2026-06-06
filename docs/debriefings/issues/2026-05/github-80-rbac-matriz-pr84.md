---
tags:
  - Debrief
  - Dev
created: 2026-05-12
updated: 2026-05-12
issue_source: "github"
issue_ref: "aceleradora-TW/e-acelera-back#80"
issue_url: "https://github.com/aceleradora-TW/e-acelera-back/issues/80"
purpose: debriefing compartilhado para ações corretivas e melhorias
---

# [MVP3] Backend: Definir matriz RBAC por ação e recurso do CMS (VIEWER, EDITOR, ADMIN)

**PR:** [#84](https://github.com/aceleradora-TW/e-acelera-back/pull/84) — *merged* 2026-05-12 (UTC)  
**Branch:** `docs/rbac-matrix-definition` → `main`  
**Autor PR:** Geovana Santos (`Geoziihdev`)  
**Issue #80:** *closed* com o merge do PR #84 (alinhado ao `closedAt` da issue).

**Metadados GitHub (repo da issue):** assignee Geovana; sem labels na issue; critérios de aceite em documentação/matriz, não em código de policy neste card.

## Resumo do que foi feito

Entrega **documental**: matriz RBAC (roles VIEWER / EDITOR / ADMIN × recursos CMS × ações) com **deny by default**, ficheiro `docs/authorization/rbac-cms-matrix.md`, reorganização de docs em pastas temáticas (`development`, `deployment`, `authorization`), atualização do `README` com índice. Segundo commit acrescenta matriz “for users” (extensão do mesmo tema).

## Commits (PR #84)

**Nota:** *autor* e *committer* no Git são `%ai` e `%ci`; quando coincidem, uma data basta.

| SHA (curto) | **autor / committer (data)** | Mensagem |
|-------------|------------------------------|----------|
| `f2f35f4` | **2026-04-27** (autor = committer) | docs: add RBAC matrix definition for CMS and reorganize documentation structure |
| `4618b91` | **2026-05-12** (autor = committer; nome Git `Geoziihdev`) | docs: add RBAC matrix for users |

**Intervalo:** ~15 dias entre o primeiro e o segundo commit no PR — tempo compatível com revisão/ajustes documentais, sem sinal forte de branch “abandonada” (há continuidade até merge).

## Diagnóstico de duração

- **Escopo:** aderente ao card (#80): matriz explícita + documentação + deny by default; reorganização de pastas é extra razoável para navegabilidade.
- **PR / tamanho:** ~179 inserções, ~82 remoções — PR pequeno/médio, adequado a review.
- **Rework:** não há sequência de “fix/reverte” nos commits listados; segundo commit amplia matriz (possível feedback de review ou critério acrescentado).

**Sinais fortes de anti-padrão:** nenhum evidente neste PR.

## Pendências

- O card fala em matriz “reutilizável por todo backend CMS” e “sem regressão”; este PR é **definição documental**. Implementação/policy em código (se ainda não existir) pode ser **outros PRs** — confirmar no backlog se há card de “enforcement” explícito.
- Checklist do PR (reviewers, QA, deploy teste) aparece **não marcada** no texto do PR; validar processo real vs. template.

## Perguntas úteis para reunião

1. **Avanço rápido:** o que ajudou a fechar #80 com clareza (estrutura do card, revisão, pouco acoplamento a código)?
2. **Atrito:** os ~15 dias entre commits refletem fila de pessoa, espera de review, ou refinamento da matriz — o que repetir ou evitar?
3. **Coding agent:** houve uso de agente para gerar tabelas Markdown ou reorganizar pastas? Que apoio extra teria ajudado (ex.: diff de links quebrados no README, checklist de cobertura por endpoint)?
