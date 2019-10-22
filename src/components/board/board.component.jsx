import React, { Component } from 'react';
import { Column } from '../column/column.component';
import '../board/board.style.css';

export class Board extends Component {
  state = {
    columns: [{
      title: "column1",
      cards: ["to do 1", "to do 2"]
    }, {
      title: "column2",
      cards: ["to do 1", "to do 2"]
    }, {
      title: "column3",
      cards: ["to do 1", "to do 2"]
    }, {
      title: "column4",
      cards: ["to do 1", "to do 2"]
    }]
  }

  handleAddCard = ({ target }) => {
    const {id} = target
    const text = window.prompt();
    if (!text) {
      return;
    }
    const cards = [...this.state.columns[id].cards, text]
    let columns = this.state.columns;
    columns[id].cards = cards;
    this.setState({ columns }, () => console.log(this.state));
  }

  moveCardRight = (colInd, cardInd) => {
    let columns = [...this.state.columns];
    const card = columns[colInd].cards.splice(cardInd, 1);
    columns[colInd + 1].cards.push(card);    
    this.setState({ columns });
  }

  moveCardLeft = (colInd, cardInd) => {
    let columns = [...this.state.columns];
    const card = columns[colInd].cards.splice(cardInd, 1);
    columns[colInd - 1].cards.push(card);    
    this.setState({ columns });
  }

  render () {
    return (
      <div className="column">
      {this.state.columns.map((column, i) => (
        <Column 
          column={column}
          key={i} 
          colInd={i} 
          handleClick={this.handleAddCard} 
          moveLeft={this.moveCardLeft}
          moveRight={this.moveCardRight}
        />
      ))}
      </div>
    )
  }
};