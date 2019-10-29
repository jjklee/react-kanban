import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../card/card.style.css";
import Textfield from "./textfield.component";
export default class Card extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showEditField: false,
			selectedCard: null
		};
	}

	handleEdit = e => {
		const { target } = e;
		this.setState({ showEditField: false }, () => {
			this.setState({ showEditField: true, selectedCard: target.id });
		});
		const node = ReactDOM.findDOMNode(this.refs[target.id]);
		if (node) {
			node.classList.add("selected-card");
		}
		const overlay = document.getElementById("overlay");
		overlay.classList.add("show-overlay");
	};

	handleCancel = e => {
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
		return (
			<div className="card" ref={this.props.card_id}>
				{this.state.showEditField ? (
					<Textfield
						handleCancel={this.handleCancel}
						card_id={this.props.card_id}
						text={this.props.text}
						editCard={this.props.editCard}
					/>
				) : (
					<React.Fragment>
						<span>{this.props.text}</span>
						<div className="card-tools">
							<button onClick={() => this.props.removeCard(this.props.card_id)}>
								delete
							</button>
							<button onClick={this.handleEdit} id={this.props.card_id}>
								edit
							</button>
						</div>
					</React.Fragment>
				)}
			</div>
		);
	}
}
