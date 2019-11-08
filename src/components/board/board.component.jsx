import React from "react";
import Column from "../column/column.component";
import { DragDropContext } from "react-beautiful-dnd";
import axios from "axios";
import "./board.style.css";

export default class Board extends React.Component {
	onDragEnd = result => {
		let { destination, source, draggableId } = result;
		draggableId = parseInt(draggableId);
		const cardId = parseInt(draggableId);
		const startColId = parseInt(source.droppableId);
		if (!destination) return;
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}
		const finishColId = parseInt(destination.droppableId);
		const start = this.props.columns[parseInt(source.droppableId) - 1];
		const finish = this.props.columns[parseInt(destination.droppableId) - 1];
		//moving within the same list
		if (start === finish) {
			const newOrder = Array.from(start.card_order);
			newOrder.splice(source.index, 1);
			newOrder.splice(destination.index, 0, draggableId);

			const newColumn = {
				...start,
				card_order: newOrder
			};

			const columns = [...this.props.columns];
			columns[newColumn.id - 1] = newColumn;
			this.props.updateColumns(columns);
			this.moveCard(startColId, newOrder);
			return;
		}

		//moving between the list
		const startOrder = Array.from(start.card_order);
		startOrder.splice(source.index, 1);

		const newStart = {
			...start,
			card_order: startOrder
		};

		const finishOrder = Array.from(finish.card_order);
		finishOrder.splice(destination.index, 0, draggableId);

		const newFinish = {
			...finish,
			card_order: finishOrder
		};

		const columns = [...this.props.columns];
		columns[newStart.id - 1] = newStart;
		columns[newFinish.id - 1] = newFinish;
		this.props.updateColumns(columns);
		this.moveCardAcrossColumns(
			startColId,
			startOrder,
			finishColId,
			finishOrder
		);
		this.updateColumnId(cardId, destination.droppableId);
	};

	moveCard = (id, card_order) => {
		axios
			.patch("/api/move", { id, card_order })
			.catch(err => console.error("Could not move card, try again."));
	};

	moveCardAcrossColumns = (
		startColId,
		startOrder,
		finishColId,
		finishOrder
	) => {
		axios
			.patch("/api/moveColumns", {
				startColId,
				startOrder,
				finishColId,
				finishOrder
			})
			.catch(err => console.error("Could not move card, try again."));
	};

	updateColumnId = (id, column_id) => {
		axios
			.patch("/api/updateCol", { id, column_id })
			.catch(err => console.error("Could not update column, try again."));
	};

	render() {
		return (
			<DragDropContext onDragEnd={this.onDragEnd}>
				<div className="columns">
					<div id="overlay"></div>
					{this.props.columns.map(column => {
						const cards = column.card_order.map(id => this.props.cards[id]);
						return (
							<Column
								key={column.id}
								column={column}
								cards={cards}
								colInd={column.id}
								fetchColumns={this.props.fetchColumns}
								idCounter={this.props.idCounter}
								moveCard={this.moveCard}
							/>
						);
					})}
				</div>
			</DragDropContext>
		);
	}
}