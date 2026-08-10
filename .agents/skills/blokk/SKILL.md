---
name: blokk
description: Azure Container Apps (apps and jobs) deployment configuration for the Blokk platform at OBOS. Covers ca-config.yaml (apps) and caj-config.yaml (jobs) manifests plus environment-specific variable files. Activate when working with files inside a `blokk/` directory in an application repository.
---

# Blokk Deployment Configuration Skill

## Trigger

Activate this skill when ANY of the following are true:

- Working with files inside a `blokk/` or `.github/workflows/` directory of an application repository
- User mentions: blokk, container app config, container app job, ca-config, caj-config, deployment config, scaling, replicas, probes, is-job, or OTel configuration
- User asks to add, modify, or remove environment variables for a Container App or Container App Job deployment
- Files being edited are `ca-config.yaml`, `caj-config.yaml`, `dev.env`, `stg.env`, or `prod.env` inside a `blokk/` folder

Do NOT activate for infrastructure repos, or application source code outside `blokk/`.

---

## First Step: Read the Repository README

When this skill activates, **read the root `README.md`** of the repository. Blokk application repos include a README with project-specific details on:

- CI/CD workflow setup (templates under `.github/workflows/templates/`)
- How deployment is triggered (PR → dev/stg, merge → prod)
- Container App configuration guidance (targetPort, secrets, env vars, probes)
- Renovate configuration

This gives you context about the application's deployment flow before making changes.

---

## What is the `blokk/` folder?

The `blokk/` folder contains Azure Container Apps deployment configuration for applications running on the Blokk platform at OBOS. It is NOT application code — it is deployment/runtime configuration.

## Structure

```
blokk/
├── ca-config.yaml   # Base Container App configuration (shared across environments)
├── dev.env          # Environment-specific variable substitutions for dev
├── stg.env          # Environment-specific variable substitutions for staging
└── prod.env         # Environment-specific variable substitutions for production
```

## App vs Job — Choose ONE, Ignore the Other

| Signal | Type | Config file | Deploy input |
|---|---|---|---|
| Has ingress, probes, replicas | **App** | `ca-config.yaml` | `is-job: false` (default) |
| Runs to completion, no ingress, no probes | **Job** | `caj-config.yaml` | `is-job: true` |

**If the repo uses `caj-config.yaml`**: ignore all `ca-config.yaml` guidance (ingress, probes, replicas). Jobs have no ingress, no health probes, and no scale rules — they run to completion.

**If the repo uses `ca-config.yaml`**: ignore job-specific guidance (`is-job`, `caj-config.yaml`).

## Common to both apps and jobs

- **`properties.configuration.secrets`**: Azure Key Vault secret references using `keyVaultUrl` and managed identity (`APP_IDENTITY_ID`)
- **`properties.template.containers`**: Image, env vars, resources (CPU/memory)

## `ca-config.yaml` (Apps only)

The main deployment manifest. Key sections:

- **`properties.configuration.ingress`**: External/internal access, targetPort
- **`properties.template.scale`**: Min/max replicas (use `${MIN_REPLICAS}`, `${MAX_REPLICAS}`)
- **`properties.template.containers`**: Health probes

### Important rules:
- Image registry is always `blokkregistry.azurecr.io/${IMAGE_NAME}:${IMAGE_TAG}`
- Probes port MUST match `targetPort` in ingress
- Secrets reference Key Vault via identity: `${APP_IDENTITY_ID}`
- OTel is pre-configured: `OTEL_EXPORTER_OTLP_ENDPOINT`, `OTEL_EXPORTER_OTLP_HEADERS`, `OTEL_SERVICE_NAME`

## Environment files (`dev.env`, `stg.env`, `prod.env`)

Shell-style variable definitions used for substitution in `ca-config.yaml`.

### Available from GitHub Actions workflow (do NOT redefine):
- `SUBSCRIPTION_ID`
- `IMAGE_NAME`, `IMAGE_TAG`
- `APPLICATION_NAME`
- `CONTAINER_APP_KEY`
- `RESOURCE_GROUP_NAME`
- `CONTAINER_APP_ENV`, `CONTAINER_APP_NAME`
- `IDENTITY_NAME`
- `ENVIRONMENT`

### Typically defined per environment:
- `APP_KEY_VAULT_NAME` — The Key Vault name is constructed by the infrastructure using the rule: `${application_name}${substr(container_app_key, 0, max(0, 18 - length(application_name)))}${env}kv` (max 24 chars total). The `container_app_key` is truncated to fit within the 24-character Azure limit.
- `APP_IDENTITY_ID` — full resource ID for managed identity
- `OTEL_GATEWAY` — environment-specific OTel gateway URL
- `OTEL_KEY_VAULT_NAME` — Key Vault holding OTel API key
- `MIN_REPLICAS` / `MAX_REPLICAS` — scaling (dev: 0/1, prod: typically 1+/N)
- `CPU` / `MEMORY` — resource allocation

