import React, { Component } from 'react';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }
  render() {
    return (
      <div className="sidebar">
        <div className="photo" />
        <div className="progressBar" />
        <div className="progressBar" />
        <div className="progressBar" />
        <div className="progressBar" />
      </div>
    );
  }
}
export default Sidebar;
