import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';
import Day from './day.jsx';

export default class Week extends Component {
  static propTypes = {
    startDate: PropTypes.instanceOf(Date),
    monthStart: PropTypes.instanceOf(Date),
    selectedDate: PropTypes.instanceOf(Date),
    onDateClick: PropTypes.func
  }

  getStyles() {
    const styles = {};
    styles.outer = {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      height: '100%'
    }
    return styles;
  }

  generateDays(styles) {
    let days = [];
    let day = this.props.startDay;
    for (let i = 0; i < 7; i++) {
      days.push(
        <Day
          key={day}
          day={day}
          disabled={!dateFns.isSameMonth(day, this.props.monthStart)}
          selected={dateFns.isSameDay(day, this.props.selectedDate)}
          onClick={this.props.onDateClick}
        />
      );
      day = dateFns.addDays(day, 1);
    }
    return days;
  }

  render() {
    const styles = this.getStyles();
    const days = this.generateDays(styles);
    return (
      <div className='calendar-week' style={styles.outer}>
        {days}
      </div>
    );
  }
}
