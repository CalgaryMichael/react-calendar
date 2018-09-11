import React from 'react';
import BaseCalendar from './base-calendar.jsx';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';
import Month from './month.jsx';

export default class CalendarRange extends BaseCalendar {
  static propTypes = {
    beginningDate: PropTypes.instanceOf(Date),
    endDate: PropTypes.instanceOf(Date),
    headerFormat: PropTypes.string,
    onDateClick: PropTypes.func,
    onBeginningDateClick: PropTypes.func,
    onEndDateClick: PropTypes.func,
    style: PropTypes.object
  };

  static defaultProps = {
    headerFormat: 'MMMM YYYY'
  }

  constructor(props) {
    super(props);
    const currentMonth = props.beginningDate || new Date();
    this.state = {
      currentMonth,
      currentYear: dateFns.getYear(currentMonth),
      beginningDate: props.beginningDate,
      endDate: props.endDate
    };
  }

  onDateClick = (day) => {
    console.log(day);
  }

  getNextMonth = () => {
    return dateFns.addMonths(this.state.currentMonth, 1);
  }

  getStyles() {
    const styles = super.getStyles();
    styles.title.display = 'none';  // hide original title
    styles.months = {
      display: 'flex',
      flexDirection: 'row'
    }
    styles.month = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      height: '100%'
    }
    return styles;
  }

  render() {
    const styles = this.getStyles();
    const header = this.renderHeader(styles);
    const nextMonth = this.getNextMonth();
    return (
      <div style={this.props.style}>
        {header}
        <div className='calendar-months' style={styles.months}>
          <div style={{...styles.month, marginRight: '15px'}}>
            <div className='calendar-title'>{dateFns.format(this.state.currentMonth, this.props.headerFormat)}</div>
            <Month
              currentMonth={this.state.currentMonth}
              onDateClick={this.onDateClick}
            />
          </div>
          <div style={styles.month}>
            <div className='calendar-title'>{dateFns.format(nextMonth, this.props.headerFormat)}</div>
            <Month
              currentMonth={nextMonth}
              onDateClick={this.onDateClick}
            />
          </div>
        </div>
      </div>
    )
  }
}
