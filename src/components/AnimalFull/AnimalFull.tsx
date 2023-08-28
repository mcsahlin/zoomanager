import React from 'react';
import { useState, useEffect } from 'react';
import { IAnimal } from '../../models/IAnimal';
import './AnimalFull.scss';
import '../../scss/_reset.scss';
import { getStorage, setStorage } from '../../services/storage/localStorage';

interface ISelectedAnimal {
	list: IAnimal[];
	selected: IAnimal;
}

export const AnimalFull = (props: ISelectedAnimal) => {
	const [animals, setAnimals] = useState<IAnimal[]>(getStorage());
	const [animal] = useState<IAnimal>(animals[props.selected.id - 1]);
	const {
		imageUrl,
		isFed,
		lastFed,
		longDescription,
		medicine,
		name,
		yearOfBirth,
		latinName,
		shortDescription,
	} = animal;
	const [loading, setLoading] = useState<boolean>(true); // Loading
	const [imgSrc, setImgSrc] = useState<string>(imageUrl); // Image source for error handling
	const [fed, setFed] = useState<boolean>(isFed); // Hunger status
	const [timeFed, setTimeFed] = useState<string>(lastFed);
	const [feedTimeString, setFeedTimeString] = useState<string>();
	const [alert, setAlert] = useState<boolean>(fed && false);
	const [btnDisabled, setBtnDisabled] = useState<boolean>(false);
	const [btnText, setBtnText] = useState<string>(
		btnDisabled ? 'Matad' : 'Mata Djur'
	);
	const [btnClass, setBtnClass] = useState<string>(
		btnDisabled ? 'feedAnimal feedAnimal--disabled' : 'feedAnimal'
	);
	const [refresh, setRefresh] = useState<boolean>(false);
	const [update, setUpdate] = useState<boolean>(false);
	const [countdown, setCountdown] = useState<string>('');

	useEffect(() => {
		const lastFeed = new Date(lastFed).getTime();
		const fourHourMark = lastFeed + 4 * 60 * 60 * 1000;
		const threeHourMark = lastFeed + 3 * 60 * 60 * 1000;
		const t = setInterval(() => {
			const currTime = new Date().getTime();
			const distance = fourHourMark - currTime;
			const alert = threeHourMark - currTime;
			if (alert < 0) {
				setAlert(true);
			}
			if (distance < 0) {
				setCountdown('Hungry!');
				clearInterval(t);
			} else {
				const hours = Math.floor(distance / (1000 * 60 * 60));
				const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
				const seconds = Math.floor((distance % (1000 * 60)) / 1000);
				setCountdown(`${hours}h ${minutes}m ${seconds}s`);
			}
		}, 1000);
		return () => clearInterval(t);
	}, [lastFed]);

	const handleImgError = () => {
		setImgSrc('https://cdn.siasat.com/wp-content/uploads/2019/10/Missing.jpg');
	};

	const dateFormat = (lastFed: string): string => {
		const newTime = new Date(lastFed);
		const time = newTime.toLocaleTimeString([], {
			hour: '2-digit',
			minute: '2-digit',
		});
		const date = newTime.toLocaleDateString([], {
			day: '2-digit',
			month: '2-digit',
			year: '2-digit',
		});
		const timeString: string = `${time} - ${date}`;
		return timeString;
	};
	const updateBtn = () => {
		setBtnDisabled(true);
		setBtnClass('feedAnimal feedAnimal--disabled');
		setBtnText('Matad');
	};
	// Feed button
	const handleClick = (e: React.MouseEvent) => {
		e.preventDefault();
		updateBtn();
		const newTime = new Date();
		const updateAnimal = () => {
			const timeIso = newTime.toISOString();
			const index = animals.findIndex((ani) => ani === animal) as number;
			const copy = { ...animals[index] };
			copy.lastFed = timeIso;
			copy.isFed = true;
			animals[index] = copy;
			setStorage(animals);
			setAnimals(getStorage());
		};
		updateAnimal();
		const updateFeedTimeHtml = () => {
			const time = newTime.toLocaleTimeString([], {
				hour: '2-digit',
				minute: '2-digit',
			});
			const date = newTime.toLocaleDateString([], {
				day: '2-digit',
				month: '2-digit',
				year: '2-digit',
			});
			setFeedTimeString(`${time} - ${date}`);
		};
		updateFeedTimeHtml();
		setRefresh(!refresh);
		setUpdate(true);
	};

	useEffect(() => {
		setFed(true);
		setTimeFed(new Date().toISOString().toString());
		// setTimePassed(0);
		setAlert(false);
		const updateStorage = () => {
			const temp = [...animals];
			const index = temp.findIndex((animal) => props.selected.id === animal.id);
			temp[index].lastFed = timeFed;
			temp[index].isFed = fed;
			setStorage(temp);
			setLoading(true);
		};
		updateStorage();
		return setUpdate(false);
	}, [update]);

	useEffect(() => {
		if (loading) {
			setAnimals(getStorage());
			isFed && updateBtn();
		}
		return setLoading(false);
	}, [loading]);

	return (
		<div className='page'>
			<section className='container'>
				<div className='banner'>
					<h1 className='banner__name'>
						{name}
						{!refresh && <span className='alert'>{alert ? countdown : ''}</span>}
					</h1>
					<div className='banner__year-latin-container'>
						<em className='banner__year'>Född: {yearOfBirth}</em>
						<em className='banner__latin'>Latin: {latinName}</em>
					</div>
				</div>
				{/* <div className='split-container'> */}
				<div className='imageContainer'>
					<div className='imageContainer__imgWrapper'>
						<img
							className='imageContainer__img'
							src={imgSrc}
							onError={handleImgError}
							alt={`Bild på ${name}`}
						/>
					</div>
					<em className='imageContainer__caption'>{shortDescription}</em>
				</div>
				<div className='status'>
					<div className='status__container'>
						<span className='status__lastfed'>
							Matad:
							<span className='status__time status__time--alert'>
								{feedTimeString ? feedTimeString : dateFormat(lastFed)}
							</span>
						</span>
						<span className='status__countdown'>
							Mata senast:
							<span className='status__countdown-time'>{countdown}</span>
						</span>
						<span className='status__medical'>
							Medicin: <span className='status__medicine'>{medicine}</span>
						</span>
					</div>
					<button
						className={btnClass}
						type='button'
						onClick={(e) => handleClick(e)}
						disabled={btnDisabled}
					>
						{btnText}
					</button>
				</div>
				{/* </div> */}
				<div className='split-container'>
					<article className='info'>
						<h2 className='info__header'>Beskrivning</h2>
						<p className='info__description'>{longDescription}</p>
					</article>
				</div>
			</section>
		</div>
	);
};
