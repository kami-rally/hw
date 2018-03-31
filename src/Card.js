import React, { Component } from 'react';
import axios from 'axios';
var d3 = require('d3');

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.loadDataFromServer = this.loadDataFromServer.bind(this);
  }

  loadDataFromServer() {
    axios.get(this.props.endpoint).then(res => {
      debugger;
      this.setState({ data: res.data });
    });
  }

  componentDidMount() {
    this.loadDataFromServer();
  }

  render() {
    return (
      <div className="card">
        <span className="card-title">{this.props.title}</span>
        <span className="card-data" />
      </div>
    );
  }
}
export default Card;
