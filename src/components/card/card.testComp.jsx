import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../card/card.style.css";
export default class Card extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// showEditField: false,
			text: "",
			showEditField: []
		};
	}

	componentWillMount() {
		let showEditField = this.state.showEditField;
		showEditField[this.props.card_id] = false;
		this.setState({showEditField}, () => console.log(this.state))
	}

	handleEdit = e => {
		const { target } = e;
		let showEditField = this.state.showEditField
		for(let i = 0; i < showEditField.length; i++) {
			if (showEditField[i] === true) {
				showEditField[i] = false;
			} else if (i === e.target.id) {
				showEditField[i] = true;
			}
		}
		// this.setState({ showEditField[e.target.id]: false }, () => {
		// 	this.setState({ showEditField: true });
		// });
		this.setState({ })
		const node = ReactDOM.findDOMNode(this.refs[target.id]);
		if (node) {
			node.classList.add("selected-card");
		}


	};

	handleCancel = e => {
		const node = ReactDOM.findDOMNode(this.refs[e.target.id]);
		if (node) {
			node.classList.remove("selected-card");
		}
		this.setState({ showEditField: false });
	};

	handleChange = e => {
		this.setState({ text: e.target.value });
	};

	render() {
		let id = this.props.card_id
		return (
			<div className="card" ref={id}>
				{this.state.showEditField ? (
					<textarea
						className="edit-field"
						// style={style}
						value={this.props.text}
						id={`text${id}`}
						onChange={this.handleChange}
					/>
				) : (
					<span>{this.props.text}</span>
				)}
				<div className="card-tools">
					{this.state.showEditField[id] ? (
						<button
						// onClick={() => this.props.handleEditCard(this.props.card_id)}
						>
							save
						</button>
					) : (
						<button
							onClick={() => this.props.handleRemoveCard(id)}
						>
							delete
						</button>
					)}
					{this.state.showEditField[id] ? (
						<button onClick={this.handleCancel} id={id}>
							cancel
						</button>
					) : (
						<button onClick={this.handleEdit} id={id}>
							edit
						</button>
					)}
				</div>
			</div>
		);
	}
}
