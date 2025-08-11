import { defineConfig, devices } from '@playwright/test';
import dotenvFlow from 'dotenv-flow';
dotenvFlow.config({ node_env: process.env.TEST_ENV });

import { envConfigUI } from './src/ui/config_UI/envConfigUI';
import { envConfigAPI } from './src/api/config_API/envConfigAPI';

export default defineConfig({
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  workers: 4,
  reporter: [
    ['html', { open: 'never' }],
    ['allure-playwright', { resultsDir: './src/reporting/allure-results' }],
  ],
  projects: [
    {
      name: 'ui',
      testDir: './src/ui/tests',
      timeout: envConfigUI.timeout,
      retries: envConfigUI.retries,
      use: {
        baseURL: envConfigUI.baseUrl,
        headless: true,
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'api',
      testDir: './src/api/tests_API',
      timeout: envConfigAPI.timeout,
      retries: envConfigAPI.retries,
      use: {
        baseURL: envConfigAPI.baseUrl,
        headless: true,
      },
    },
  ],
});