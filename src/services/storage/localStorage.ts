import { IAnimal } from '../../models/IAnimal';

//* Set localStorage
export function setStorage(list: IAnimal[]) {
	localStorage.setItem('animals', JSON.stringify(list));
}
//* Get localStorage
export function getStorage(): IAnimal[] {
	return JSON.parse(localStorage.getItem('animals' as string) || '');
}
