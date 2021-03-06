import React from "react";
import styled from "styled-components";
import Card from "../card/card.component";
import { Droppable } from "react-beautiful-dnd";
import axios from "axios";
import "./column.style.css";

const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color ${props => (props.isDraggingOver ? "#cdced3" : "#ebecf0")};
  flex-grow: 1;
	min-height: 100px;
	border-radius: 3px;
`;

export default class Column extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showAddField: false,
			text: "",
			priority: 1,
			due_date: "2050-01-01",
			column_id: null
		};
	}

	handleAddCard = e => {
		if (e) {
			this.setState({
				showAddField: !this.state.showAddField,
				column_id: e.target.id
			});
		} else {
			this.setState({ showAddField: !this.state.showAddField });
		}
	};

	onSave = () => {
		const { text, priority, due_date, column_id } = this.state;
		if (!text.length) {
			this.handleAddCard();
			//return textfield cannot be empty
			return;
		}
		const id = this.props.idCounter + 1;
		const order = [id, ...this.props.column.card_order];
		axios
			.post("/api/add", { id, text, priority, due_date, column_id })
			.then(() => {
				this.handleAddCard();
				this.props.moveCard(column_id, order);
			})
			.then(() => this.props.fetchColumns())
			.catch(err => console.error("Could not add card"));
	};

	handleChange = ({ target }) => {
		this.setState({ [target.id]: target.value });
	};

	removeCard = cardInd => {
		cardInd = parseInt(cardInd);
		const id = this.props.column.id;
		let order = this.props.column.card_order;
		const index = order.indexOf(cardInd);
		order.splice(index, 1);
		axios
			.delete(`/api/delete/${cardInd}`)
			.then(() => this.props.moveCard(id, order))
			.then(() => this.props.fetchColumns())
			.catch(err => console.error("Could not delete, try again."));
	};

	editCard = (cardInd, text) => {
		axios
			.patch("/api/edit", { cardInd, text })
			.then(() => this.props.fetchColumns())
			.catch(err => console.error("Could not edit card, try again."));
  };
  
  AddCardForm() {
		return (
			<div className="add-form">
				<div className="nums">
					<div className="priority-input">
						priority:
						<input
							type="number"
							min="1"
							max="10"
							defaultValue="1"
							className="form-input"
							id="priority"
							onChange={this.handleChange}
						/>
					</div>
					<div className="date-input">
						due date:
						<input
							id="due_date"
							min="2019-10-31"
							type="date"
							defaultValue="2050-01-01"
							className="form-input"
							onChange={this.handleChange}
						/>
					</div>
				</div>
				<div className="text-input">
					<textarea
						id="text"
						placeholder="Add text for card here.."
						className="form-input"
						onChange={this.handleChange}
						required={true}
					/>
				</div>
				<div className="form-tools">
					<button onClick={this.handleAddCard}>cancel</button>
					<button onClick={this.onSave}>save</button>
				</div>
			</div>
		);
	}

	render() {
		return (
			<div className="single-column">
				<p className="title">{this.props.column.title}</p>
        {this.state.showAddField ? (
					this.AddCardForm()
				) : (
					<button
						className="add"
						id={this.props.colInd}
						onClick={this.handleAddCard}
					>
						Add another card
					</button>
				)}
				<Droppable droppableId={`${this.props.column.id}`}>
					{(provided, snapshot) => (
						<TaskList
							ref={provided.innerRef}
							{...provided.droppableProps}
							isDraggingOver={snapshot.isDraggingOver}
						>
							{this.props.cards.map((card, i) => (
								<Card
									key={card.id}
									index={i}
									card={card}
									removeCard={this.removeCard}
									editCard={this.editCard}
								/>
							))}
							{provided.placeholder}
						</TaskList>
					)}
				</Droppable>
			</div>
		);
	}
}
