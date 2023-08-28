import axios, { AxiosResponse } from 'axios';
import { IAnimal } from '../../models/IAnimal';

//* Animals data endpoint
const API_URL = 'https://animals.azurewebsites.net/api/animals';

//* Fetch animals data
export async function apiCall(): Promise<IAnimal[]> {
	const response: AxiosResponse<IAnimal[]> = await axios.get(API_URL);
	return response.data;
}
