import React from "react";
import styled from "styled-components";
import Card from "../card/card.component";
import { Droppable } from "react-beautiful-dnd";
import "./column.style.css";

const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color ${props => (props.isDraggingOver ? "gray" : "#ebecf0")};
  flex-grow: 1;
  min-height: 100px;
`;

export const Column = ({
	column,
	addCard,
	removeCard,
	colInd,
	moveCard,
	editCard
}) => (
	<div className="single-column">
		<p className="title">{column.title}</p>
		<button className="add" id={colInd} onClick={() => addCard(colInd)}>
			Add another card
		</button>
		<Droppable droppableId={`${column.id}`}>
			{(provided, snapshot) => (
				<TaskList
					ref={provided.innerRef}
					{...provided.droppableProps}
					isDraggingOver={snapshot.isDraggingOver}
				>
					{column.cards.map((card, i) => (
						<Card
							key={i}
							card={card}
							removeCard={removeCard}
							editCard={editCard}
							index={card.id}
						/>
					))}
					{provided.placeholder}
				</TaskList>
			)}
		</Droppable>
	</div>
);
