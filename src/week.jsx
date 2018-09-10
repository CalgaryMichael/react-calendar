import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';
import Day from './day.jsx';

export default class Week extends Component {
  static propTypes = {
    startDate: PropTypes.instanceOf(Date),
    monthStart: PropTypes.instanceOf(Date),
    selectedDate: PropTypes.instanceOf(Date)
  }

  render() {
    let days = [];
    let day = this.props.startDay;
    for (let i = 0; i < 7; i++) {
      days.push(
        <Day
          key={day}
          day={day}
          month={this.props.monthStart}
          selected={dateFns.isSameDay(day, this.props.selectedDate)}
        />
      );
      day = dateFns.addDays(day, 1);
    }
    return (
      <div className='calendar-week'>
        {days}
      </div>
    );
  }
}
