import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  workers: 4,
  timeout: 60000,
  retries: process.env.CI ? 2 : 0,
reporter: [
  ['html', { open: 'never' }], // optional: avoid auto-open
  ['allure-playwright', { resultsDir: './src/reporting/allure-results' }],
],

projects: [
  {
    name: 'qa',
    metadata: { env: 'qa' },
    use: {
      baseURL: 'https://qa-customerportal.lendingpoint.com/apply/',
      ...devices['Desktop Chrome'],
    },
  },
  {
    name: 'int',
    metadata: { env: 'int' },
    use: {
      baseURL: 'https://int-customerportal.lendingpoint.com/apply/',
      ...devices['Desktop Chrome'],
    },
  },
]
});