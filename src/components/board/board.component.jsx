import React from "react";
import { Column } from "../column/column.component";
import "../board/board.style.css";

export const Board = props =>
	<div className="columns">
		<div className="overlay" id="overlay"></div>
		{props.columns.map((column, i) => (
			<Column
				key={i}
				column={column}
				colInd={i + 1}
				addCard={props.addCard}
				removeCard={props.removeCard}
				moveCard={props.moveCard}
				editCard={props.editCard}
			/>
		))}
	</div>