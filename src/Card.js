import React, { Component } from 'react';
import axios from 'axios';
import LineChart from './LineChart';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.loadDataFromServer = this.loadDataFromServer.bind(this);
  }

  loadDataFromServer() {
    axios.get(this.props.endpoint).then(res => {
      this.setState({ data: res.data });
      this.forceUpdate();
    });
  }

  componentDidMount() {
    this.loadDataFromServer();
  }

  render() {
    const chartData = this.state.data;

    return (
      <div className="card">
        <LineChart data={chartData} />
      </div>
    );
  }
}
export default Card;
