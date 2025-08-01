import { defineConfig, devices } from '@playwright/test';
import { UIEnvConfig } from './src/ui/config_UI';
import { apiEnvConfig } from './src/api/config_API/envConfig';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  testDir: './src/ui/tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  workers: 4,
  timeout: UIEnvConfig.timeout,
  retries: UIEnvConfig.retries,
  reporter: [
    ['html', { open: 'never' }],
    ['allure-playwright', { resultsDir: './src/reporting/allure-results' }],
  ],
  projects: [
    {
      name: process.env.TEST_ENV || 'int',
      use: {
        baseURL: UIEnvConfig.baseURL,
        headless: true,
        ...devices['Desktop Chrome'],
      },
    },
  {
      name: 'api',
      testDir: './src/api/tests_API',
      timeout: apiEnvConfig.timeout,
      retries: apiEnvConfig.retries,
      use: {
        baseURL: apiEnvConfig.baseUrl,
        headless: true,
      },
    },
  ],
});
