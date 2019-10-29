import React, { Component } from "react";
import axios from "axios";
import { Board } from "./components/board/board.component";
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
			.then(({ data }) => {
				const columns = [];
				data.forEach(column => {
					let obj = {};
					obj.title = column.title;
					obj.cards = [];
					columns.push(obj);
				});
				return columns;
			})
			.then(columns => this.fetchCards(columns))
			.catch(err => console.log("Could not fetch columns"));
	};

	fetchCards = columns => {
		axios
			.get("/api/cards")
			.then(({ data }) => {
				data.forEach(card => {
					let cardObj = {};
					cardObj.id = card.id;
					cardObj.text = card.text;
					cardObj.showEditField = false;
					columns[card.column_id - 1].cards.push(cardObj);
				});
				this.setState({ columns });
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

	addCard = colInd => {
		const text = window.prompt("Enter text card for this card...");
		if (!text) {
			return;
		}
		axios
			.post("/api/add", { text, colInd })
			.then(() => this.fetchColumns())
			.catch(err => console.error("Could not add card, try again."));
	};

	removeCard = cardInd => {
		axios
			.delete(`/api/delete/${cardInd}`)
			.then(() => this.fetchColumns())
			.catch(err => console.error("Could not delete, try again."));
	};

	moveCard = (newColInd, cardInd) => {
		axios
			.patch("/api/move", { newColInd, cardInd })
			.then(() => this.fetchColumns())
			.catch(err => console.error("Could not move card, try again."));
	};

	editCard = (cardInd, text) => {
		axios
			.patch("/api/edit", { cardInd, text })
			.then(() => this.fetchColumns())
			.catch(err => console.error("Could not edit card, try again."));
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
					removeCard={this.removeCard}
					addCard={this.addCard}
					moveCard={this.moveCard}
					editCard={this.editCard}
				/>
			</div>
		);
	}
}
