import axios from 'axios';
import { API_BASE_URL, CANDIDATE_ID } from '../constants';

/**
 * Get the entire map state.
 * @returns Promise<object> The response from the API call.
 */
export const getMap = async (): Promise<any> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/map`);
        return response.data;
    } catch (error) {
        console.error('Error fetching the map:', error);
        throw error;
    }
};

/**
 * Get the goal state for a specific id.
 * @param id - The unique identifier for the goal state.
 * @returns Promise<object> The response from the API call.
 */
// Note: This function no longer handles the promise itself. It must be handled by the caller.
// Assuming constants and imports are defined earlier in the file
export const getMapGoal = async (): Promise<any> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/map/${CANDIDATE_ID}/goal`);
        return response.data; // The value is returned here
    } catch (error) {
        console.error(`Error fetching the map goal for id ${CANDIDATE_ID}:`, error);
        throw error; // The error is thrown here
    }
};


