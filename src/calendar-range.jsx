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
        this.setState({ endDate: day });
        this.props.onDateClick(this.state.beginningDate, day);
      }
      else {
        // they chose a date older than the beginning date,
        // we assume that this is still the range that they want,
        // so we flip the beginning and the end date
        this.setState({ beginningDate: day, endDate: this.state.beginningDate });
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
          this.setState({ beginningDate: day, endDate: null });
          this.props.onDateClick(day, null);
        }
      }
      else if (dateFns.compareAsc(day, this.state.endDate) === 1) {
        if (Math.abs(dateFns.differenceInCalendarDays(day, this.state.endDate)) < 3) {
          this.setState({ endDate: day });
          this.props.onDateClick(this.state.beginningDate, day);
        }
        else {
          // if its too far away, we assume they want to create a new range
          this.setState({ beginningDate: day, endDate: null });
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
            endDate: closestIndex === 1 ? day : selectedArray[1]
          };
          this.setState({...selected});
          this.props.onDateClick(selected.beginningDate, selected.endDate);
        }
        else {
          // if its too far away, we assume they want to create a new range
          this.setState({ beginningDate: day, endDate: null });
          this.props.onDateClick(day, null);
        }
      }
    }
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
    styles.title.display = 'none';  // hide original title
    styles.months = {
      display: 'flex',
      flexDirection: 'row'
    }
    styles.month = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      height: '100%'
    }
    return styles;
  }

  render() {
    const styles = this.getStyles();
    const header = this.renderHeader(styles);
    const nextMonth = this.getNextMonth();
    return (
      <div style={this.props.style}>
        {header}
        <div className='calendar-months' style={styles.months}>
          <div style={{...styles.month, marginRight: '15px'}}>
            <div className='calendar-title'>{dateFns.format(this.state.currentMonth, this.props.headerFormat)}</div>
            <Month
              currentMonth={this.state.currentMonth}
              selectedDates={[this.state.beginningDate, this.state.endDate]}
              onDateClick={this.onDateClick}
              showDisabledDates={this.props.showDisabledDates}
            />
          </div>
          <div style={styles.month}>
            <div className='calendar-title'>{dateFns.format(nextMonth, this.props.headerFormat)}</div>
            <Month
              currentMonth={nextMonth}
              selectedDates={[this.state.beginningDate, this.state.endDate]}
              onDateClick={this.onDateClick}
              showDisabledDates={this.props.showDisabledDates}
            />
          </div>
        </div>
      </div>
    )
  }
}
