import React, { Component } from 'react';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }
  render() {
    return (
      <div className="footer">
        <div className="log-out-link">log out</div>
      </div>
    );
  }
}
export default Footer;
