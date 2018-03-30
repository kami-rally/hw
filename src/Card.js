import React, { Component } from 'react';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }
  render() {
    return (
      <div className="card">
        <span className="card-title">{this.props.title}</span>
      </div>
    );
  }
}
export default Card;
