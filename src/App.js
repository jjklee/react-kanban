import React, { Component } from "react";
import { Board } from "./components/board/board.component";
import { NavBar } from "./components/navbar/navbar.component";
export default class App extends Component {
	state = {
		columns: [
			{
				title: "Backlog",
				cards: [
					"Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
					"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
				]
			},
			{
				title: "In progress",
				cards: [
					"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
					"Nulla malesuada pellentesque elit eget gravida cum sociis natoque penatibus."
				]
			},
			{
				title: "Staged for review",
				cards: [
					"Facilisis leo vel fringilla est ullamcorper eget.",
					"Enim blandit volutpat maecenas volutpat blandit aliquam etiam erat."
				]
			},
			{
				title: "Completed",
				cards: [
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
					"Quis auctor elit sed vulputate mi sit amet. Sit amet risus nullam eget felis eget."
				]
			}
		],
		search: "",
		searchResults: [
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
			"Quis auctor elit sed vulputate mi sit amet. Sit amet risus nullam eget felis eget."
		]
	};

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
				<Board columns={this.state.columns}/>
			</div>
		);
	}
}
