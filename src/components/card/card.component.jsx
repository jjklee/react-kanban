import React from "react";
import "../card/card.style.css";

export const Card = ({ card, handleRemoveCard, colInd, cardInd }) => (
	<div className="card">
		<span>{card}</span>
		<div className="card-tools">
			<button onClick={() => handleRemoveCard(colInd, cardInd)}>delete</button>
			<button>edit</button>
		</div>
	</div>
);