import React, { Component } from "react";
import onClickOutside from "react-onclickoutside";
import { FaRegCalendarAlt, FaExclamation } from "react-icons/fa";
class Textfield extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: ""
		};
	}

	componentDidMount() {
		this.setState({ text: this.props.text });
		document.getElementsByTagName('textarea')[0].focus();
	}

	handleClickOutside = () => {
		this.props.handleCancel(this.props.selectedCard);
	};

	handleChange = e => {
		this.setState({ text: e.target.value });
	};

	handleSave = () => {
		this.props.editCard(this.props.card.id, this.state.text);
		this.props.handleCancel(this.props.card.id);
	};

	render() {
		return (
			<div className="text-field" id="textarea">
				<textarea
					ref
					style={{ height: this.props.height }}
					className="edit-field"
					onChange={this.handleChange}
					defaultValue={this.props.card.text}
					id={this.props.card.id}
				></textarea>
				<div className="card-tools">
					<div className="badges">
						<button className="due">
							<FaRegCalendarAlt className="tool-icon" />
							{this.props.dueDate}
						</button>
						<button className="priority">
							<FaExclamation className="tool-icon" />
							{this.props.card.priority}
						</button>
					</div>
					<div className="card-btns">
						<button onClick={this.props.handleCancel} id={this.props.card.id}>
							cancel
						</button>
						<button onClick={this.handleSave}>save</button>
					</div>
				</div>
			</div>
		);
	}
}

export default onClickOutside(Textfield);
