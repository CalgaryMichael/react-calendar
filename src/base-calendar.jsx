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
  
    renderHeader(styles) {
      return (
        <div className='calendar-header' style={styles.header}>
          <div className='calendar-month-decrement' style={styles.chevron} onClick={this.prevMonth}>
            <i className='fa fa-chevron-left' />
          </div>
          <div className='calendar-title' style={styles.title}>
            {dateFns.format(this.state.currentMonth, this.props.headerFormat)}
          </div>
          <div className='calendar-month-increment' style={styles.chevron} onClick={this.nextMonth}>
            <i className='fa fa-chevron-right' />
          </div>
        </div>
      );
    }
}
