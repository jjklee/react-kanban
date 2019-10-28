import React from "react";
import { Column } from "../column/column.component";
import "../board/board.style.css";

export const Board = props =>
	<div className="columns">
		{props.columns.map((column, i) => (
			<Column
				key={i}
				column={column}
				colInd={i + 1}
				handleAddCard={props.handleAddCard}
				handleRemoveCard={props.handleRemoveCard}
				moveLeft={props.moveCardLeft}
				moveRight={props.moveCardRight}
			/>
		))}
	</div>