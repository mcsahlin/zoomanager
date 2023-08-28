import { useState, useEffect } from 'react';
import { IAnimal } from '../../models/IAnimal';
import { apiCall } from '../../services/api/apiCall';
import { getStorage, setStorage } from '../../services/storage/localStorage';
import Card from '../../components/AnimalCard/AnimalCard';
import './AnimalList.scss';
import monkey from './../../assets/img/monkey.png';

export const AnimalList = () => {
	const [animals, setAnimals] = useState<IAnimal[]>(getStorage());
	const [initialized, setInitialized] = useState<boolean>(false);

	useEffect(() => {
		if (animals.length > 0) return;
		const setData = async () => {
			setStorage(await apiCall());
		};
		setData().then(() => {
			setInitialized(true);
		});
	}, []);

	useEffect(() => {
		setAnimals(getStorage());
	}, [initialized]);

	const html = animals.map((animal) => {
		return <Card key={animal.id} animal={animal} />;
	});

	return (
		<div className='AnimalList'>
			{/* <aside className='AnimalList__sidebar'></aside> */}
			<section className='AnimalList__cards'>
				<div className='AnimalList__shelf'>
					<img src={monkey} />
				</div>
				<div className='space'></div>
				{html}
			</section>
		</div>
	);
};
