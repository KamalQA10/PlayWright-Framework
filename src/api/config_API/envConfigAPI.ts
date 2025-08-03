import dotenvFlow from 'dotenv-flow';
dotenvFlow.config({ node_env: process.env.TEST_ENV });

export const envConfigAPI = {
  baseUrl: process.env.API_BASE_URL || '',
  apiKey: process.env.API_KEY || '',
  timeout: process.env.API_TIMEOUT ? parseInt(process.env.API_TIMEOUT) : 30000,
  retries: process.env.API_RETRIES ? parseInt(process.env.API_RETRIES) : 0,
};