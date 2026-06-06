# Debriefs (issues / PRs) — e-acelera-back

Debriefings pós-implementação ou pós-tentativa ficam em `docs/debriefings/`, alinhados ao skill `debrief-issue` do **aceleradora-agent-toolkit**.

## Estrutura

```
docs/debriefings/
  AGENTS.md
  issues/
    YYYY-MM/
      github-<issue#>-<slug>.md
```

Quando o objeto principal for um **PR** ligado a uma issue, o nome do ficheiro pode incluir `pr-<n>` no slug para evitar colisão (vários PRs para a mesma issue).

## Frontmatter sugerido

```yaml
---
tags:
  - Debrief
  - Dev
created: YYYY-MM-DD
updated: YYYY-MM-DD
issue_source: "github"
issue_ref: "aceleradora-TW/e-acelera-back#<n>"
issue_url: "https://github.com/aceleradora-TW/e-acelera-back/issues/<n>"
purpose: debriefing compartilhado para ações corretivas e melhorias
---
```

Opcional: linhas `pr_ref` / `pr_url` no corpo quando o debrief for ancorado num PR específico.
