import React, { useState, useEffect } from 'react';
import './App.css';
import Card from './components/card/Card';
import Container from './components/container/Container';
import { mockedCards } from './components/card/mock';

let cardOne, cardTwo;

const App = () => {

	const [cards, setCards] = useState([]);
	const [pause, setPause] = useState(false);

	const cardClick = card => {
		const { id, flipped } = card;

		if (pause) return;

		if (!flipped && !cardOne) {
			cardOne = card
			setFlippedCard(id, true);
		} else {
			cardTwo = card;
			setFlippedCard(id, true);
			matchCheck();
		}
	};

	const matchCheck = () => {
		if (cardOne.name === cardTwo.name) {
			setTimeout(() => {
				setCards(cards.map(card => {
					if (cardOne.id === card.id) return {...cardOne, correct: true}
					if (cardTwo.id === card.id) return {...cardTwo, correct: true}
					return card;
				}))
				resetTurns();
			}, 800);
		} else {
			setPause(true);

			setTimeout(() => {
				setCards(cards.map(card => {
					if (cardOne.id === card.id) return {...cardOne, flipped: false}
					if (cardTwo.id === card.id) return {...cardTwo, flipped: false}
						return card;
				}))

				resetTurns();
			}, 1500);
		}
	};

	const setFlippedCard = (id, flipped) => {
		setCards(cards.map(card => {
			if (card.id !== id) return card;
			return { ...card, flipped }
		}))
	};

	const resetTurns = () => {
		[cardOne, cardTwo] = [null, null];
		setPause(false);
	};

	useEffect(() => {
		shuffleCards()
	}, []);

	const shuffleCards = () => {
		const cards = mockedCards.sort(() => Math.random() - 0.5);
		setCards(cards)
	};

	return (
		<Container>
			{cards.map(card => 
				<Card
					key={card.id}
					name={card.name}
					style={card.style}
					flipped={card.flipped}
					correct={card.correct}
					fasFab={card.fasFab}
					cardClick={() => cardClick(card)}
				 />
				)}
		</Container>
		)
};

export default App;
