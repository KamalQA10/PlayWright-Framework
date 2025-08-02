import { test, expect } from '@playwright/test';
import { qualifyLead } from '@apiServices/qualify.service';
import { qualifyLeadPayload } from '@apiData/qualify.data';
import { apiEnvConfig } from '../config_API/envConfig';

test('Qualify lead API test', async () => {
  const response = await qualifyLead(qualifyLeadPayload);
  expect(response.status).toBe(200);
});