import { subDays } from 'date-fns';
import { writeFile } from 'fs/promises';

export async function createDataFile() {
    const ITERATIONS = 5000000;
    const data: DataType[] = [];

    for (let i=0; i < ITERATIONS; i++) {
        data.push(getDataForIteration(i));
    }

    await writeFile('data.json', JSON.stringify(data));
}

export function getDataForIteration(i: number) {
    return {
        id: i,
        description: `entry # ${i}`,
        amountCents: 10000,
        date: subDays(new Date(), i)
    }
}

export interface DataType {
    id: number,
    description: string,
    amountCents: number,
    date: Date,
}

createDataFile();
