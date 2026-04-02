/**
 * a11y.spec.ts
 *
 * Generate a Playwright test for each URL discovered by global.setup.ts.
 * Each test :
 *  - navigates to the URL
 *  - analyzes the page with axe-core (WCAG 2.0 + 2.1, levels A and AA)
 *  - attaches a full-page screenshot if violations are found
 *  - fails by clearly listing violations
 *
 * Tests run in parallel (fullyParallel: true in playwright.config.ts).
 */

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import type { Result as AxeResult } from 'axe-core';
import * as fs from 'fs';
import * as path from 'path';

const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'RGAAv4'];
const URLS_FILE = path.join(__dirname, 'urls.json');

// Read list from global.setup.ts
const urls: string[] = JSON.parse(fs.readFileSync(URLS_FILE, 'utf-8'));

// --- One test per URL -----------------------------------------------------------
for (const url of urls) {
  test(`[a11y] ${url}`, async ({ page }, testInfo) => {
    // 1. Navigation
    const response = await page.goto(url, { waitUntil: 'networkidle' });
    expect(
        response?.ok(),
        `Page ${url} answered with status ${response?.status()}`
    ).toBeTruthy();

    // 2. Analyze axe-core
    const results = await new AxeBuilder({ page })
        .withTags(WCAG_TAGS)
        .analyze();

    // 3. In case of violation: full-page screenshot + detailed textual report
    if (results.violations.length > 0) {
      // Capture full page
      const screenshot = await page.screenshot({ fullPage: true });
      await testInfo.attach('screenshot', {
        body: screenshot,
        contentType: 'image/png',
      });

      // Structured report attached to test (viewable in HTML report)
      const report = formatViolations(url, results.violations);
      await testInfo.attach('violations-report.txt', {
        body: Buffer.from(report, 'utf-8'),
        contentType: 'text/plain',
      });

      // Failure message readable in console output
      const summary = results.violations
          .map(v => `  • [${v.impact?.toUpperCase()}] ${v.id} — ${v.description}\n    ${v.helpUrl}`)
          .join('\n');

      expect.soft(results.violations, `\n${results.violations.length} violation(s) sur ${url}:\n${summary}\n`).toHaveLength(0);
    }
  });
}

// ------------------------------------------------------------------------------

/**
 * Format axe-core violations in lisible text.
 */
function formatViolations(url: string, violations: AxeResult[]): string {
  const lines: string[] = [
    `URL: ${url}`,
    `Date: ${new Date().toISOString()}`,
    `Violations trouvées: ${violations.length}`,
    '─'.repeat(72),
  ];

  for (const v of violations) {
    lines.push(
        ``,
        `[${v.impact?.toUpperCase()}] ${v.id}`,
        `Description : ${v.description}`,
        `Aide        : ${v.helpUrl}`,
        `Éléments affectés (${v.nodes.length}) :`,
    );
    for (const node of v.nodes) {
      lines.push(`  · HTML    : ${node.html}`);
      if (node.failureSummary) {
        lines.push(`    Résumé  : ${node.failureSummary}`);
      }
    }
    lines.push('─'.repeat(72));
  }

  return lines.join('\n');
}