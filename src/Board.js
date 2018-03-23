import React, { Component } from 'react';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }
  render() {
    return (
      <div className="board">
        <h2>Board!</h2>
      </div>
    );
  }
}
export default Board;
