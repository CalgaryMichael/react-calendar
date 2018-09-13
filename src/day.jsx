import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';

export const colors = {
  selected: '#73CEDA',
  hovered: '#DCF7FA',
  hoveredSelected: '#80DDEA',
  inRange: '#B0EAF2',
  defaultBorder: '#E4E7E7'
}

export default class Day extends Component {
  static propTypes = {
    day: PropTypes.instanceOf(Date).isRequired,
    onClick: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    showOutOfMonth: PropTypes.bool,
    outOfMonth: PropTypes.bool,
    disabled: PropTypes.bool,
    selected: PropTypes.bool,
    inRange: PropTypes.bool,
    higlightWeekend: PropTypes.bool,
    dateFormat: PropTypes.string,
    style: PropTypes.object
  }

  static defaultProps = {
    onClick: () => {},
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    disabled: false,
    selected: false,
    highLightWeekend: false,
    dateFormat: 'D',
    style: {}
  }

  constructor(props) {
    super(props);
    this.state = {
      isWeekend: dateFns.isWeekend(props.day),
      hovered: false
    }
  }

  onClick = (e) => {
    if (!this.props.disabled && !this.props.outOfMonth) {
      this.props.onClick(this.props.day);
    }
  };

  onMouseEnter = (e) => {
    if (!this.props.disabled && !this.props.outOfMonth) {
      this.setState({ hovered: true });
      this.props.onMouseEnter(this.props.day);
    }
  };

  onMouseLeave = (e) => {
    if (!this.props.disabled && !this.props.outOfMonth) {
      this.setState({ hovered: false });
      this.props.onMouseLeave(this.props.day);
    }
  };

  getStyles() {
    const styles = {};
    styles.outer = {
      borderWidth: '0.5px',
      borderStyle: 'solid',
      borderColor: colors.defaultBorder,
      boxSizing: 'border-box',
      cursor: 'pointer',
      padding: 0,
      ...this.props.style
    };
    styles.date = {
      fontWeight: 400,
      margin: '5px'
    };
    if (!this.props.showOutOfMonth && this.props.outOfMonth) {
      styles.outer.border = 'none';
      styles.outer.backgroundColor = 'none';
      styles.outer.cursor = 'default';
      styles.date.display = 'none';
    }
    else {
      if (this.state.isWeekend && this.props.higlightWeekend) {
        styles.outer.backgroundColor = '#EEEEEE';
      }
      if (this.props.disabled || this.props.outOfMonth) {
        styles.outer.cursor = 'default';
        styles.date.color = '#AAAAAA';
      }
      else if (this.props.selected) {
        styles.outer.backgroundColor = colors.selected;
        styles.outer.borderColor = colors.selected;
        styles.outer.borderStyle = 'double';
        if (this.state.hovered) {
          styles.outer.backgroundColor = colors.hoveredSelected;
        }
      }
      else if (this.state.hovered) {
        styles.outer.backgroundColor = colors.hovered;
        styles.outer.borderColor = colors.selected;
        styles.outer.borderStyle = 'double';
      }
      else if (this.props.inRange) {
        styles.outer.backgroundColor = colors.inRange;
        styles.outer.borderColor = colors.selected;
        styles.outer.borderStyle = 'double';
      }
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
    else if (this.props.outOfMonth) {
      className += ' out-of-month'
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
        <td
          className={className}
          style={styles.outer}
          onClick={this.onClick}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
        >
        <span className='calendar-day-number' style={styles.date}>{formattedDate}</span>
      </td>
    );
  }
}
