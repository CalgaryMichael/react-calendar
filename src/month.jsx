import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';
import Week from './week.jsx';

export default class Month extends Component {
  static propTypes = {
    currentMonth: PropTypes.instanceOf(Date).isRequired,
    monthStart: PropTypes.instanceOf(Date),
    monthEnd: PropTypes.instanceOf(Date),
    selectedDate: PropTypes.instanceOf(Date)
  }

  getStyles() {
    const styles = {};
    return styles;
  }

  render() {
    const styles = this.getStyles();
    const startDate = dateFns.startOfWeek(this.props.monthStart);
    const endDate = dateFns.endOfWeek(this.props.monthEnd);

    let weeks = [];
    let day = startDate;
    while (day <= endDate) {
      weeks.push(
        <Week
          key={day}
          startDay={day}
          monthStart={this.props.monthStart}
        />
      );
      day = dateFns.addDays(day, 7);
    }
    return (
      <div className='calendar-month'>
        {weeks}
      </div>
    )
  }
}
