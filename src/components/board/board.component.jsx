import React, { Component } from "react";
import Column from "../column/column.component";
import { DragDropContext } from "react-beautiful-dnd";
import "../board/board.style.css";
import axios from "axios";

export default class Board extends Component {
	onDragEnd = result => {
		const { destination, source } = result;
		if (!destination) return;
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}
		const newColInd = parseInt(destination.droppableId);
		const cardInd = source.index;
		this.moveCard(cardInd, newColInd);
	};

	moveCard = (cardInd, newColInd) => {
		axios
			.patch("/api/move", { cardInd, newColInd })
			.then(() => this.props.fetchColumns())
			.catch(err => console.error("Could not move card, try again."));
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
							fetchColumns={this.props.fetchColumns}
						/>
					))}
				</div>
			</DragDropContext>
		);
	}
}