### OTel gateway URLs:
- dev: `https://blokk-otel.dev.blokk.obos.cloud`
- stg: `https://blokk-otel.stg.blokk.obos.cloud`
- prod: `https://blokk-otel.prod.blokk.obos.cloud`

## Guidelines

1. **Never remove OTel configuration** — it is required for all Blokk apps.
2. **Secrets must come from Key Vault** — never hardcode secret values.
3. **`targetPort` must be consistent** across ingress and all probes.
4. **Scaling**: dev/stg can scale to zero (`MIN_REPLICAS=0`), prod should not.
5. **Resource sizing**: Start small (0.25 CPU, 0.5Gi) and scale up as needed.
6. **Variable naming in env files**: Use UPPER_SNAKE_CASE, reference with `${VAR_NAME}` in ca-config.yaml.
7. **Full ARM spec reference**: https://learn.microsoft.com/en-us/azure/container-apps/azure-resource-manager-api-spec?tabs=yaml

---

## GitHub Actions Workflow Templates

Blokk application repos include workflow templates under `.github/workflows/templates/`. These must be copied to `.github/workflows/` and configured before CI/CD works.

### Continuous Deployment (`cd.yaml`)

Copy `.github/workflows/templates/cd.yaml` → `.github/workflows/cd.yaml`

**Placeholders to fill in:**

| Placeholder | Description |
|---|---|
| `<application name>` | The application name (must match what's used in the infra/blokk config) |
| `<container-app-key>` | The unique identifier for the container app (e.g., `app`, `api`, `worker`), as defined in the IaC configuration |

**How it works:**

1. `build-and-push` — Builds a Docker image and pushes it to `blokkregistry.azurecr.io`
2. `deploy-dev` / `deploy-stg` — Deploy on pull requests (non-draft)
3. `deploy-prod` — Deploy only on push to `main`, after stg succeeds

Both build and deploy use reusable workflows from [code-obos/github-workflows](https://github.com/code-obos/github-workflows):
- `build-push-image.yaml` — Builds Docker image, tags it with date+run number+git hash, pushes to ACR
- `deploy-container-app.yaml` — Substitutes env vars into `blokk/{env}.env` and `blokk/ca-config.yaml`, then deploys via Azure Container Apps

**Inputs provided automatically by the deploy workflow** (available as env vars during substitution):
- `SUBSCRIPTION_ID`, `IMAGE_NAME`, `IMAGE_TAG`, `APPLICATION_NAME`, `CONTAINER_APP_KEY`
- `RESOURCE_GROUP_NAME` (defaults to `{application-name}-{environment}-rg`)
- `CONTAINER_APP_ENV`, `CONTAINER_APP_NAME`, `IDENTITY_NAME`, `ENVIRONMENT`

**Optional deploy inputs:**
- `config-directory` — Path to config files (default: `./blokk`)
- `config-file` — Config filename (default: `ca-config.yaml` for apps, `caj-config.yaml` for jobs)
- `is-job` — Set `true` when deploying a Container App Job instead of a Container App

### Continuous Integration — Node.js (`ci.node.yaml`)

Copy `.github/workflows/templates/ci.node.yaml` → `.github/workflows/ci.yaml`

Runs on all branches except `main`. Steps:
1. Checkout + yamllint on `blokk/ca-config.yaml`
2. Setup pnpm + Node.js (with GitHub Packages registry)
3. `pnpm install --frozen-lockfile`
4. `pnpm run lint:ci`
5. `pnpm run test`
6. `pnpm run build`

**Adjust if needed:** npm script names (`lint:ci`, `test`, `build`) must match what's in `package.json`.

### Continuous Integration — .NET (`ci.dotnet.yaml`)

Copy `.github/workflows/templates/ci.dotnet.yaml` → `.github/workflows/ci.yaml`

Runs on all branches except `main`. Steps:
1. Checkout + yamllint on `blokk/ca-config.yaml`
2. Setup .NET (with GitHub Packages NuGet source)
3. `dotnet restore`
4. `dotnet build --no-restore`
5. `dotnet test --no-build --verbosity normal`

### When to Help with Workflows

If the user asks to set up CI/CD, configure pipelines, or get deployment working:
1. Identify which CI template matches their language (Node.js or .NET)
2. Copy both the CI and CD templates to `.github/workflows/`
3. Fill in the placeholders (`<application name>`, `<container-app-key>`)
4. Adjust CI scripts to match what's actually in their project

---

## DO NOT

- Do not modify files outside `blokk/` and `.github/workflows/` when this skill is active
- Do not create Dockerfiles (those are the developer's responsibility)
- Do not add secrets as plaintext values
- Do not change `activeRevisionsMode` without understanding revision management implications
