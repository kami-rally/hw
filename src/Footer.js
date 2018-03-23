import React, { Component } from 'react';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }
  render() {
    return (
      <div className="footer">
        <h2>Footer!</h2>
      </div>
    );
  }
}
export default Footer;
