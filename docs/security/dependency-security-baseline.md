# Software supply-chain security baseline

## Scope

This baseline governs npm and pnpm dependencies, GitHub Actions, and container builds in EPOS.

## Required controls

- Commit the pnpm lockfile and install with `pnpm install --frozen-lockfile`.
- Use the package manager and Node.js versions declared in `package.json`.
- Resolve public packages only from the npm registry configured in `.npmrc`.
- Prefer local workspace packages so private `@epos/*` packages are not substituted from a registry.
- Delay newly published dependency versions for 24 hours.
- Permit dependency build scripts only through the reviewed `allowBuilds` list.
- Pin GitHub Actions to reviewed commit SHAs and grant read-only token permissions by default.
- Run full and production dependency audits on dependency pull requests and weekly.
- Review Dependabot pull requests; never enable unattended major-version upgrades.
- Keep secrets out of source, build context, logs, and pull-request workflows.
- Run application containers as a non-root user.

## Reviewed lifecycle-script exceptions

| Package | Reason | Review requirement |
| --- | --- | --- |
| `esbuild` | Native binary installation used by the TypeScript test/tooling stack. | Re-review on major upgrade or provenance change. |
| `puppeteer` | Browser installation used by Mermaid CLI documentation rendering. | Keep out of runtime paths; re-review on major upgrade. |

No other dependency build scripts are approved.

## Audit findings — 2026-11-17

| Finding | Severity | Evidence | Risk | Recommendation/status |
| --- | --- | --- | --- | --- |
| GitHub Actions used mutable major tags | High | `ci.yml` referenced `actions/checkout@v4` and `actions/setup-node@v4`. | A compromised or moved tag could execute unreviewed code with the workflow token. | Remediated by commit-SHA pinning. |
| Workflow token permissions were implicit | Medium | No workflow-level `permissions` declaration. | Default repository settings could grant more access than required. | Remediated with `contents: read`. |
| No automated dependency audit or Dependabot configuration | Medium | No dependency-security workflow or `.github/dependabot.yml`. | Known vulnerabilities and risky updates could remain unnoticed. | Remediated with PR/weekly audits and grouped non-major updates. |
| Container ran as root and install was not frozen | High | `apps/system-api/Dockerfile` had no `USER` and used an unfrozen install. | Dependency drift and greater impact from runtime compromise. | Remediated with frozen install and the built-in `node` user. |
| Registry and release-age policy were not explicit | Medium | No `.npmrc`; no minimum release age. | Dependency confusion or rapid adoption of a compromised new release. | Remediated with npm registry/workspace controls and a 24-hour delay. |
| Approved install scripts require continuing review | Medium | `esbuild` and `puppeteer` are allowed to build. | Lifecycle scripts execute code during installation. | Accepted exceptions documented above; review every major change. |

## Validation and residual risk

The repository manifests, lockfile presence, workflows, Dockerfile, and existing `allowBuilds` configuration were inspected. The branch was created from `main`, and the lockfile was not modified.

Dependency installation, audit, lint, tests, build, and container build could not be executed in the assessment environment because outbound package/network access was unavailable. The added GitHub workflows are the authoritative execution evidence for the pull request.

The first CI audit reported 31 advisories: 2 critical, 12 high, 12 moderate, and 5 low. The production-only view reported 5 advisories: 1 critical, 1 high, and 3 moderate. Most reported paths are development tooling, including Mermaid/Puppeteer, Vitest/Vite, and ESLint. A high-severity `body-parser` advisory is present through the runtime Express dependency and must be upgraded after compatibility validation. The critical `proxy-addr` advisory applies to Express trust-proxy subnet evaluation. EPOS does not configure `trust proxy`, so that specific GHSA is recorded as a narrow, reviewed audit exception. It must be removed or re-evaluated before proxy trust is enabled. The workflow blocks other critical production findings immediately and reports high-severity full-tree findings in baseline mode so existing development-tool debt is visible without disabling all CI. Tighten the production threshold to high after the runtime advisory is remediated. A 24-hour release delay, lockfile integrity, Dependabot, and audits reduce risk but cannot guarantee a package is benign. GitHub branch protection, required reviews, secret scanning, and Dependabot alerts should be enabled in repository settings where the account plan supports them.
