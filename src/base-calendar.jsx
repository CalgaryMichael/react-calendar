import React, { Component } from 'react';
import dateFns from 'date-fns';

export default class BaseCalendar extends Component {
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
      styles.chevronLeft = {...styles.chevron};
      if (this.state.decrementHover) {
        styles.chevronLeft.opacity = 0.5;
      }
      styles.chevronRight = {...styles.chevron};
      if (this.state.incrementHover) {
        styles.chevronRight.opacity = 0.5;
      }
      styles.title = {
        width: '50%',
        minWidth: '150px',
        textAlign: 'center'
      };
      return styles;
    }

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

    incrementMouseEnter = () => {
      this.setState({ incrementHover: true });
    };

    incrementMouseLeave = () => {
      this.setState({ incrementHover: false });
    };

    decrementMouseEnter = () => {
      this.setState({ decrementHover: true });
    };

    decrementMouseLeave = () => {
      this.setState({ decrementHover: false });
    };

    renderDecrement(styles) {
      return (
        <div
          className='calendar-month-decrement'
          style={styles.chevronLeft}
          onClick={this.prevMonth}
          onMouseEnter={this.decrementMouseEnter}
          onMouseLeave={this.decrementMouseLeave}
        >
          <i className='fa fa-chevron-left' />
        </div>
      );
    }

    renderIncrement(styles) {
      return (
        <div
          className='calendar-month-increment'
          style={styles.chevronRight}
          onClick={this.nextMonth}
          onMouseEnter={this.incrementMouseEnter}
          onMouseLeave={this.incrementMouseLeave}
        >
          <i className='fa fa-chevron-right' />
        </div>
      );
    }

    formatTitle = (date) => {
      return dateFns.format(date, this.props.headerFormat);
    }

    renderHeader(styles) {
      const decrement = this.renderDecrement(styles);
      const increment = this.renderIncrement(styles);
      return (
        <div className='calendar-header' style={styles.header}>
          {decrement}
          <div className='calendar-title' style={styles.title}>
            {this.formatTitle(this.state.currentMonth)}
          </div>
          {increment}
        </div>
      );
    }
}
