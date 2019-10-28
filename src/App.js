import React, { Component } from "react";
import axios from 'axios';
import { Board } from "./components/board/board.component";
import { NavBar } from "./components/navbar/navbar.component";
export default class App extends Component {
	state = {
		columns: [],
		search: "",
		searchResults: [
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
			"Quis auctor elit sed vulputate mi sit amet. Sit amet risus nullam eget felis eget."
		]
	};

	componentDidMount() {
		this.fetchColumns();
	}

	fetchColumns = () => {
		axios
			.get('/api/columns')
			.then(({data}) => {
				const columns = [];
				data.forEach(column => {
					let obj = {};
					obj.title = column.title;
					obj.cards = [];
					columns.push(obj);
				});
				return columns;
			})
			.then((columns) => this.fetchCards(columns))
			.catch(err => (console.log("Could not fetch columns")));
	}

	fetchCards = (columns) => {
		axios
			.get('/api/cards')
			.then(({data}) => {
				data.forEach(card => {
					columns[card.column_id - 1].cards.push(card.text);
				})
				this.setState({ columns })
			})
			.catch(err => (console.log(err)));
	}

	handleSearch = e => {
		console.log(this.state.columns[0].cards)
		const search = e.target.value;
		this.setState({ search })
		if (e.target.value.length > 3) {
			// this.setState({ searchResults })
		}
	};

	handleAddCard = ({ target }) => {
		const { id } = target;
		const text = window.prompt();
		if (!text) {
			return;
		}
		const cards = [...this.state.columns[id].cards, text];
		let columns = this.state.columns;
		columns[id].cards = cards;
		this.setState({ columns });
	};

	handleRemoveCard = (colInd, cardInd) => {
		const cards = this.state.columns[colInd].cards;
		cards.splice(cardInd, 1);
		let columns = this.state.columns;
		columns[colInd].cards = cards;
		this.setState({ columns });
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
				<NavBar search={this.state.search} handleSearch={this.handleSearch} searchResults={this.state.searchResults} />
				<Board columns={this.state.columns} />
			</div>
		);
	}
}
