# Browser Chooser Website

The official landing page for [Browser Chooser](https://parrotnavy.github.io/browser-chooser/) — a smart URL router that puts you in control of which browser opens your links.

## Deployment

This site is deployed to GitHub Pages via GitHub Actions. The workflow injects the Microsoft Clarity project ID from a repository secret at deploy time.

### Setup (one-time)

1. **Switch GitHub Pages source to GitHub Actions**
   - Go to repository **Settings → Pages**
   - Under "Build and deployment", set **Source** to **GitHub Actions** (not "Deploy from branch")

2. **Add the Clarity secret**
   - Go to repository **Settings → Secrets and variables → Actions**
   - Click **New repository secret**
   - Name: `CLARITY_PROJECT_ID`
   - Value: your Microsoft Clarity project ID (found in your Clarity dashboard)

### How it works

The `.github/workflows/deploy-pages.yml` workflow:
- Triggers on every push to `main` (and can be run manually)
- Replaces the `__CLARITY_PROJECT_ID__` placeholder in all HTML pages with the secret value
- Validates that no placeholder remains before deploying
- Fails fast with a clear error if the secret is not set