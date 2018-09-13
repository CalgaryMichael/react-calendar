import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';
import Day from './day.jsx';

export default class Week extends Component {
  static propTypes = {
    startDate: PropTypes.instanceOf(Date),
    monthStart: PropTypes.instanceOf(Date),
    isDateDisabled: PropTypes.func,
    isDateSelected: PropTypes.func,
    isDateInRange: PropTypes.func,
    onDateClick: PropTypes.func,
    onDateMouseEnter: PropTypes.func,
    showSurplusDates: PropTypes.bool,
    style: PropTypes.object,
    dayStyle: PropTypes.object
  };

  static defaultProps = {
    showSurplusDates: true,
    isDateDisabled: () => false,
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
      const isSameMonth = dateFns.isSameMonth(day, this.props.monthStart);
      days.push(
        <Day
          key={day}
          day={day}
          showOutOfMonth={this.props.showSurplusDates || isSameMonth}
          outOfMonth={!isSameMonth}
          disabled={this.props.isDateDisabled(day)}
          selected={this.props.isDateSelected(day)}
          inRange={this.props.isDateInRange(day)}
          onClick={this.props.onDateClick}
          onMouseEnter={this.props.onDateMouseEnter}
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
