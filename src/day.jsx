import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';

export default class Day extends Component {
  static propTypes = {
    day: PropTypes.instanceOf(Date).isRequired,
    onClick: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    disabled: PropTypes.bool,
    showDisabled: PropTypes.bool,
    selected: PropTypes.bool,
    inRange: PropTypes.bool,
    dateFormat: PropTypes.string
  }

  static defaultProps = {
    onClick: () => {},
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    disabled: false,
    showDisabled: true,
    selected: false,
    dateFormat: 'D'
  }

  constructor(props) {
    super(props);
    this.state = {
      isWeekend: dateFns.isWeekend(this.props.day),
      hovered: false
    }
  }

  onClick = (e) => {
    if (!this.props.disabled) {
      this.props.onClick(this.props.day);
    }
  };

  onMouseEnter = (e) => {
    if (!this.props.disabled) {
      this.setState({ hovered: true });
      this.props.onMouseEnter(this.props.day);
    }
  };

  onMouseLeave = (e) => {
    if (!this.props.disabled) {
      this.setState({ hovered: false });
      this.props.onMouseLeave(this.props.day);
    }
  };

  getStyles() {
    const styles = {};
    styles.outer = {
      display: 'flex',
      justifyContent: 'flex-start',
      border: '0.5px solid #CCCCCC',
      width: '100%',
      height: '100%',
      cursor: 'pointer'
    };
    styles.date = {
      fontWeight: 400,
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
      styles.outer.backgroundColor = '#FFE0B2';
    }
    else if (this.props.inRange) {
      styles.outer.backgroundColor = '#FFF3E0';
    }
    else if (this.state.hovered) {
      styles.date.color = '#888888';
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
    else if (this.props.inRange) {
      className += ' in-range'
    }
    return className;
  }

  render() {
    const styles = this.getStyles();
    const className = this.getClassName();
    const formattedDate = dateFns.format(this.props.day, this.props.dateFormat)
    return (
      <div
        className={className}
        style={styles.outer}
        onClick={this.onClick}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        <span className='calendar-day-number' style={styles.date}>{formattedDate}</span>
      </div>
    );
  }
}
