import React, { Component } from 'react';
import axios from 'axios';
import LineChart from './LineChart';

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: [],
      className: `card ${props.title}`,
      title: props.title,
    };
  }

  componentDidMount() {
    axios.get(this.props.endpoint).then(
      result => {
        this.setState({
          isLoaded: true,
          data: result.data,
        });
      },
      error => {
        this.setState({
          isLoaded: true,
          error,
        });
      }
    );
  }

  render() {
    const { error, isLoaded, data, className, title } = this.state;
    if (error) {
      return (
        <div title={title} className={className}>
          Error: {error.message}
        </div>
      );
    } else if (!isLoaded) {
      return (
        <div title={title} className={className}>
          Loading...
        </div>
      );
    } else {
      return (
        <div className={className}>
          <LineChart title={title} data={data} />
        </div>
      );
    }
  }
}
