import React, { Component } from 'react';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }
  render() {
    return <div className="header">Header!</div>;
  }
}
export default Header;
