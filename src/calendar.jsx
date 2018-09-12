import React from 'react';
import BaseCalendar from './base-calendar.jsx';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';
import Month from './month.jsx';

export default class Calendar extends BaseCalendar {
  static propTypes = {
    selectedDate: PropTypes.instanceOf(Date),
    headerFormat: PropTypes.string,
    onDateClick: PropTypes.func,
    style: PropTypes.object,
    showDisabledDates: PropTypes.bool
  };

  static defaultProps = {
    headerFormat: 'MMMM YYYY',
    selectedDate: new Date(),
    style: {},
    showDisabledDates: true
  };

  constructor(props) {
    super(props);
    this.state = {
      currentMonth: props.selectedDate,
      currentYear: dateFns.getYear(props.selectedDate)
    };
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
          showDisabledDates={this.props.showDisabledDates}
        />
      </div>
    );
  }
}
