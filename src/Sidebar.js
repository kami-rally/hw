import React, { Component } from 'react';
import DateSelector from './DateSelector';

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
        <DateSelector />
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
