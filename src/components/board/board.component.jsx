import React, { Component } from "react";
import Column from "../column/column.component";
import { DragDropContext } from "react-beautiful-dnd";
import axios from "axios";
import "../board/board.style.css";

export default class Board extends Component {
	onDragEnd = result => {
		const { destination, source, draggableId } = result;
		let columns = this.props.columns;
		const cardId = parseInt(draggableId);
		if (!destination) return;
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}

		const startCol = parseInt(source.droppableId);
		const finishCol = parseInt(destination.droppableId);
		if (startCol === finishCol) {
			let order = columns[startCol - 1].card_order;
			order.splice(source.index, 1);
			order.splice(destination.index, 0, cardId);
			this.props.fetchColumns();
			this.moveCard(startCol, order);
			return;
		}

		let startOrder = columns[startCol - 1].card_order;
		let finishOrder = columns[finishCol - 1].card_order;
		startOrder.splice(source.index, 1);
		finishOrder.splice(destination.index, 0, cardId);
		columns[startCol - 1].card_order = startOrder;
		columns[finishCol - 1].card_order = finishOrder;
		this.props.fetchColumns();
		this.moveCard(startCol, startOrder);
		this.moveCard(finishCol, finishOrder);
		this.updateColumnId(cardId, finishCol);
	};

	moveCard = (id, card_order) => {
		card_order = JSON.stringify(card_order);
		axios
			.patch("/api/move", { id, card_order })
			.then(() => this.props.fetchColumns())
			.catch(err => console.error("Could not move card, try again."));
	};

	updateColumnId = (id, column_id) => {
		axios
			.patch("/api/updateCol", { id, column_id })
			.then(() => this.props.fetchColumns())
			.catch(err => console.error("Could not update column, try again."));
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
							idCounter={this.props.idCounter}
							moveCard={this.moveCard}
						/>
					))}
				</div>
			</DragDropContext>
		);
	}
}
