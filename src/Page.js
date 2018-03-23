import React, { Component } from 'react';
import Board from './Board';
import Header from './Header';
import Sidebar from './Sidebar';
import DATA from './data';
import style from './index.css';
class Page extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }
  render() {
    return (
      <div className="page">
        <h2>Page!</h2>
        <Header />
        <Board data={DATA} />
        <Sidebar />
      </div>
    );
  }
}
export default Page;
