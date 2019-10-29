import React from "react";
import Card from "../card/card.component.jsx";
import "./column.style.css";

export const Column = ({
	column,
	addCard,
	removeCard,
	colInd,
	moveCard,
	editCard
}) => (
	<div className="single-column">
		<p className="title">{column.title}</p>
		{column.cards.map((card, i) => (
			<div className="card-container" key={i}>
				{colInd > 1 ? (
					<button
						className="left-arrow"
						onClick={() => moveCard(colInd - 1, card.id)}
					/>
				) : (
					<button className="no-arrow" />
				)}
				<Card
					text={card.text}
					column={column}
					card_id={card.id}
					removeCard={removeCard}
					editCard={editCard}
				/>
				{colInd < 4 ? (
					<button
						className="right-arrow"
						onClick={() => moveCard(colInd + 1, card.id)}
					/>
				) : (
					<button className="no-arrow" />
				)}
			</div>
		))}
		<button className="add" id={colInd} onClick={() => addCard(colInd)}>
			Add another card
		</button>
	</div>
);