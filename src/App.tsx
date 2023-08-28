import React from 'react';
import './App.scss';
import { Outlet } from 'react-router-dom';
import { Nav } from './components/Nav/Nav';

const App = () => {
	return (
		<>
			<header className='header'>
				<Nav />
			</header>
			<main className='App'>
				<Outlet></Outlet>
			</main>
			<footer></footer>
		</>
	);
};

export default App;
