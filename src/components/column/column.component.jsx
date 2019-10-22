import React from 'react';
import { Card } from '../card/card.component.jsx';
import './column.style.css';

export const Column = (props) => (
  <div className="single-column">
    <h3 className="title" >{props.column.title}</h3>
    {props.column.cards.map((card, i) => (
      <Card card={card} key={i} colInd={props.colInd} cardInd={i} moveRight={props.moveRight} moveLeft={props.moveLeft}/>
    ))}
    <button className="add" id={props.position} onClick={props.handleClick}>Add a card</button>
  </div>
)
