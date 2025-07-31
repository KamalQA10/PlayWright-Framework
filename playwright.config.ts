import { defineConfig, devices } from '@playwright/test';
import { envConfig } from './src/config';

export default defineConfig({
  testDir: './src/tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  workers: 4,
  timeout: envConfig.timeout,
  retries: envConfig.retries,
  reporter: [
    ['html', { open: 'never' }],
    ['allure-playwright', { resultsDir: './src/reporting/allure-results' }],
  ],
  projects: [
    {
      name: process.env.TEST_ENV || 'int',
      use: {
        baseURL: envConfig.baseURL,
        headless: true,
        ...devices['Desktop Chrome'],
      },
    },
  ],
});
