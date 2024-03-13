// src/api/soloons.ts
import { makeRequest } from '../utils/request';
import { delayedRequest } from '../utils/deplayedRequests';
import { API_BASE_URL, CANDIDATE_ID, SOLOONS_ENDPOINT } from '../constants';

/**
 * Create a Soloons at a specified location.
 * @param row - The row position of the Soloons.
 * @param column - The column position of the Soloons.
 * @param color - The color of the Soloons.
 * @returns The response from the API call.
 */
export const createSoloons = async (row: number, column: number, color: string): Promise<any> => {
  const url = `${API_BASE_URL}${SOLOONS_ENDPOINT}`;
  const body = { candidateId: CANDIDATE_ID, row, column, color };
//   return makeRequest(url, 'POST', body);
  await delayedRequest(() => makeRequest(url, 'POST', body));
};

/**
 * Delete a Soloons at a specified location.
 * @param row - The row position of the Soloons.
 * @param column - The column position of the Soloons.
 * @returns The response from the API call.
 */
export const deleteSoloons = async (row: number, column: number): Promise<any> => {
  const url = `${API_BASE_URL}${SOLOONS_ENDPOINT}`;
  const body = { candidateId: CANDIDATE_ID, row, column };
  return makeRequest(url, 'DELETE', body);
};
