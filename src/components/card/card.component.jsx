import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../card/card.style.css";
export default class Card extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showEditField: false,
			text: ""
		};
	}

	handleEdit = e => {
		const { target } = e;
		this.setState({ showEditField: false }, () => {
			this.setState({ showEditField: true });
		});
		const node = ReactDOM.findDOMNode(this.refs[target.id]);
		if (node) {
			node.classList.add("selected-card");
		}
		const overlay = document.getElementById("overlay");
		overlay.classList.add("show-overlay");
	};

	handleCancel = e => {
		const node = ReactDOM.findDOMNode(this.refs[e.target.id]);
		const overlay = document.getElementById("overlay");
		if (node) {
			node.classList.remove("selected-card");
		}
		overlay.classList.remove("show-overlay");
		this.setState({ showEditField: false });
	};

	handleChange = e => {
		this.setState({ text: e.target.value });
	};

	handleSave = e => {
		this.props.editCard(this.props.card_id, this.state.text);
		window.location.reload();
	};

	render() {
		return (
			<div className="card" ref={this.props.card_id}>
				{this.state.showEditField ? (
					<textarea
						className="edit-field"
						id={`text${this.props.card_id}`}
						onChange={this.handleChange}
						defaultValue={this.props.text}
					></textarea>
				) : (
					<span>{this.props.text}</span>
				)}
				<div className="card-tools">
					{this.state.showEditField ? (
						<button onClick={this.handleSave}>save</button>
					) : (
						<button onClick={() => this.props.removeCard(this.props.card_id)}>
							delete
						</button>
					)}
					{this.state.showEditField ? (
						<button onClick={this.handleCancel} id={this.props.card_id}>
							cancel
						</button>
					) : (
						<button onClick={this.handleEdit} id={this.props.card_id}>
							edit
						</button>
					)}
				</div>
			</div>
		);
	}
}
