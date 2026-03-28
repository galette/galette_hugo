/**
 * global.setup.ts — globalSetup Playwright
 *
 * Executed ONCE before Playwright loads spec files.
 * This is the only way to guarantee that urls.json is available when
 * a11y.spec.ts is evaluated (the `for` loop over URLs is at top-level).
 *
 * Crawls the Hugo sitemap (including multilingual index sitemaps)
 * and writes the full list of URLs to tests/urls.json.
 */

import { FullConfig } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const OUTPUT_FILE = path.join(__dirname, 'urls.json');

function extractLocs(xml: string): string[] {
  return Array.from(xml.matchAll(/<loc>(.*?)<\/loc>/g), m => m[1]);
}

export default async function globalSetup(config: FullConfig) {
  const baseURL = config.projects[0]?.use?.baseURL ?? 'http://localhost:1313/';

  // We use fetch (Node 18+) to keep light — no need to start a browser
  console.log(`\n[setup] Fetching sitemap from ${baseURL}sitemap.xml`);

  const rootXml = await fetchText(`${baseURL}sitemap.xml`);
  let urls: string[];

  if (rootXml.includes('<sitemapindex')) {
    const subSitemapUrls = extractLocs(rootXml);
    console.log(`[setup] Sitemap index : ${subSitemapUrls.length} sous-sitemap(s) trouvé(s)`);

    urls = [];
    for (const subUrl of subSitemapUrls) {
      console.log(`[setup]   · ${subUrl}`);
      try {
        const subXml = await fetchText(subUrl);
        const subUrls = extractLocs(subXml);
        console.log(`[setup]     → ${subUrls.length} URL(s)`);
        urls.push(...subUrls);
      } catch (err) {
        console.warn(`[setup]     ⚠ Unable to retrieve ${subUrl}: ${err}`);
      }
    }
  } else {
    urls = extractLocs(rootXml);
    console.log(`[setup] Simple sitemap: ${urls.length} URL(s) found`);
  }

  if (urls.length === 0) {
    throw new Error('[setup] No URL found in sitemap — check that Hugo is running.');
  }

  const uniqueUrls = [...new Set(urls)];
  console.log(`[setup] ${uniqueUrls.length} Unique URLs to test\n`);

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(uniqueUrls, null, 2));
}

async function fetchText(url: string): Promise<string> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} pour ${url}`);
  return res.text();
}