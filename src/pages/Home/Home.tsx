import React from 'react';
import { AnimalList } from '../../components/AnimalList/AnimalList';
import './Home.scss';

export const Home = () => {
	return (
		<section className='Home'>
			<AnimalList />
		</section>
	);
};
