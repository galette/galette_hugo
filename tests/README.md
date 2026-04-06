# Playwright Tests for Galette Website

This directory contains automated tests for the Galette website.

## Test Types

### Accessibility Tests (`a11y.spec.ts`)
Checks compliance with WCAG 2.0/2.1 (levels A and AA) for all pages of the site.

### Internationalization Tests (`i18n-navigation.spec.ts`)
Validates that menus and links are correct according to the current page language:
- **EN Pages**: URLs without language prefix (`/`, `/about/`, etc.)
- **FR Pages**: URLs with `/fr/` prefix

For each language, the tests verify:
- Menu entry labels are correctly translated
- Documentation links contain the correct language code (`/en/` or `/fr/`)
- The RSS feed points to the correct URL (`/feed.xml` or `/fr/feed.xml`)
- The language selector displays the link to the other version

Translations are dynamically read from `i18n/en.yaml` and `i18n/fr.yaml`.

## Running the Tests

### Run All Tests
```bash
npm run test:a11y
```

### Run Accessibility Tests Only
```bash
npx playwright test a11y.spec.ts
```

### Run i18n Tests Only
```bash
npm run test:i18n
```

### List Tests Without Executing
```bash
npx playwright test --list
```

### View HTML Report
```bash
npx playwright show-report
```

## Prerequisites

The tests automatically start the Hugo server (configured in `playwright.config.ts`).

If Playwright browsers are not installed:
```bash
npx playwright install
```

