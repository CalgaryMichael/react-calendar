import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';

export default class Day extends Component {
  static propTypes = {
    day: PropTypes.instanceOf(Date).isRequired,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    showDisabled: PropTypes.bool,
    selected: PropTypes.bool,
    dateFormat: PropTypes.string
  }

  static defaultProps = {
    onClick: () => {},
    disabled: false,
    showDisabled: true,
    selected: false,
    dateFormat: 'D'
  }

  constructor(props) {
    super(props);
    this.state = {
      isWeekend: dateFns.isWeekend(this.props.day)
    }
  }

  onClick = (e) => {
    if (!this.props.disabled) {
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
    if (this.props.disabled) {
      if (!this.props.showDisabled) {
        styles.outer.border = 'none';
        styles.outer.backgroundColor = 'none';
        styles.date.display = 'none';
      }
      else {
        styles.date.color = '#AAAAAA';
      }
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
    if (this.props.disabled) {
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
