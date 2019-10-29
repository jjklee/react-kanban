import onClickOutside from "react-onclickoutside";
import React, { Component } from "react";

class Textfield extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: ""
		};
	}

	componentDidMount() {
		this.setState({ text: this.props.text });
	}

	handleClickOutside = e => {
		this.props.handleCancel(this.props.card_id);
	};

	handleChange = e => {
		this.setState({ text: e.target.value });
	};

	handleSave = () => {
		this.props.editCard(this.props.card_id, this.state.text);
		this.props.handleCancel(this.props.card_id);
	};

	render() {
		return (
			<div>
				<textarea
					className="edit-field"
					onChange={this.handleChange}
					defaultValue={this.props.text}
					id="this.props.card_id"
				></textarea>
				<div className="card-tools">
					<button onClick={this.handleCancel} id={this.props.card_id}>
						cancel
					</button>
					<button onClick={this.handleSave}>save</button>
				</div>
			</div>
		);
	}
}

export default onClickOutside(Textfield);