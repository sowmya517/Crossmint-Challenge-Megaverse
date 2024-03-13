// src/api/comeths.ts
import { makeRequest } from '../utils/request';
import { delayedRequest } from '../utils/deplayedRequests';
import { API_BASE_URL, CANDIDATE_ID, COMETHS_ENDPOINT } from '../constants';

/**
 * Create a Comeths at a specified location.
 * @param row - The row position of the Comeths.
 * @param column - The column position of the Comeths.
 * @param direction - The direction of the Comeths.
 * @returns The response from the API call.
 */
export const createComeths = async (row: number, column: number, direction: string): Promise<any> => {
  const url = `${API_BASE_URL}${COMETHS_ENDPOINT}`;
  const body = { candidateId: CANDIDATE_ID, row, column, direction };
//   return makeRequest(url, 'POST', body);
  await delayedRequest(() => makeRequest(url, 'POST', body));

};

/**
 * Delete a Comeths at a specified location.
 * @param row - The row position of the Comeths.
 * @param column - The column position of the Comeths.
 * @returns The response from the API call.
 */
export const deleteComeths = async (row: number, column: number): Promise<any> => {
  const url = `${API_BASE_URL}${COMETHS_ENDPOINT}`;
  const body = { candidateId: CANDIDATE_ID, row, column };
  return makeRequest(url, 'DELETE', body);
};
