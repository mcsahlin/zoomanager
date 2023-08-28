import { useEffect, useState } from 'react';
import { Link, Route, useParams } from 'react-router-dom';
import monkey from './../../assets/img/monkey.png';
import './Nav.scss';
export const Nav = () => {
	const [isHome, setIsHome] = useState<boolean>(true);
	const [logoClass, setLogoClass] = useState<string>();
	const { params } = useParams();

	useEffect(() => {
		setIsHome(true);
	}, []);

	useEffect(() => {
		isHome ? setLogoClass('nav__logo--home') : setLogoClass('nav__logo');
	}, [isHome]);

	return (
		<nav className='nav'>
			<nav className='nav__container'>
				<ul className='nav__menu'>
					<li className='nav__menu-item'>
						<Link to='/' className='nav__link'>
							The
							<span>Zoo</span>
						</Link>
					</li>
				</ul>
			</nav>
		</nav>
	);
};
