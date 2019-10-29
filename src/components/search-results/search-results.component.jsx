import React from "react";
import "./search-results.style.css";

export const SearchResults = ({ searchResults, columns }) => (
	<div className="results">
		{searchResults.length < 1
			? showNoResults()
			: showResults(searchResults, columns)}
	</div>
);

const showNoResults = () => (
	<div className="result-card">
		<span>Could not find any cards, try again.</span>
	</div>
);

const showResults = (searchResults, columns) => {
	return searchResults.map((card, i) => (
		<div key={i} className="result-card" id={card.id}>
			<span>{card.text}</span>
			<span className="search-column">
				Found in <strong>{columns[card.column_id - 1].title}</strong>
			</span>
		</div>
	));
};