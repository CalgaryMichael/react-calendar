import React from 'react';
import Calendar from './calendar';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import dateFns from 'date-fns';

describe('Calendar Test', () => {
  describe('Calendar.constructor', () => {
    it('with date provided', () => {
      const selectedDate = new Date(2017, 1, 1);
      const props = { selectedDate };
      const calendar = shallow(<Calendar {...props} />);

      const expectedState = {
        currentMonth: selectedDate,
        currentYear: 2017
      };
      expect(calendar.state()).toEqual(expectedState);
    });

    it('without date provided', () => {
      const mockToday = new Date(2017, 1, 1);
      const calendar = shallow(<Calendar />);

      const expectedDate = new Date();
      const actualState = calendar.state();
      expect(dateFns.getDate(actualState.currentMonth)).toEqual(dateFns.getDate(expectedDate))
      expect(actualState.currentYear).toEqual(dateFns.getYear(expectedDate));
    });
  });

  describe('Calendar.nextMonth', () => {
    it('simple', () => {
      const selectedDate = new Date(2018, 0, 12);
      const props = { selectedDate };

      // starting state
      const calendar = shallow(<Calendar {...props} />);
      const startingState = {
        currentMonth: selectedDate,
        currentYear: 2018
      }
      expect(calendar.state()).toEqual(startingState);

      // state after calling 'nextMonth()'
      calendar.instance().nextMonth();
      const expectedState = {
        ...startingState,
        currentMonth: new Date(2018, 1, 12),
        currentYear: 2018
      };
      expect(calendar.state()).toEqual(expectedState);
    });
  });

  describe('Calendar.prevMonth', () => {
    it('simple', () => {
      const selectedDate = new Date(2018, 0, 12);
      const props = { selectedDate };

      // starting state
      const calendar = shallow(<Calendar {...props} />);
      const startingState = {
        currentMonth: selectedDate,
        currentYear: 2018
      }
      expect(calendar.state()).toEqual(startingState);

      // state after calling 'prevMonth()'
      calendar.instance().prevMonth();
      const expectedState = {
        ...startingState,
        currentMonth: new Date(2017, 11, 12),
        currentYear: 2017
      };
      expect(calendar.state()).toEqual(expectedState);
    });
  });
});
