import { test, expect } from '@playwright/test';
import { qualifyLead } from '@apiServices/qualify.service';
import { qualifyLeadPayload } from '@apiData/qualify.data';
import { apiEnvConfig } from '../config_API/envConfig';


test('Qualify lead API test', async () => {
console.log("API Base URL:", apiEnvConfig.baseUrl);
console.log("API Key:", apiEnvConfig.apiKey);
  const response = await qualifyLead(qualifyLeadPayload);
  expect(response.status).toBe(200);
  //expect(response.data).toHaveProperty('qualified', true);
});