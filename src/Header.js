import React, { Component } from 'react';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }
  render() {
    return (
      <div className="header">
        <h2>Header!</h2>
      </div>
    );
  }
}
export default Header;
