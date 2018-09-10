import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';

export default class Day extends Component {
  static propTypes = {
    day: PropTypes.instanceOf(Date),
    month: PropTypes.instanceOf(Date),
    selected: PropTypes.bool,
    dateFormat: PropTypes.string
  }

  static defaultProps = {
    selected: false,
    dateFormat: 'D'
  }

  render() {
    const formattedDate = dateFns.format(this.props.day, this.props.dateFormat)
    let className = 'calendar-day';
    if (!dateFns.isSameMonth(this.props.day, this.props.month)) {
      className += ' disabled'
    }
    else if (this.props.selected) {
      className += ' selected';
    }
    return (
      <div className={className}>
        <span className='calendar-day-number'>{formattedDate}</span>
      </div>
    );
  }
}
