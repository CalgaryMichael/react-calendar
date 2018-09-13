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
    showSurplusDates: PropTypes.bool,
    futureMonthLimit: PropTypes.number,
    pastMonthLimit: PropTypes.number
  };

  static defaultProps = {
    headerFormat: 'MMMM YYYY',
    showSurplusDates: true,
    pastMonthLimit: 1
  }

  constructor(props) {
    super(props);
    const currentMonth = props.beginningDate || new Date();
    this.state = {
      currentMonth,
      currentYear: dateFns.getYear(currentMonth),
      beginningDate: props.beginningDate,
      endDate: props.endDate,
      hoveredDate: null,
      incrementHover: false,
      decrementHover: false,
      disableDecrement: false
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
      const compareBeg = dateFns.compareAsc(day, this.state.beginningDate);
      const compareEnd = dateFns.compareAsc(day, this.state.endDate);
      if (compareBeg === 0) {
        // they clicked previously selected beginning date
        // so we assume they want to begin a new date range
        // starting from this day
        this.setState({ beginningDate: day, endDate: null });
        this.props.onDateClick(day, null);
      }
      else if (compareBeg === -1) {
        // they have clicked on a date before the selected beginning
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
      else if (compareEnd === 0) {
        // they clicked previously selected end date
        // so we assume they want to begin a new date range
        // starting from this day
        this.setState({ beginningDate: day, endDate: null });
        this.props.onDateClick(day, null);
      }
      else if (compareEnd === 1) {
        // they have clicked on a date after the selected end
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

  isDateDisabled = (day) => {
    return dateFns.compareAsc(day, new Date) < 1;
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

  nextMonth = () => {
    if (!this.state.disableIncrement) {
      const currentMonth = dateFns.addMonths(this.state.currentMonth, 1);
      const currentYear = dateFns.getYear(currentMonth);
      const monthDifference = dateFns.differenceInCalendarMonths(new Date(), currentMonth);
      this.setState({
        disableIncrement: this.props.futureMonthLimit != null && monthDifference <= this.props.futureMonthLimit,
        disableDecrement: false,
        currentMonth,
        currentYear
      });
    }
  };

  prevMonth = () => {
    if (!this.state.disableDecrement) {
      const currentMonth = dateFns.subMonths(this.state.currentMonth, 1);
      const currentYear = dateFns.getYear(currentMonth);
      const monthDifference = dateFns.differenceInCalendarMonths(new Date(), currentMonth);
      this.setState({
        disableIncrement: false,
        disableDecrement: this.props.pastMonthLimit != null && monthDifference >= this.props.pastMonthLimit,
        currentMonth,
        currentYear
      });
    }
  };

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
    styles.chevronLeft = {
      ...styles.chevronLeft,
      position: 'absolute',
      left: '10px'
    };
    if (this.state.disableDecrement) {
      styles.chevronLeft.opacity = 0.5;
    }
    styles.chevronRight = {
      ...styles.chevronRight,
      position: 'absolute',
      right: '10px'
    };
    if (this.state.disableIncrement) {
      styles.chevronRight.opacity = 0.5;
    }
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
    const increment = this.renderIncrement(styles);
    const decrement = this.renderDecrement(styles);
    return (
      <div style={this.props.style}>
        <div className='calendar-months' style={styles.months}>
          <div style={styles.monthOuter}>
            {decrement}
            <div className='calendar-title'>
              {this.formatTitle(this.state.currentMonth)}
            </div>
            <Month
              currentMonth={this.state.currentMonth}
              isDateDisabled={this.isDateDisabled}
              isDateSelected={this.isDateSelected}
              isDateInRange={this.isDateInRange}
              onDateClick={this.onDateClick}
              onDateMouseEnter={this.onDateMouseEnter}
              showSurplusDates={this.props.showSurplusDates}
              style={styles.month}
              dayStyle={styles.day}
            />
          </div>
          <div style={styles.monthOuter}>
            {increment}
            <div className='calendar-title'>
              {this.formatTitle(nextMonth)}
            </div>
            <Month
              currentMonth={nextMonth}
              isDateDisabled={this.isDateDisabled}
              isDateSelected={this.isDateSelected}
              isDateInRange={this.isDateInRange}
              onDateClick={this.onDateClick}
              onDateMouseEnter={this.onDateMouseEnter}
              showSurplusDates={this.props.showSurplusDates}
              style={styles.month}
              dayStyle={styles.day}
            />
          </div>
        </div>
      </div>
    )
  }
}
