import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';
import Week from './week.jsx';

export default class Month extends Component {
  static propTypes = {
    currentMonth: PropTypes.instanceOf(Date).isRequired,
    isDateDisabled: PropTypes.func,
    isDateSelected: PropTypes.func,
    isDateInRange: PropTypes.func,
    onDateClick: PropTypes.func,
    onDateMouseEnter: PropTypes.func,
    headerFormat: PropTypes.string,
    style: PropTypes.object,
    weekStyle: PropTypes.object,
    dayStyle: PropTypes.object,
    showSurplusDates: PropTypes.bool
  };

  static defaultProps = {
    headerFormat: 'ddd',
    style: {},
    showSurplusDates: true
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
      height: '100%',
      marginTop: '10px',
      borderCollapse: 'collapse',
      borderSpacing: 0,
      ...this.props.style
    };
    styles.dateHeader = {
      textAlign: 'center',
      fontWeight: 500,
      padding: 0,
      paddingBottom: '5px'
    };
    styles.weeks = {
      borderCollapse: 'collapse',
      borderSpacing: 0
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
          isDateDisabled={this.props.isDateDisabled}
          isDateSelected={this.props.isDateSelected}
          isDateInRange={this.props.isDateInRange}
          onDateClick={this.props.onDateClick}
          onDateMouseEnter={this.props.onDateMouseEnter}
          showSurplusDates={this.props.showSurplusDates}
          style={this.props.weekStyle}
          dayStyle={this.props.dayStyle}
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
        <th style={styles.dateHeader} key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), this.props.headerFormat)}
        </th>
      );
    }
    return (
      <tr className="calendar-days-header">
        {days}
      </tr>
    );
  }

  render() {
    const styles = this.getStyles();
    const header = this.renderDaysHeader(styles);
    const weeks = this.generateWeeks();
    return (
      <table className='calendar-month' style={styles.outer}>
        <thead>
          {header}
        </thead>
        <tbody className='calendar-weeks' style={styles.weeks}>
          {weeks}
        </tbody>
      </table>
    )
  }
}
