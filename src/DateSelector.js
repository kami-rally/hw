import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

export default class DateSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment('2017-01-01'),
      endDate: moment(),
    };
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
  }

  handleStartChange(date) {
    this.setState({
      startDate: date,
    });
  }

  handleEndChange(date) {
    this.setState({
      endDate: date,
    });
  }

  render() {
    return (
      <div className="dateSelector">
        <span className="dateSelectorInput">
          <DatePicker selected={this.state.startDate} onChange={this.handleStartChange} />
        </span>

        <span className="dateSelectorLabel">to</span>

        <span className="dateSelectorInput">
          <DatePicker
            selected={this.state.endDate}
            onChange={this.handleEndChange}
            popperPlacement="top-end"
            popperModifiers={{
              offset: {
                enabled: true,
                offset: '5px, 10px',
              },
              preventOverflow: {
                enabled: true,
                escapeWithReference: false, // force popper to stay in viewport (even when input is scrolled out of view)
                boundariesElement: 'viewport',
              },
            }}
          />
        </span>
      </div>
    );
  }
}
