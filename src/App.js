import React from "react";
import axios from 'axios';
import Board from "./components/board/board.component";
import { NavBar } from "./components/navbar/navbar.component";
export default class App extends React.Component {
	state = {
		columns: [],
		cards: {},
		searchResults: [],
		search: "",
		idCounter: null
	};

	componentDidMount() {
		this.fetchColumns()
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
				const cards = {}
				data.map(card => cards[card.id] = card);
				return [cards, parseInt(data[data.length - 1].id)];
			})
			.then((data) => {
				this.setState({
					columns: col,
					cards: data[0],
					idCounter: data[1]
				});
			})
			.catch(err => console.log("Could not fetch cards"));
	};

	updateColumns = columns => {
		this.setState({ columns });
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
					cards={this.state.cards}
					fetchColumns={this.fetchColumns}
					idCounter={this.state.idCounter}
					updateColumns={this.updateColumns}
				/>
			</div>
		);
	}
}
