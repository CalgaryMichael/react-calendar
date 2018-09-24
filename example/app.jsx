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

  // onDateClick = (beginningDate, endDate) => {
  //   this.setState({ beginningDate, endDate });
  // }

  onDateClick = (selectedDate) => {
    this.setState({ selectedDate });
  }

  render() {
    return (
      <Calendar
        {...this.state}
        onDateClick={this.onDateClick}
        style={{height: '450px', width: '650px', overflowX: 'hidden'}}
        showSurplusDates={false}
      />
   )
  }
}
