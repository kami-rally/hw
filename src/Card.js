import React, { Component } from 'react';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }
  render() {
    return (
      <div className="card">
        <h2>Card!</h2>
      </div>
    );
  }
}
export default Card;
