import dotenvFlow from 'dotenv-flow';
dotenvFlow.config({ node_env: process.env.TEST_ENV });

export const envConfigUI = {
  baseUrl: process.env.UI_BASE_URL || '',
  timeout: 900000,
  retries: 0,
};
