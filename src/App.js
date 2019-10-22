import React, { Component } from 'react';
import { Board } from './components/board/board.component';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Board />
      </div>
    );
  }
}
