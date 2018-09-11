import React from 'react';
import Calendar from '../src/calendar.jsx';

export default class App extends React.Component {
  render() {
    const selectedDate = new Date(2018, 1, 2)
    return (
      <Calendar
        selectedDate={selectedDate}
        onDateClick={(date) => {
          console.log('clicked');
          console.log(date);
        }}
        style={{height: '300px', width: '400px'}}
      />
   )
  }
}
