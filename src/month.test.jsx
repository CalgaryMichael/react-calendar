import React from 'react';
import Month from './month.jsx';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import dateFns from 'date-fns';

describe('Month Tests', () => {
  describe('Month.getMonthInfo', () => {
    it('simple', () => {
      const props = { currentMonth: new Date(2018, 0, 12) };
      const month = new Month(props);

      const expectedInfo = {
        monthStart: new Date(2018, 0, 1),
        monthEnd: new Date(2018, 0, 31, 23, 59, 59, 999),
        startDate: new Date(2017, 11, 31),
        endDate: new Date(2018, 1, 3, 23, 59, 59, 999)
      };
      expect(month.getMonthInfo()).toEqual(expectedInfo);
    });
  });

  describe('Month.generateWeeks', () => {
    let differenceStub;
    beforeEach(() => {
      differenceStub = sinon.stub(dateFns, 'differenceInCalendarWeeks');
    });

    afterEach(() => {
      differenceStub.restore();
    });

    it('simple', () => {
      const props = { currentMonth: new Date(2018, 0, 12) };
      const month = new Month(props);

      differenceStub.returns(10);
      const weeks = month.generateWeeks();
      expect(weeks.length).toBe(11);
    });
  });

  describe('Month.renderDaysHeader', () => {
    it('default header format', () => {
      const props = {
        currentMonth: new Date(2018, 0, 1),
        headerFormat: Month.defaultProps.headerFormat
      };
      const month = shallow(<Month {...props} />);
      const header = month.find('tr.calendar-days-header');

      expect(header.children().length).toBe(7);
      expect(header.children().first().text()).toBe('Sun');
    });

    it('custom header format', () => {
      const props = {
        currentMonth: new Date(2018, 0, 1),
        headerFormat: 'dddd'
      };
      const month = new Month(props);
      const header = shallow(month.renderDaysHeader({}));

      expect(header.children().length).toBe(7);
      expect(header.children().first().text()).toBe('Sunday');
    });
  });
});
