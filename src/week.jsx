import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';
import Day from './day.jsx';

export default class Week extends Component {
  static propTypes = {
    startDate: PropTypes.instanceOf(Date),
    monthStart: PropTypes.instanceOf(Date),
    isDateSelected: PropTypes.func,
    isDateInRange: PropTypes.func,
    onDateClick: PropTypes.func,
    onDateMouseEnter: PropTypes.func,
    showDisabledDates: PropTypes.bool,
    style: PropTypes.object,
    dayStyle: PropTypes.object
  };

  static defaultProps = {
    showDisabledDates: true,
    isDateSelected: () => false,
    isDateInRange: () => false,
    onDateClick: () => {},
    onDateMouseEnter: () => {},
    style: {},
    dayStyle: {}
  };

  generateDays() {
    let days = [];
    let day = this.props.startDay;
    for (let i = 0; i < 7; i++) {
      days.push(
        <Day
          key={day}
          day={day}
          disabled={!dateFns.isSameMonth(day, this.props.monthStart)}
          selected={this.props.isDateSelected(day)}
          inRange={this.props.isDateInRange(day)}
          onClick={this.props.onDateClick}
          onMouseEnter={this.props.onDateMouseEnter}
          showDisabled={this.props.showDisabledDates}
          style={this.props.dayStyle}
        />
      );
      day = dateFns.addDays(day, 1);
    }
    return days;
  }

  render() {
    const days = this.generateDays();
    return (
      <tr className='calendar-week' style={this.props.style}>
        {days}
      </tr>
    );
  }
}
