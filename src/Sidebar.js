import React, { Component } from 'react';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }
  render() {
    return (
      <div className="sidebar">
        <a href="http://localhost:3001/api/authorize">
          <div className="photo" />
        </a>
        <div className="goals-title">goals</div>
        <div className="progressBar" />
        <div className="progressBar" />
        <div className="progressBar" />
        <div className="progressBar" />
      </div>
    );
  }
}
export default Sidebar;
