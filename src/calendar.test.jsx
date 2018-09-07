import React from 'react';
import Calendar from './calendar';
import { shallow, mount } from 'enzyme';

describe('Calendar Test', () => {
  describe('Calendar.mapMonth', () => {
    it('new mapping', () => {
      const props = {
        selectedDate: new Date(2017, 1, 1),
        onDateClick: () => {}
      }
      const calendar = new Calendar(props);
      const received = calendar.mapMonth(new Date(2018, 0, 12));

      expect(received.monthStart).toEqual(new Date(2018, 0, 1, 0, 0, 0));
      expect(received.monthEnd).toEqual(new Date(2018, 0, 31, 23, 59, 59, 999));
    });

    it('old mapping', () => {
      // pulls from the state if we already have the mapping
      const props = {
        selectedDate: new Date(2017, 1, 1),
        onDateClick: () => {}
      }
      const calendar = new Calendar(props);

      const expectedStart = 'this if a fake start date';
      const expectedEnd = 'this is a fake end date';
      calendar.state.monthMapping = {
        2018: {
          0: { monthStart: expectedStart, monthEnd: expectedEnd }
        }
      }

      const received = calendar.mapMonth(new Date(2018, 0, 12));
      expect(received.monthStart).toEqual(expectedStart);
      expect(received.monthEnd).toEqual(expectedEnd);
    });
  });

  describe('Calendar.nextMonth', () => {
    it('simple', () => {
      const selectedDate = new Date(2018, 0, 12);
      const props = {
        selectedDate,
        onDateClick: () => {}
      };

      // starting state
      const calendar = shallow(<Calendar {...props} />);
      const startingState = {
        currentMonth: selectedDate,
        monthMapping: {
          '2018': {
            '0': {
              monthStart: new Date(2018, 0, 1),
              monthEnd: new Date(2018, 0, 31, 23, 59, 59, 999)
            }
          }
        }
      }
      expect(calendar.state()).toEqual(startingState);

      // state after calling 'nextMonth()'
      calendar.instance().nextMonth();
      const expectedState = {
        ...startingState,
        currentMonth: new Date(2018, 1, 12),
        monthMapping: {
          ...startingState.monthMapping,
          '2018': {
            ...startingState.monthMapping['2018'],
            '1': {
              monthStart: new Date(2018, 1, 1),
              monthEnd: new Date(2018, 1, 28, 23, 59, 59, 999)
            }
          }
        }
      };
      expect(calendar.state()).toEqual(expectedState);
    });
  });

  describe('Calendar.prevMonth', () => {
    it('simple', () => {
      const selectedDate = new Date(2018, 0, 12);
      const props = {
        selectedDate,
        onDateClick: () => {}
      };

      // starting state
      const calendar = shallow(<Calendar {...props} />);
      const startingState = {
        currentMonth: selectedDate,
        monthMapping: {
          '2018': {
            '0': {
              monthStart: new Date(2018, 0, 1),
              monthEnd: new Date(2018, 0, 31, 23, 59, 59, 999)
            }
          }
        }
      }
      expect(calendar.state()).toEqual(startingState);

      // state after calling 'prevMonth()'
      calendar.instance().prevMonth();
      const expectedState = {
        ...startingState,
        currentMonth: new Date(2017, 11, 12),
        monthMapping: {
          ...startingState.monthMapping,
          '2017': {
            '11': {
              monthStart: new Date(2017, 11, 1),
              monthEnd: new Date(2017, 11, 31, 23, 59, 59, 999)
            }
          }
        }
      };
      expect(calendar.state()).toEqual(expectedState);
    });
  });
});
