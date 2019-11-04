import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../card/card.style.css";
import Textfield from "./textfield.component";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { FaRegCalendarAlt, FaExclamation } from "react-icons/fa";

const Container = styled.div`
	background-color: white;
	border: 1px solid lightgrey;
	border-radius: 3px;
	padding: 8px 8px 30px 8px;
	margin-bottom: 8px;
	opacity: ${props => (props.isDragging ? 0.7 : 1)};
	position: relative;
`;

export default class Card extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedCard: null,
			cards: [],
			height: "100px"
		};
	}

	handleOverlay = e => {
		const id = e.target.id;
		this.setState({ showEditField: true, selectedCard: id });
		const node = ReactDOM.findDOMNode(this.refs[id]);
		if (node) {
			node.classList.add("selected-card");
			const height = node.clientHeight - 43;
			this.setState({ height });
		}
		const overlay = document.getElementById("overlay");
		overlay.classList.add("show-overlay");
	};

	handleCancel = () => {
		let id = this.state.selectedCard;
		const node = ReactDOM.findDOMNode(this.refs[id]);
		const overlay = document.getElementById("overlay");
		if (node) {
			node.classList.remove("selected-card");
		}
		overlay.classList.remove("show-overlay");
		this.setState({ showEditField: false });
	};

	render() {
		const dueDate = this.props.card.due_date.substring(5);

		return (
			<div ref={this.props.index} className="cardfield">
				{this.state.showEditField ? (
					<Textfield
						handleCancel={this.handleCancel}
						card={this.props.card}
						editCard={this.props.editCard}
						selectedCard={this.state.selectedCard}
						height={this.state.height}
						dueDate={dueDate}
					/>
				) : (
					<Draggable
						draggableId={`${this.props.card.id}`}
						index={this.props.index}
						ref={this.props.cardId}
					>
						{(provided, snapshot) => (
							<Container
								{...provided.draggableProps}
								{...provided.dragHandleProps}
								ref={provided.innerRef}
								isDragging={snapshot.isDragging}
							>
								{this.props.card.text}
								<div className="card-tools">
									<div className="badges">
										<button className="due">
											<FaRegCalendarAlt className="tool-icon" />
											{dueDate}
										</button>
										<button className="priority">
											<FaExclamation className="tool-icon" />
											{this.props.card.priority}
										</button>
									</div>
									<div className="card-btns">
										<button onClick={this.handleOverlay} id={this.props.index}>
											edit
										</button>
										<button
											onClick={() => this.props.removeCard(this.props.card.id)}
										>
											delete
										</button>
									</div>
								</div>
							</Container>
						)}
					</Draggable>
				)}
			</div>
		);
	}
}
