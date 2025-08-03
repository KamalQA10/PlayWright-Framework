import { apiClient } from '@apiUtils/apiClient';
import { envConfigAPI } from '@apiConfig/envConfigAPI';

export async function qualifyLead(payload: any) {
  const response = await apiClient.post(`/api/lead/qualify?key=${encodeURIComponent(envConfigAPI.apiKey)}`,payload,{
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Exchange-Format': 'core',
      },
      baseURL: envConfigAPI.baseUrl,
    }
  );
  return response;
}