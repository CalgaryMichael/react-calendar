import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';
import Week from './week.jsx';

export default class Month extends Component {
  static propTypes = {
    currentMonth: PropTypes.instanceOf(Date).isRequired,
    monthStart: PropTypes.instanceOf(Date),
    monthEnd: PropTypes.instanceOf(Date),
    selectedDate: PropTypes.instanceOf(Date),
    onDateClick: PropTypes.func,
    headerFormat: PropTypes.string
  };

  static defaultProps = {
    headerFormat: 'ddd'
  };

  getMonths() {
    return {
      monthStart: this.props.monthStart || dateFns.startOfMonth(this.props.currentMonth),
      monthEnd: this.props.monthEnd || dateFns.endOfMonth(this.props.currentMonth)
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
  generateWeeks(styles) {
    const { monthStart, monthEnd } = this.getMonths();
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);
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
    const weeks = this.generateWeeks(styles);
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