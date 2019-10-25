import React from "react";
import "../card/card.style.css";

export const Card = ({ card, handleRemoveCard, colInd, cardInd }) => (
	<div className="card">
		<span>{card}</span>
		<span
			className="delete-card"
			onClick={() => handleRemoveCard(colInd, cardInd)}
		/>
	</div>
);
