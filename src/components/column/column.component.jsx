import React from "react";
import { Card } from "../card/card.component.jsx";
import "./column.style.css";

export const Column = ({
	column,
	handleAddCard,
	handleRemoveCard,
	moveLeft,
	moveRight,
	colInd
}) => (
	<div className="single-column">
		<p className="title">{column.title}</p>
		{column.cards.map((card, i) => (
			<div className="card-container" key={i}>
				{colInd > 0 ? (
					<button className="left-arrow" onClick={() => moveLeft(colInd, i)} />
				) : (
					<button className="no-arrow" />
				)}
				<Card
					card={card}
					handleRemoveCard={handleRemoveCard}
					colInd={colInd}
					cardInd={i}
				/>
				{colInd < 3 ? (
					<button
						className="right-arrow"
						onClick={() => moveRight(colInd, i)}
					/>
				) : (
					<button className="no-arrow" />
				)}
			</div>
		))}
		<button className="add" id={colInd} onClick={handleAddCard}>
			Add another card
		</button>
	</div>
);