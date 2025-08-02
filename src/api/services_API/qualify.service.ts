import { apiClient } from '@apiUtils/apiClient';
import { apiEnvConfig } from '@apiConfig/envConfig';

export async function qualifyLead(payload: any) {
  const response = await apiClient.post(`/api/lead/qualify?key=${encodeURIComponent(apiEnvConfig.apiKey)}`,payload,{
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Exchange-Format': 'core',
      },
      baseURL: apiEnvConfig.baseUrl,
    }
  );
  return response;
}