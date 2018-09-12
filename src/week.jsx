import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';
import Day from './day.jsx';

export default class Week extends Component {
  static propTypes = {
    startDate: PropTypes.instanceOf(Date),
    monthStart: PropTypes.instanceOf(Date),
    selectedDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
    endRangeDate: PropTypes.instanceOf(Date),
    onDateClick: PropTypes.func,
    showDisabledDates: PropTypes.bool
  }

  static defaultProps = {
    showDisabledDates: true
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

  isDaySelected = (day) => {
    return this.props.selectedDates.some((selected) => dateFns.isSameDay(day, selected));
  }

  isDayInRange = (day) => {
    if (this.props.selectedDates[0]) {
      if (this.props.selectedDates[1]) {
        return dateFns.isWithinRange(day, this.props.selectedDates[0], this.props.selectedDates[1])
      }
      else if (this.props.endDateRange) {
        return dateFns.isWithinRange(day, this.props.selectedDates[0], this.props.endRangeDate)
      }
    }
    return false;
  }

  generateDays() {
    let days = [];
    let day = this.props.startDay;
    for (let i = 0; i < 7; i++) {
      days.push(
        <Day
          key={day}
          day={day}
          disabled={!dateFns.isSameMonth(day, this.props.monthStart)}
          selected={this.isDaySelected(day)}
          inRange={this.isDayInRange(day)}
          onClick={this.props.onDateClick}
          showDisabled={this.props.showDisabledDates}
        />
      );
      day = dateFns.addDays(day, 1);
    }
    return days;
  }

  render() {
    const styles = this.getStyles();
    const days = this.generateDays();
    return (
      <div className='calendar-week' style={styles.outer}>
        {days}
      </div>
    );
  }
}
