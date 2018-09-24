import React from 'react';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';
import { TransitionGroup, Transition } from 'react-transition-group';
import BaseCalendar from './base-calendar.jsx';
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
      currentYear: dateFns.getYear(props.selectedDate),
      increment: false
    };
  }

  isDateSelected = (day) => {
    return dateFns.isSameDay(day, this.props.selectedDate);
  }

  getMonths() {
    return {
      prevMonth: dateFns.subMonths(this.state.currentMonth, 1),
      currentMonth: this.state.currentMonth,
      nextMonth: dateFns.addMonths(this.state.currentMonth, 1)
    }
  }

  render() {
    const styles = this.getStyles();
    const header = this.renderHeader(styles);
    const months = this.getMonths();
    return (
      <div className='calendar-body' style={this.props.style}>
        {header}
        <div style={styles.outer}>
          <TransitionGroup component={null}>
            {Object.keys(months).map((month, index) => (
              <Month
                key={`${index}-${dateFns.format(months[month], 'MMMM YYYY')}`}
                currentMonth={months[month]}
                visible={months[month] === this.state.currentMonth}
                isDateSelected={this.isDateSelected}
                onDateClick={this.props.onDateClick}
                showDisabledDates={this.props.showDisabledDates}
              />
            ))}
          </TransitionGroup>
        </div>
      </div>
    );
  }
}
