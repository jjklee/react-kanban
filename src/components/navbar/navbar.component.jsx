import React from "react";
import { SearchResults } from "../search-results/search-results.component";
import logo from "../../assets/favicon.ico";
import "./navbar.style.css";

export const NavBar = ({ handleSearch, searchResults, search, columns }) => (
	<div className="nav">
		<input
			className="searchbar"
			type="search"
			placeholder="Search for a card..."
			onChange={handleSearch}
		/>
		{search.length > 3 ? (
			<SearchResults searchResults={searchResults} columns={columns} />
		) : null}
		<span className="header">react-kanban</span>
		<div className="portfolio">
			<a href="https://jjklee.com">jjklee.com</a>
			<img src={logo} alt="logo" className="logo" />
		</div>
	</div>
);
