import React, { Component } from 'react';
import axios from 'axios';
import Board from './Board';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import style from './index.css';
import Highcharts from 'highcharts';

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.loadCardsFromServer = this.loadCardsFromServer.bind(this);
    this.handleCardSubmit = this.handleCardSubmit.bind(this);
  }

  loadCardsFromServer() {
    axios.get(this.props.url).then(res => {
      this.setState({ data: res.data });
    });
  }

  handleCardSubmit(card) {
    // handle card post action
  }

  componentDidMount() {
    this.loadCardsFromServer();
    // setInterval(this.loadCardsFromServer, this.props.pollInterval);
  }

  render() {
    return (
      <div className="page">
        <Header />
        <div className="pageContentContainer">
          <Board data={this.state.data} />
          <Sidebar />
        </div>
        <Footer />
      </div>
    );
  }
}
export default Page;
