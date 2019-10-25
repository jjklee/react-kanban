import React, { Component } from "react";
import { Board } from "./components/board/board.component";
import { NavBar } from "./components/navbar/navbar.component";
import { Footer } from "./components/footer/footer.component";
export default class App extends Component {
	render() {
		return (
			<div className="app">
				<NavBar />
				<Board />
				<Footer />
			</div>
		);
	}
}
