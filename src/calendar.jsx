import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';
import Month from './month.jsx';

export default class Calendar extends Component {
  static propTypes = {
    selectedDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
    headerFormat: PropTypes.string,
    onDateClick: PropTypes.func.isRequired,
    style: PropTypes.object
  };

  static defaultProps = {
    headerFormat: 'MMMM YYYY',
    selectedDate: new Date(),
    style: {}
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
    styles.header = {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginRight: '10px',
      marginLeft: '10px',
    };
    styles.chevron = {
      cursor: 'pointer'
    };
    styles.title = {
      width: '50%',
      minWidth: '150px',
      textAlign: 'center'
    }
    return styles;
  }

  renderHeader(styles) {
    return (
      <div className='calendar-header' style={styles.header}>
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
        onDateClick={this.props.onDateClick}
      />
    )
  }

  render() {
    const styles = this.getStyles();
    const header = this.renderHeader(styles);
    const month = this.renderMonth(styles);
    return (
      <div className='calendar-body' style={this.props.style}>
        {header}
        {month}
      </div>
    );
  }
}
