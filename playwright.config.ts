import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  /* Set global timeout */
  timeout: 10 * 60 * 1000,

  /* One test per URL → full parallelism */
  fullyParallel: true,

  /* No retry: a11y errors are deterministic */
  retries: 0,

  /* 50% CPUs on CI, auto on local */
  workers: process.env.CI ? '50%' : undefined,

  /*
   * list  → console output per line
   * html  → full HTML report uploaded as GitHub artifact
   */
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
  ],

  /*
   * Executed **once** before Playwright loads its spec files.
   */
  globalSetup: './tests/global.setup.ts',

  use: {
    baseURL: 'http://localhost:1314/',
    /* Screenshot on fail */
    screenshot: 'only-on-failure',
    /* Debug trace in HTML report */
    trace: 'retain-on-failure',
  },

  /* Configure and start Hugo */
  webServer: {
    command: 'hugo server --port 1314 --baseURL http://localhost:1314/',
    url: 'http://localhost:1314/',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});