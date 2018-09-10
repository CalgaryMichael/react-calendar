import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';
import Month from './month.jsx';

export default class Calendar extends Component {
  static propTypes = {
    selectedDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
    headerFormat: PropTypes.string,
    onDateClick: PropTypes.func.isRequired
  };

  static defaultProps = {
    headerFormat: 'MMMM YYYY',
    selectedDate: new Date()
  }

  constructor(props) {
    super(props);
    const year = dateFns.getYear(props.selectedDate);
    const month = dateFns.getMonth(props.selectedDate);
    this.state = {
      currentMonth: props.selectedDate,
      currentYear: year,
      monthMapping: {
        [year]: {
          [month]: this._mapMonth(props.selectedDate)
        }
      }
    };
  }

  /*
   *  ===============
   *    Logic
   *  ===============
   */

  mapMonth = (date) => {
    const year = dateFns.getYear(date);
    const month = dateFns.getMonth(date);
    if (this.state.monthMapping[year] && this.state.monthMapping[year][month]) {
      return this.state.monthMapping[year][month];
    }
    else {
      return this._mapMonth(date);
    }
  };

  _mapMonth = (date) => {
    return {
      monthStart: dateFns.startOfMonth(date),
      monthEnd: dateFns.endOfMonth(date),
    }
  }

  onDateClick = (date) => {
    this.props.onDateClick(date);
  };

  nextMonth = () => {
    const currentMonth = dateFns.addMonths(this.state.currentMonth, 1);
    const monthNum = dateFns.getMonth(currentMonth);
    const currentYear = dateFns.getYear(currentMonth);
    this.setState({
      currentMonth,
      currentYear,
      monthMapping: {
        ...this.state.monthMapping,
        [currentYear]: {
          ...this.state.monthMapping[currentYear],
          [monthNum]: this.mapMonth(currentMonth)
        }
      }
    });
  };

  prevMonth = () => {
    const currentMonth = dateFns.subMonths(this.state.currentMonth, 1);
    const monthNum = dateFns.getMonth(currentMonth);
    const currentYear = dateFns.getYear(currentMonth);
    this.setState({
      currentMonth,
      currentYear,
      monthMapping: {
        ...this.state.monthMapping,
        [currentYear]: {
          ...this.state.monthMapping[currentYear],
          [monthNum]: this.mapMonth(currentMonth)
        }
      }
    });
  };

  /*
   *  ===============
   *    Visuals
   *  ===============
   */

  getStyles() {
    const styles = {};
    styles.month = {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginRight: '10px',
      marginLeft: '10px'
    };
    styles.chevron = {
      cursor: 'pointer'
    };
    styles.title = {
      width: '50%',
      minWidth: '150px',
      textAlign: 'center'
    }
    styles.dateHeader = {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginTop: '10px',
      textAlign: 'center'
    }
    return styles;
  }

  renderHeader(styles) {
    const days = this.renderDaysHeader(styles)
    return (
      <div className='calendar-header'>
        <div className='calendar-month' style={styles.month}>
          <div style={styles.chevron} onClick={this.prevMonth}>
            <i className='fa fa-chevron-left' />
          </div>
          <div style={styles.title}>
            {dateFns.format(this.state.currentMonth, this.props.headerFormat)}
          </div>
          <div style={styles.chevron} onClick={this.nextMonth}>
            <i className='fa fa-chevron-right' />
          </div>
        </div>
        {days}
      </div>
    );
  }

  renderDaysHeader(styles) {
    const days = [];
    const startDate = dateFns.startOfWeek(this.state.currentMonth);
    for (let i = 0; i < 7; i++) {
      days.push(
        <div style={{width: '100%'}} key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), "dddd")}
        </div>
      );
    }
    return (
      <div className="calendar-days-header" style={styles.dateHeader}>
        {days}
      </div>
    );
  }

  renderMonth(styles) {
    const monthNum = dateFns.getMonth(this.state.currentMonth);
    const { monthStart, monthEnd } = this.state.monthMapping[this.state.currentYear][monthNum];
    return (
      <Month
        currentMonth={this.state.currentMonth}
        monthStart={monthStart}
        monthEnd={monthEnd}
        selectedDate={this.props.selectedDate}
      />
    )
  }

  render() {
    const styles = this.getStyles();
    const header = this.renderHeader(styles);
    const month = this.renderMonth(styles);
    return (
      <div className='calendar-body'>
        {header}
        {month}
      </div>
    );
  }
}
