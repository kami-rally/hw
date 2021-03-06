import React, { Component } from 'react';
import Card from './Card';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }
  render() {
    let cardNodes = this.props.data.map(card => {
      return <Card endpoint={card.endpoint} title={card.title} key={card['_id']} />;
    });
    return <div className="board">{cardNodes}</div>;
  }
}
export default Board;
