import React, { Component } from 'react';
import Board from './Board';
import Header from './Header';
import Footer from './Footer';
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
        <Header />
        <div className="pageContentContainer">
          <Board data={DATA} />
          <Sidebar />
        </div>
        <Footer />
      </div>
    );
  }
}
export default Page;
