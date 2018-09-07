import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';

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
      monthMapping: {
        [year]: {
          [month]: this._mapMonth(props.selectedDate)
        }
      }
    };
  }

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
      monthMapping: {
        ...this.state.monthMapping,
        [currentYear]: {
          ...this.state.monthMapping[currentYear],
          [monthNum]: this.mapMonth(currentMonth)
        }
      }
    });
  };

  render() {
    return (
      <div className='calendar-body'>
      </div>
    );
  }
}
