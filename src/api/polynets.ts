// src/api/polynets.ts
import { makeRequest } from '../utils/request';
import { delayedRequest } from '../utils/deplayedRequests';
import { API_BASE_URL, CANDIDATE_ID, POLYANETS_ENDPOINT } from '../constants';

/**
 * Create a POLYanet at a specified location.
 * @param row - The row position of the POLYanet.
 * @param column - The column position of the POLYanet.
 * @returns The response from the API call.
 */
export const createPOLYanet = async (row: number, column: number): Promise<any> => {
  const url = `${API_BASE_URL}${POLYANETS_ENDPOINT}`;
  const body = { candidateId: CANDIDATE_ID, row, column };
//   return makeRequest(url, 'POST', body);
  await delayedRequest(() => makeRequest(url, 'POST', body));

};

/**
 * Delete a POLYanet at a specified location.
 * @param row - The row position of the POLYanet.
 * @param column - The column position of the POLYanet.
 * @returns The response from the API call.
 */
export const deletePOLYanet = async (row: number, column: number): Promise<any> => {
  const url = `${API_BASE_URL}${POLYANETS_ENDPOINT}`;
  const body = { candidateId: CANDIDATE_ID, row, column };
//   return makeRequest(url, 'DELETE', body);
  await delayedRequest(() => makeRequest(url, 'DELETE', body));
};
