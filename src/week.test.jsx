import React from 'react';
import Week from './week.jsx';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import dateFns from 'date-fns';

describe('Week Tests', () => {
  describe('Week.generateDays', () => {
    it('simple', () => {
      const props = {
        ...Week.defaultProps,
        startDay: new Date(2017, 11, 31),
        monthStart: new Date(2018, 0, 1),
        isDateSelected: (day) => dateFns.isSameDay(day, new Date(2018, 0, 1))
      };
      const week = new Week(props);
      const days = week.generateDays();
      expect(days.length).toBe(7);

      expect(days[0].props.day).toEqual(props.startDay);
      expect(days[0].props.disabled).toEqual(true);
      expect(days[0].props.selected).toEqual(false);

      expect(days[1].props.day).toEqual(props.monthStart);
      expect(days[1].props.disabled).toEqual(false);
      expect(days[1].props.selected).toEqual(true);
    });
  });
});
