import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';
import Month from './month.jsx';

export default class Calendar extends Component {
  static propTypes = {
    selectedDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
    headerFormat: PropTypes.string,
    onDateClick: PropTypes.func,
    style: PropTypes.object
  };

  static defaultProps = {
    headerFormat: 'MMMM YYYY',
    selectedDate: new Date(),
    style: {}
  };

  constructor(props) {
    super(props);
    this.state = {
      currentMonth: props.selectedDate,
      currentYear: dateFns.getYear(props.selectedDate)
    };
  }

  /*
   *  ===============
   *    Logic
   *  ===============
   */

  nextMonth = () => {
    const currentMonth = dateFns.addMonths(this.state.currentMonth, 1);
    const currentYear = dateFns.getYear(currentMonth);
    this.setState({ currentMonth, currentYear });
  };

  prevMonth = () => {
    const currentMonth = dateFns.subMonths(this.state.currentMonth, 1);
    const currentYear = dateFns.getYear(currentMonth);
    this.setState({ currentMonth, currentYear });
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
        <div className='calendar-month-decrement' style={styles.chevron} onClick={this.prevMonth}>
          <i className='fa fa-chevron-left' />
        </div>
        <div className='calendar-title' style={styles.title}>
          {dateFns.format(this.state.currentMonth, this.props.headerFormat)}
        </div>
        <div className='calendar-month-increment' style={styles.chevron} onClick={this.nextMonth}>
          <i className='fa fa-chevron-right' />
        </div>
      </div>
    );
  }

  render() {
    const styles = this.getStyles();
    const header = this.renderHeader(styles);
    return (
      <div className='calendar-body' style={this.props.style}>
        {header}
        <Month
          currentMonth={this.state.currentMonth}
          selectedDate={this.props.selectedDate}
          onDateClick={this.props.onDateClick}
        />
      </div>
    );
  }
}
