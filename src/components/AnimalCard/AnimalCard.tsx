import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IAnimal } from '../../models/IAnimal';
import { getStorage } from '../../services/storage/localStorage';
import './AnimalCard.scss';

interface IAnimalProps {
	animal: IAnimal;
}

export default function Card(props: IAnimalProps) {
	const { name, shortDescription, lastFed } = props.animal;
	const [loading, setLoading] = useState<boolean>(true);
	const [alert, setAlert] = useState<boolean>(false);
	const [currentTime] = useState<Date>(new Date());
	const [feedTime] = useState<string>(lastFed);
	const [animals, setAnimals] = useState<IAnimal[]>(getStorage());
	const imgPath = 'srcassetsimginfo.svg';
	const parseTime = () => {};

	useState(() => {
		if (!loading) return;
	});
	// const alert =

	return (
		<article className='card'>
			<div className='card__container'>
				{/* <img
						className='card__btn'
						src={info}
					/> */}

				<div className='info'>
					<Link key={props.animal.id} to={`/Animal/${props.animal.id}`}>
						<h1 className='info__name'>
							{name}
							{/* <span className='alert'>alert</span> */}
						</h1>
					</Link>
					<p className='info__short'>{shortDescription}</p>
				</div>
			</div>
		</article>
	);
}
