import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';

export default class Day extends Component {
  static propTypes = {
    day: PropTypes.instanceOf(Date).isRequired,
    month: PropTypes.instanceOf(Date).isRequired,
    onClick: PropTypes.func,
    selected: PropTypes.bool,
    dateFormat: PropTypes.string
  }

  static defaultProps = {
    onClick: () => {},
    selected: false,
    dateFormat: 'D'
  }

  constructor(props) {
    super(props);
    this.state = {
      disabled: !dateFns.isSameMonth(this.props.day, this.props.month),
      isWeekend: dateFns.isWeekend(this.props.day)
    }
  }

  onClick = (e) => {
    if (!this.state.disabled) {
      this.props.onClick(this.props.day);
    }
  }

  getStyles() {
    const styles = {};
    styles.outer = {
      display: 'flex',
      justifyContent: 'flex-start',
      border: '0.5px solid #CCCCCC',
      width: '100%',
      height: '100%'
    };
    styles.date = {
      fontWeight: 600,
      margin: '5px'
    };
    if (this.state.isWeekend) {
      styles.outer.backgroundColor = '#EEEEEE';
    }
    if (this.state.disabled) {
      styles.date.color = '#AAAAAA';
    }
    else if (this.props.selected) {
      styles.date.color = 'red';
    }
    return styles;
  }

  getClassName() {
    let className = 'calendar-day';
    if (this.state.isWeekend) {
      className += ' weekend';
    }
    if (this.state.disabled) {
      className += ' disabled'
    }
    else if (this.props.selected) {
      className += ' selected';
    }
    return className;
  }

  render() {
    const styles = this.getStyles();
    const className = this.getClassName();
    const formattedDate = dateFns.format(this.props.day, this.props.dateFormat)
    return (
      <div className={className} style={styles.outer} onClick={this.onClick}>
        <span className='calendar-day-number' style={styles.date}>{formattedDate}</span>
      </div>
    );
  }
}
