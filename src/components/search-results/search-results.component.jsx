import React from "react";
import "./search-results.style.css";

export const SearchResults = ({ searchResults }) => (
	<div className="results">
		{searchResults.map((card, i) => (
			<div key={i} className="result-card" id={card.id}>
				{card.text}
			</div>
		))}
	</div>
);