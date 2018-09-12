import React from 'react';
import Calendar from '../src/calendar.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      beginningDate: null,
      endDate: null,
      selectedDate: undefined
    };
  }

  onDateClick = (selectedDate) => {
    this.setState({ selectedDate });
  }

  render() {
    return (
      <Calendar
        {...this.state}
        onDateClick={this.onDateClick}
        style={{height: '550px', width: '750px'}}
        showDisabledDates={true}
      />
   )
  }
}
