import express from 'express';
import axios from 'axios';
import { API_BASE_URL, MAP_GOAL_ENDPOINT } from './constants';
import { createPOLYanet, deletePOLYanet } from './api/polynets';
import { getMapGoal } from './api/map';
import { createComeths } from './api/comeths';
import { createSoloons } from './api/saloons';

const app = express();
const port = 3000;

app.use(express.json());

// Function to clear specific POLYanets
async function clearMap(rows: number[], columns: number[]): Promise<void> {
    for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < columns.length; j++) {
            await deletePOLYanet(rows[i], columns[j]);
        }
    }
}


async function fetchGoal(): Promise<string[][]> {
    const response = await axios.get(`${API_BASE_URL}${MAP_GOAL_ENDPOINT}`);
    return response.data; // Assuming the API returns a 2D array directly
}

async function setPhase1(goalShape: any): Promise<void> {
    for (let row = 0; row < goalShape.goal.length; row++) {
        for (let column = 0; column < goalShape.goal[0].length; column++) {
            const item = goalShape.goal[row][column];
            if (item === 'POLYANET') {
                await createPOLYanet(row, column);
            } else if (item.includes('COMETH')) {
                // Extract direction from the item value, e.g., "UP_COMETH" -> "UP"
                const direction = item.split('_')[0].toLowerCase();
                await createComeths(row, column, direction);
            } else if (item.includes('SOLOON')) {
                // Extract color from the item value, e.g., "BLUE_SOLOON" -> "BLUE"
                const color = item.split('_')[0].toLowerCase();
                await createSoloons(row, column, color);
            }
        }
    }
}

async function setPhase2(goalShape: any): Promise<void> {
    for (let row = 0; row < goalShape.goal.length; row++) {
        for (let column = 0; column < goalShape.goal[0].length; column++) {
            if (goalShape.goal[row][column] === 'POLYANET') {
                await createPOLYanet(row, column);
            }
        }
    }
}

// Single endpoint to manage Phase 1
app.post('/phase1', async (req, res) => {
    const { rows, columns } = req.body; // Expecting rows and columns to clear

    try {
        const resp = await getMapGoal();
        console.log("1 ", resp);  

        await clearMap(resp.goal?.length, resp.goal[0]?.length);

        // Fetch the goal and set up the map for Phase 1
        const goalShape = await fetchGoal();
        await setPhase1(goalShape);

        res.json({ message: 'Phase 1 completed successfully.' });
    } catch (error) {
        console.error('Error during Phase 1:', error);
        res.status(500).send('Error during Phase 1.');
    }
});

app.post('/phase2', async (req, res) => {
    const { rows, columns } = req.body; // Expecting rows and columns to clear

    try {
        const resp = await getMapGoal();
        const goalShape = await fetchGoal();
        await setPhase1(goalShape);

        res.json({ message: 'Phase 2 completed successfully.' });
    } catch (error) {
        console.error('Error during Phase 2:', error);
        res.status(500).send('Error during Phase 2.');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
