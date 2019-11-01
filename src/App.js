import React, { Component } from "react";
import axios from "axios";
import Board from "./components/board/board.component";
import { NavBar } from "./components/navbar/navbar.component";
export default class App extends Component {
	state = {
		columns: [],
		searchResults: [],
		search: ""
	};

	componentDidMount() {
		this.fetchColumns();
	}

	fetchColumns = () => {
		axios
			.get("/api/columns")
			.then(({ data }) => this.fetchCards(data))
			.catch(err => console.log("Could not fetch columns"));
	};

	fetchCards = col => {
		axios
			.get("/api/cards")
			.then(({ data }) => {
				let columns = col;
				data.forEach(card => {
					columns[card.column_id - 1].cards
						? columns[card.column_id - 1].cards.push(card)
						: (columns[card.column_id - 1].cards = [card]);
				});
				this.setState({ columns }, () => console.log(this.state));
			})
			.catch(err => console.log("Could not fetch cards"));
	};

	handleSearch = e => {
		const search = e.target.value;
		this.setState({ search });
		if (search.length > 3) {
			axios
				.get("/api/search", {
					params: { search }
				})
				.then(({ data }) => this.setState({ searchResults: data }))
				.catch(err => console.log("Could not find card, try again"));
		}
	};

	render() {
		return (
			<div className="app">
				<NavBar
					search={this.state.search}
					handleSearch={this.handleSearch}
					searchResults={this.state.searchResults}
					columns={this.state.columns}
				/>
				<Board columns={this.state.columns} fetchColumns={this.fetchColumns} />
			</div>
		);
	}
}
