import React from 'react';
import './Card.css';

const Card = ({ name, style, cardClick, flipped, correct, fasFab }) => {
	return (
		<div
			className={`card ${flipped ? 'flip' : ''} ${correct ? 'correct' : ''}`}
			onClick={cardClick}
			data-card={name}>
			<div className="back"></div>
			<i className={`front ${fasFab} fa-${style || name} fa-5x`}></i>
		</div>
	)
}

export default Card;