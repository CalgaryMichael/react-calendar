import React from 'react';
import CalendarRange from '../src/calendar-range.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      beginningDate: null,
      endDate: null
    };
  }

  onDateClick = (beginningDate, endDate) => {
    this.setState({ beginningDate, endDate });
  }

  render() {
    return (
      <CalendarRange
        {...this.state}
        onDateClick={this.onDateClick}
        style={{height: '350px', width: '550px'}}
      />
   )
  }
}
