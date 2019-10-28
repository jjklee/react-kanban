import React from "react";
import "../card/card.style.css";

export const Card = ({ text, handleRemoveCard, card_id }) => (
	<div className="card">
		<span>{text}</span>
		<div className="card-tools">
			<button onClick={() => handleRemoveCard(card_id)}>delete</button>
			<button>edit</button>
		</div>
	</div>
);