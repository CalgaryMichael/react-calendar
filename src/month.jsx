import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';
import Week from './week.jsx';

export default class Month extends Component {
  static propTypes = {
    currentMonth: PropTypes.instanceOf(Date).isRequired,
    selectedDate: PropTypes.instanceOf(Date),
    onDateClick: PropTypes.func,
    headerFormat: PropTypes.string
  };

  static defaultProps = {
    headerFormat: 'ddd'
  };

  getMonthInfo() {
    const monthStart = dateFns.startOfMonth(this.props.currentMonth);
    const monthEnd = dateFns.endOfMonth(this.props.currentMonth);
    return {
      monthStart,
      monthEnd,
      startDate: dateFns.startOfWeek(monthStart),
      endDate: dateFns.endOfWeek(monthEnd)
    };
  }

  getStyles() {
    const styles = {};
    styles.outer = {
      width: '100%',
      height: '100%'
    };
    styles.dateHeader = {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginTop: '10px',
      textAlign: 'center',
      fontWeight: 300
    };
    styles.weeks = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      height: '100%'
    };
    return styles;
  }

  generateWeeks() {
    const { monthStart, startDate, endDate } = this.getMonthInfo();
    const weekCount = dateFns.differenceInCalendarWeeks(endDate, startDate);
    let weeks = [];
    for (let weekNum = 0; weekNum <= weekCount; weekNum++) {
      const day = dateFns.addWeeks(startDate, weekNum);
      weeks.push(
        <Week
          key={weekNum}
          startDay={day}
          monthStart={monthStart}
          selectedDate={this.props.selectedDate}
          onDateClick={this.props.onDateClick}
        />
      );
    }
    return weeks;
  }

  renderDaysHeader(styles) {
    const days = [];
    const startDate = dateFns.startOfWeek(this.props.currentMonth);
    for (let i = 0; i < 7; i++) {
      days.push(
        <div style={{width: '100%'}} key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), this.props.headerFormat)}
        </div>
      );
    }
    return (
      <div className="calendar-days-header" style={styles.dateHeader}>
        {days}
      </div>
    );
  }

  render() {
    const styles = this.getStyles();
    const header = this.renderDaysHeader(styles);
    const weeks = this.generateWeeks();
    return (
      <div className='calendar-month' style={styles.outer}>
        {header}
        <div className='calendar-weeks' style={styles.weeks}>
          {weeks}
        </div>
      </div>
    )
  }
}
