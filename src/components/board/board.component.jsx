import React, { Component } from "react";
import { Column } from "../column/column.component";
import { DragDropContext } from "react-beautiful-dnd";
import "../board/board.style.css";

export default class Board extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	onDragEnd = result => {
		//change card order
	};

	render() {
		return (
			<DragDropContext onDragEnd={this.onDragEnd}>
				<div className="columns">
					<div id="overlay"></div>
					{this.props.columns.map((column, i) => (
						<Column
							key={i}
							column={column}
							colInd={column.id}
							addCard={this.props.addCard}
							removeCard={this.props.removeCard}
							moveCard={this.props.moveCard}
							editCard={this.props.editCard}
						/>
					))}
				</div>
			</DragDropContext>
		);
	}
}
