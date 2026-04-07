/**
 * i18n-navigation.spec.ts
 *
 * Validates that menus and links are correct according to the page language.
 * - EN pages: URLs without prefix (/, /about/, etc.)
 * - FR pages: URLs with /fr/ prefix
 *
 * Reads translations from i18n/en.yaml and i18n/fr.yaml to automatically
 * follow label modifications.
 */

import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import yaml from 'js-yaml';

// Types for translations
interface Translations {
  [key: string]: { other: string };
}

/**
 * Loads and parses a translation YAML file.
 * Throws an error if the file is missing or malformed.
 */
function loadTranslations(lang: 'en' | 'fr'): Translations {
  const filePath = path.join(__dirname, '..', 'i18n', `${lang}.yaml`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing translation file: ${filePath}`);
  }

  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const data = yaml.load(content) as Translations;

    if (!data || typeof data !== 'object') {
      throw new Error(`Invalid YAML structure in ${filePath}`);
    }

    return data;
  } catch (error) {
    throw new Error(`Failed to parse ${filePath}: ${error}`);
  }
}

// Load translations (internal error on problem)
const translationsEN = loadTranslations('en');
const translationsFR = loadTranslations('fr');

// Pages to test
const pagesEN = [
  { url: '/', title: 'Home' },
  { url: '/about/', title: 'About' },
  { url: '/contact/', title: 'Contact' },
  { url: '/contribute/', title: 'Contribute' },
  { url: '/posts/', title: 'Posts' },
];

const pagesFR = [
  { url: '/fr/', title: 'Accueil' },
  { url: '/fr/a-propos/', title: 'À propos' },
  { url: '/fr/contact/', title: 'Contact' },
  { url: '/fr/contribuer/', title: 'Contribuer' },
  { url: '/fr/posts/', title: 'Publications' },
];

// Menus identifiers to test (except tracker and demo)
const mainMenuItems = ['home', 'about', 'posts', 'contribute', 'contact'];

// ==============================================================================
// Tests for EN pages (no language prefix)
// ==============================================================================

test.describe('English pages', () => {
  for (const page of pagesEN) {
    test(`[i18n-EN] ${page.title} - menu labels and links`, async ({ page: playwright }) => {
      await playwright.goto(page.url);

      // Check main menu labels
      const sidebar = playwright.locator('#sidebar nav#main-menu');

      for (const menuId of mainMenuItems) {
        const expectedLabel = translationsEN[`menus.${menuId}`]?.other;
        expect(expectedLabel, `Translation menus.${menuId} should exist in en.yaml`).toBeDefined();

        const menuItem = sidebar.locator(`a:has-text("${expectedLabel}")`);
        await expect(menuItem, `Menu item "${menuId}" should display "${expectedLabel}"`).toBeVisible();
      }
    });

    test(`[i18n-EN] ${page.title} - documentation links contain /en/`, async ({ page: playwright }) => {
      await playwright.goto(page.url);

      // Check documentation links - should point to https://doc.galette.eu/en/
      const docLinks = [
        { selector: 'a[href*="doc.galette.eu/en/"][href*="faq"]', name: 'FAQ' },
        { selector: 'a[href*="doc.galette.eu/en/"][href*="installation"]', name: 'Installation' },
        { selector: 'a[href*="doc.galette.eu/en/"][href*="usermanual"]', name: 'User manual' },
        { selector: 'a[href*="doc.galette.eu/en/"][href*="plugins"]', name: 'Plugins' },
      ];

      for (const link of docLinks) {
        const element = playwright.locator(link.selector).first();
        await expect(element, `${link.name} link should point to EN documentation`).toBeVisible();
        const href = await element.getAttribute('href');
        expect(href, `${link.name} link should contain doc.galette.eu/en/`).toContain('doc.galette.eu/en/');
        expect(href, `${link.name} link should not contain doc.galette.eu/fr/`).not.toContain('doc.galette.eu/fr/');
      }
    });

    test(`[i18n-EN] ${page.title} - RSS feed points to /feed.xml`, async ({ page: playwright }) => {
      await playwright.goto(page.url);

      const rssLink = playwright.locator('a.rss-subscribe[href*="feed.xml"]');
      await expect(rssLink, 'RSS feed link should be visible').toBeVisible();

      const href = await rssLink.getAttribute('href');
      expect(href, 'RSS feed should point to /feed.xml (EN root)').toMatch(/^\/feed\.xml$/);
    });

    test(`[i18n-EN] ${page.title} - language selector shows French link`, async ({ page: playwright }) => {
      await playwright.goto(page.url);

      const langSelector = playwright.locator('.langselector a');
      const expectedLabel = translationsEN['langs.label.fr']?.other;

      await expect(langSelector, `Language selector should show "${expectedLabel}"`).toContainText(expectedLabel);

      const href = await langSelector.getAttribute('href');
      expect(href, 'Language selector should point to /fr/ version').toContain('/fr/');
    });
  }
});

// ==============================================================================
// Tests for FR pages (with /fr/ prefix)
// ==============================================================================

test.describe('French pages', () => {
  for (const page of pagesFR) {
    test(`[i18n-FR] ${page.title} - menu labels and links`, async ({ page: playwright }) => {
      await playwright.goto(page.url);

      // Check main menu labels
      const sidebar = playwright.locator('#sidebar nav#main-menu');

      for (const menuId of mainMenuItems) {
        const expectedLabel = translationsFR[`menus.${menuId}`]?.other;
        expect(expectedLabel, `Translation menus.${menuId} should exist in fr.yaml`).toBeDefined();

        const menuItem = sidebar.locator(`a:has-text("${expectedLabel}")`);
        await expect(menuItem, `Menu item "${menuId}" should display "${expectedLabel}"`).toBeVisible();
      }
    });

    test(`[i18n-FR] ${page.title} - documentation links contains /fr/`, async ({ page: playwright }) => {
      await playwright.goto(page.url);

      // Check documentation links - should point to https://doc.galette.eu/fr/
      const docLinks = [
        { selector: 'a[href*="doc.galette.eu/fr/"][href*="faq"]', name: 'FAQ' },
        { selector: 'a[href*="doc.galette.eu/fr/"][href*="installation"]', name: 'Installation' },
        { selector: 'a[href*="doc.galette.eu/fr/"][href*="usermanual"]', name: 'Manuel utilisateur' },
        { selector: 'a[href*="doc.galette.eu/fr/"][href*="plugins"]', name: 'Plugins' },
      ];

      for (const link of docLinks) {
        const element = playwright.locator(link.selector).first();
        await expect(element, `${link.name} link should point to FR documentation`).toBeVisible();
        const href = await element.getAttribute('href');
        expect(href, `${link.name} link should contain doc.galette.eu/fr/`).toContain('doc.galette.eu/fr/');
        expect(href, `${link.name} link should not contain doc.galette.eu/en/`).not.toContain('doc.galette.eu/en/');
      }
    });

    test(`[i18n-FR] ${page.title} - RSS feed points to /fr/feed.xml`, async ({ page: playwright }) => {
      await playwright.goto(page.url);

      const rssLink = playwright.locator('a.rss-subscribe[href*="feed.xml"]');
      await expect(rssLink, 'RSS link must be visible').toBeVisible();

      const href = await rssLink.getAttribute('href');
      expect(href, 'RSS feed must points to /fr/feed.xml').toMatch(/^\/fr\/feed\.xml$/);
    });

    test(`[i18n-FR] ${page.title} - lang selector displays english link`, async ({ page: playwright }) => {
      await playwright.goto(page.url);

      const langSelector = playwright.locator('.langselector a');
      const expectedLabel = translationsFR['langs.label.en']?.other;

      await expect(langSelector, `Lang selector must display "${expectedLabel}"`).toContainText(expectedLabel);

      const href = await langSelector.getAttribute('href');
      expect(href, 'Lang selector must points to EN version (without /fr/)').not.toContain('/fr/');
    });
  }
});

