import React, { Component } from 'react';
import Card from './Card';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }
  render() {
    debugger;
    let cardNodes = this.props.data.map(card => {
      return <Card title={card.title} key={card['_id']} />;
    });
    return <div className="board">{cardNodes}</div>;
  }
}
export default Board;
