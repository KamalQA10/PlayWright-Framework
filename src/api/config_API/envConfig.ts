import dotenv from 'dotenv';
dotenv.config();

export const apiEnvConfig = {
  baseUrl: process.env.BASE_URL || '',
  apiKey: process.env.API_KEY || '',
  timeout: process.env.API_TIMEOUT ? parseInt(process.env.API_TIMEOUT) : 30000,
  retries: process.env.API_RETRIES ? parseInt(process.env.API_RETRIES) : 0,
};