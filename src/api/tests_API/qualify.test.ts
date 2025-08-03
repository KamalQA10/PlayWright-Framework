import { test, expect } from '@playwright/test';
import { qualifyLead } from '@apiServices/qualify.service';
import { qualifyLeadPayload } from '@apiData/qualify.data';
import { envConfigAPI } from '../config_API/envConfigAPI';

test('Qualify lead API test', async () => {
  const response = await qualifyLead(qualifyLeadPayload);

  const responseBody = response.data;
  console.log("Response Body:", responseBody);

  expect(response.status).toBe(200);
});