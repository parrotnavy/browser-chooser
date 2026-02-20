# AGENTS.md

Repository guidance for coding agents working in `browser-chooser`.

## 1) Project Snapshot

- This repository is a static website for Browser Chooser.
- Stack in-repo: HTML, CSS, vanilla JavaScript, XML, Markdown.
- There is no Node/Python/Rust build system configured in this repo.
- Primary pages:
  - `index.html` (main landing page)
  - `purchase.html` (donation/purchase UI mock)
  - `dl/index.html` (download listing page)
  - `es/index.html`, `ja/index.html`, `ko/index.html` (localized landing pages)
- Shared assets:
  - `assets/css/style.css`
  - `assets/js/script.js`
- Metadata/config-like files:
  - `api/macos-appcast.xml`
  - `api/windows-appcast.xml`
  - `sitemap.xml`
  - `robots.txt`

## 2) Source of Truth / Rules Files

- Existing rule files check result:
  - `.cursorrules`: not present
  - `.cursor/rules/`: not present
  - `.github/copilot-instructions.md`: not present
- Existing AGENTS file check result:
  - `AGENTS.md`: not present before this file was added

If any of the above files are added later, update this document and treat those rules as higher priority.

## 3) Build, Lint, Test, and Validation Commands

Because there is no package/tool config (`package.json`, `Makefile`, test config, lint config), use lightweight static-site validation commands.

### Local Serve

- Start local HTTP server from repo root:
  - `python3 -m http.server 8080`
- Open pages:
  - `http://localhost:8080/`
  - `http://localhost:8080/purchase.html`
  - `http://localhost:8080/dl/`
  - `http://localhost:8080/es/`
  - `http://localhost:8080/ja/`
  - `http://localhost:8080/ko/`

### Build Command

- No formal build step exists in this repository.
- Treat "build" as static validation + manual smoke checks.

### Lint Command

- No lint runner is configured in-repo.
- Optional ad-hoc checks (only if tools are installed locally):
  - HTML syntax check: `tidy -qe index.html`
  - XML check: `xmllint --noout sitemap.xml api/macos-appcast.xml api/windows-appcast.xml`

### Test Command

- No automated test framework is configured in-repo.
- Use manual smoke tests in browser for changed surfaces.

### Single-Test Equivalent (Important)

There is no concept of a framework "single test" here. Use one targeted page check as the equivalent:

- If editing purchase interaction JS/CSS:
  - Serve locally, open `/purchase.html`, move slider, verify button text updates.
- If editing localized content:
  - Open only the changed locale page (`/es/`, `/ja/`, or `/ko/`) and verify hero/features/FAQ content renders.
- If editing download feed/listing:
  - Open `/dl/`, verify table links and metadata line.
- If editing appcast or sitemap XML:
  - Run `xmllint --noout <changed-file>`.

## 4) Pre-PR Validation Checklist

Before finishing any change, run this sequence:

1. Ensure modified pages load over local server (no file:// assumptions).
2. Verify no broken relative paths for CSS/JS/images.
3. Verify mobile layout at narrow viewport (<= 768px) for affected pages.
4. If touching XML, validate XML well-formedness.
5. If touching multilingual pages, keep structure aligned across locales.
6. Check for accidental large binary changes in `dl/` unless intended.

## 5) Code Style Guidelines (Repo-Observed)

### General

- Follow existing style in the touched file; do not mass-reformat unrelated sections.
- Prefer small, surgical edits.
- Preserve existing directory structure and relative links.
- Keep copy tone product-focused and concise.

### HTML Conventions

- Use semantic structure: `header`, `main`, `section`, `footer`.
- Use 4-space indentation in major site pages (`index.html`, locale pages, `purchase.html`).
- Keep double quotes for HTML attributes.
- Keep SEO/meta blocks grouped and readable near top of `<head>`.
- Preserve JSON-LD scripts for Organization + SoftwareApplication when editing landing pages.
- Keep accessibility-friendly structure (clear heading hierarchy, readable text).
- External links should include `target="_blank"` + `rel="noopener"` as already used.

### CSS Conventions

- Centralize design tokens in `:root` custom properties.
- Keep sectioned comments with numbered blocks, matching existing style.
- Use kebab-case class names (`hero-title`, `feature-card`, `download-cta`).
- Keep shared utility classes reusable (`.btn`, `.btn-primary`, `.btn-sm`).
- Maintain responsive behavior under `@media (max-width: 768px)`.
- Avoid introducing one-off inline styles when class-based style exists.

### JavaScript Conventions

- Vanilla JS only (no framework/runtime dependencies).
- Wrap DOM logic in `DOMContentLoaded` listener.
- Query elements once, store in `const`, and guard nullability before use.
- Use `const` by default; use template literals for dynamic UI text.
- Keep event handlers short and directly tied to UI behavior.
- Current file uses 4-space indentation, semicolons, and single-quoted strings.

### Imports / Modules

- There are currently no JS import/export modules in use.
- Do not introduce bundler-based module structure unless explicitly requested.
- If adding JS, prefer loading via `<script src="...">` with correct relative paths.

### Naming Conventions

- CSS classes: kebab-case.
- IDs used by JS: descriptive kebab-case (`price-slider`, `price-value`, `buy-button`).
- JS variables: camelCase (`priceValue`, `buyButton`).
- Filenames for locale landing pages remain `index.html` under language dirs.

### Error Handling and Logging

- Client-side JS currently uses simple guard checks rather than exception handling.
- Prefer defensive DOM guards (`if (el)`) before attaching events.
- Avoid noisy console logging in committed production copy unless necessary.

## 6) Content and Localization Rules

- English source page is `index.html`; localized variants live in `es/`, `ja/`, `ko/`.
- Keep section parity across locales (hero, features, FAQ, CTA, footer).
- When changing structure in English page, propagate structurally equivalent changes to locale pages.
- Keep canonical and OG URLs locale-appropriate when editing localized files.

## 7) XML and Release Metadata Guidelines

- `api/*-appcast.xml` files are sensitive update feeds; maintain valid XML and RSS structure.
- Preserve comments indicating release insertion behavior.
- Keep `sitemap.xml` well-formed and update `lastmod` only when applicable.
- Keep `robots.txt` aligned with sitemap location if sitemap URL changes.

## 8) Git and Change Hygiene for Agents

- Do not touch `.sisyphus/` (ignored workspace directory).
- Do not rewrite unrelated formatting across large files.
- Do not remove localized pages just because content differs.
- Do not add new tooling config files unless task explicitly asks for tooling adoption.

## 9) Safe Defaults for Future Agent Work

- For UI tweaks: edit `assets/css/style.css` first, then only minimal HTML changes.
- For purchase interaction tweaks: edit `assets/js/script.js` and verify `/purchase.html`.
- For product copy updates: patch all locale pages as needed to avoid content drift.
- For download updates: keep `dl/index.html` table rows and file links consistent.

## 10) Quick Reference Commands

- Serve site: `python3 -m http.server 8080`
- XML sanity check: `xmllint --noout sitemap.xml api/macos-appcast.xml api/windows-appcast.xml`
- Spot changed files: `git status --short`
- Inspect edits: `git diff`

If repository tooling is introduced later (for example `package.json`, ESLint, Playwright, or CI workflows), update this file immediately with canonical build/lint/test commands and true single-test invocation examples.
