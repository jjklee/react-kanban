import React, { Component } from "react";
import axios from "axios";
import { Board } from "./components/board/board.component";
import { NavBar } from "./components/navbar/navbar.component";
export default class App extends Component {
	state = {
		columns: [],
		searchResults: []
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
					params: {
						search
					}
				})
				.then(({ data }) => this.setState({ searchResults: data }))
				.catch(err => console.log(err));
		}
	};

	handleAddCard = colInd => {
		const text = window.prompt();
		if (!text) {
			return;
		}
		axios
			.post('/api/addCard', {
				text,
				colInd
			})
			.then(() => this.fetchColumns)
			.catch(err => console.error('Could not add card, try again.'));
	};

	handleRemoveCard = cardInd => {
		axios
			.delete(`/api/delete/${cardInd}`)
			.then(() => this.fetchColumns)
			.catch(err => console.error('Could not delete, try again.'));
	};

	moveCardRight = (colInd, cardInd) => {
		let columns = [...this.state.columns];
		const card = columns[colInd].cards.splice(cardInd, 1);
		columns[colInd + 1].cards.push(card);
		this.setState({ columns });
	};

	moveCardLeft = (colInd, cardInd) => {
		let columns = [...this.state.columns];
		const card = columns[colInd].cards.splice(cardInd, 1);
		columns[colInd - 1].cards.push(card);
		this.setState({ columns });
	};

	render() {
		return (
			<div className="app">
				<NavBar
					search={this.state.search}
					handleSearch={this.handleSearch}
					searchResults={this.state.searchResults}
				/>
				<Board
					columns={this.state.columns}
					handleRemoveCard={this.handleRemoveCard}
					handleAddCard={this.handleAddCard}
				/>
			</div>
		);
	}
}
