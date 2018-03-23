import React, { Component } from 'react';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }
  render() {
    return <div className="sidebar">Sidebar!</div>;
  }
}
export default Sidebar;
