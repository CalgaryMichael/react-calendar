import React from 'react';
import BaseCalendar from './base-calendar.jsx';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';
import Month from './month.jsx';

export default class CalendarRange extends BaseCalendar {
  static propTypes = {
    beginningDate: PropTypes.instanceOf(Date),
    endDate: PropTypes.instanceOf(Date),
    headerFormat: PropTypes.string,
    onDateClick: PropTypes.func,
    onBeginningDateClick: PropTypes.func,
    onEndDateClick: PropTypes.func,
    style: PropTypes.object,
    showDisabledDates: PropTypes.bool
  };

  static defaultProps = {
    headerFormat: 'MMMM YYYY',
    showDisabledDates: true
  }

  constructor(props) {
    super(props);
    const currentMonth = props.beginningDate || new Date();
    this.state = {
      currentMonth,
      currentYear: dateFns.getYear(currentMonth),
      beginningDate: props.beginningDate,
      endDate: props.endDate,
      hoveredDate: null
    };
  }

  onDateClick = (day) => {
    if (!this.state.beginningDate) {
      // first click on a date
      this.setState({ beginningDate: day });
    }
    else if (!this.state.endDate) {
      // if we have a beginning date but no end date,
      // then we know they have set the range
      if (dateFns.differenceInCalendarDays(day, this.state.beginningDate) > 0) {
        this.setState({ endDate: day, hoveredDate: null });
        this.props.onDateClick(this.state.beginningDate, day);
      }
      else {
        // they chose a date older than the beginning date,
        // we assume that this is still the range that they want,
        // so we flip the beginning and the end date
        this.setState({
          beginningDate: day,
          endDate: this.state.beginningDate,
          hoveredDate: null
        });
        this.props.onDateClick(day, this.state.beginningDate);
      }
    }
    else {
      // they have already selected a range,
      // now they are wanting to alter the range
      if (dateFns.compareAsc(day, this.state.beginningDate) === -1) {
        if (Math.abs(dateFns.differenceInCalendarDays(day, this.state.beginningDate)) < 3) {
          this.setState({ beginningDate: day });
          this.props.onDateClick(day, this.state.endDate);
        }
        else {
          // if its too far away, we assume they want to create a new range
          this.setState({
            beginningDate: day,
            endDate: null,
            hoveredDate: null
          });
          this.props.onDateClick(day, null);
        }
      }
      else if (dateFns.compareAsc(day, this.state.endDate) === 1) {
        if (Math.abs(dateFns.differenceInCalendarDays(day, this.state.endDate)) < 3) {
          this.setState({ endDate: day, hoeveredDate: null });
          this.props.onDateClick(this.state.beginningDate, day);
        }
        else {
          // if its too far away, we assume they want to create a new range
          this.setState({
            beginningDate: day,
            endDate: null,
            hoveredDate: null
          });
          this.props.onDateClick(day, null);
        }
      }
      else {
        // they have selected a date within their current range
        const selectedArray = [this.state.beginningDate, this.state.endDate];
        const closestIndex = dateFns.closestIndexTo(day, selectedArray);
        if (Math.abs(dateFns.differenceInCalendarDays(day, selectedArray[closestIndex])) < 3) {
          const selected = {
            beginningDate: closestIndex === 0 ? day : selectedArray[0],
            endDate: closestIndex === 1 ? day : selectedArray[1],
            hoveredDate: null
          };
          this.setState({...selected});
          this.props.onDateClick(selected.beginningDate, selected.endDate);
        }
        else {
          // if its too far away, we assume they want to create a new range
          this.setState({
            beginningDate: day,
            endDate: null,
            hoveredDate: null
          });
          this.props.onDateClick(day, null);
        }
      }
    }
  }

  onDateMouseEnter = (day) => {
    if (this.state.beginningDate && !this.state.endDate) {
      this.setState({ hoveredDate: day });
    }
  }

  isDateSelected = (day) => {
    return dateFns.isSameDay(day, this.state.beginningDate) || dateFns.isSameDay(day, this.state.endDate);
  }

  isDateInRange = (day) => {
    if (this.state.beginningDate) {
      if (this.state.endDate) {
        return dateFns.isWithinRange(day, this.state.beginningDate, this.state.endDate)
      }
      else if (this.state.hoveredDate) {
        const isSameDay = dateFns.isSameDay(day, this.state.hoveredDate);
        if (dateFns.differenceInCalendarDays(this.state.hoveredDate, this.state.beginningDate) < 0) {
          return isSameDay || dateFns.isWithinRange(day, this.state.hoveredDate, this.state.beginningDate);
        }
        else {
          return isSameDay || dateFns.isWithinRange(day, this.state.beginningDate, this.state.hoveredDate);
        }
      }
    }
    return false;
  }

  getNextMonth = () => {
    return dateFns.addMonths(this.state.currentMonth, 1);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.beginningDate != prevProps.beginningDate || this.props.endDate != prevProps.endDate) {
      this.setState({
        beginningDate: this.props.beginningDate,
        endDate: this.props.endDate
      });
    }
  }

  getStyles() {
    const styles = super.getStyles();
    styles.chevron.position = 'absolute';
    styles.chevronLeft = {
      ...styles.chevron,
      left: '10px'
    };
    styles.chevronRight = {
      ...styles.chevron,
      right: '10px'
    };
    styles.months = {
      display: 'flex',
      flexDirection: 'row',
      position: 'relative',
      width: '100%',
      height: '100%'
    };
    styles.monthOuter = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      height: '100%'
    };
    styles.month = {
      width: 'unset',
      height: 'unset'
    }
    styles.day = {
      width: '40px',
      height: '40px',
      textAlign: 'center'
    }
    return styles;
  }

  render() {
    const styles = this.getStyles();
    const nextMonth = this.getNextMonth();
    return (
      <div style={this.props.style}>
        <div className='calendar-months' style={styles.months}>
          <div style={styles.monthOuter}>
            <div className='calendar-month-decrement' style={styles.chevronLeft} onClick={this.prevMonth}>
              <i className='fa fa-chevron-left' />
            </div>
            <div className='calendar-title'>{dateFns.format(this.state.currentMonth, this.props.headerFormat)}</div>
            <Month
              currentMonth={this.state.currentMonth}
              isDateSelected={this.isDateSelected}
              isDateInRange={this.isDateInRange}
              onDateClick={this.onDateClick}
              onDateMouseEnter={this.onDateMouseEnter}
              showDisabledDates={this.props.showDisabledDates}
              style={styles.month}
              dayStyle={styles.day}
            />
          </div>
          <div style={styles.monthOuter}>
            <div className='calendar-month-increment' style={styles.chevronRight} onClick={this.nextMonth}>
              <i className='fa fa-chevron-right' />
            </div>
            <div className='calendar-title'>{dateFns.format(nextMonth, this.props.headerFormat)}</div>
            <Month
              currentMonth={nextMonth}
              isDateSelected={this.isDateSelected}
              isDateInRange={this.isDateInRange}
              onDateClick={this.onDateClick}
              onDateMouseEnter={this.onDateMouseEnter}
              showDisabledDates={this.props.showDisabledDates}
              style={styles.month}
              dayStyle={styles.day}
            />
          </div>
        </div>
      </div>
    )
  }
}
