import axios, { AxiosResponse } from 'axios';
import { IAnimal } from '../models/IAnimal';

// Assign API URL to constant
const API_URL = 'https://animals.azurewebsites.net/api/animals';

export async function apiCall(): Promise<IAnimal[]> {
	const response: AxiosResponse<IAnimal[]> = await axios.get(API_URL);
	return response.data;
}

export function setLStorage(list: IAnimal[]) {
	localStorage.setItem('animals', JSON.stringify(list));
}

export function getLStorage(): IAnimal[] {
	return JSON.parse(localStorage.getItem('animals' as string) || '');
}
