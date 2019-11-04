import React, { Component } from "react";
import axios from "axios";
import Board from "./components/board/board.component";
import { NavBar } from "./components/navbar/navbar.component";
export default class App extends Component {
	state = {
		columns: [],
		searchResults: [],
		search: "",
		idCounter: null
	};

	componentDidMount() {
		this.fetchColumns();
	}

	fetchColumns = () => {
		axios
			.get("/api/columns")
			.then(({ data }) => {
				let columns = data;
				columns.forEach(column => {
					column.cards = [];
				});
				this.fetchCards(columns);
			})
			.catch(err => console.log("Could not fetch columns"));
	};

	fetchCards = col => {
		axios
			.get("/api/cards")
			.then(({ data }) => {
				let columns = col;
				for (let i = 0; i < columns.length; i++) {
					for (let j = 0; j < columns[i].card_order.length; j++) {
						columns[i].cards.push(data[columns[i].card_order[j] - 1]);
					}
				}
				this.setState({
					columns,
					idCounter: data[data.length - 1].id
				});
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
				<Board
					columns={this.state.columns}
					fetchColumns={this.fetchColumns}
					idCounter={this.state.idCounter}
				/>
			</div>
		);
	}
}
