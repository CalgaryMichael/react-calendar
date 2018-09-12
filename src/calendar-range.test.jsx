import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import CalendarRange from './calendar-range.jsx';

describe('CalendarRange Tests', () => {
  describe('CalendarRange.onDateClick', () => {
    it('no dates selected', () => {
      const clickSpy = sinon.spy();
      const props = {
        beginningDate: null,
        endDate: null,
        onDateClick: clickSpy
      };
      const calendar = shallow(<CalendarRange {...props} />);
      expect(calendar.state().beginningDate).toBe(null);
      expect(calendar.state().endDate).toBe(null);

      const day = new Date(2018, 0, 1);
      calendar.instance().onDateClick(day);
      expect(clickSpy.callCount).toBe(0);
      expect(calendar.state().beginningDate).toBe(day);
      expect(calendar.state().endDate).toBe(null);
    });

    it('beginning date selected', () => {
      const clickSpy = sinon.spy();
      const day1 = new Date(2018, 0, 1);
      const props = {
        beginningDate: day1,
        endDate: null,
        onDateClick: clickSpy
      };
      const calendar = shallow(<CalendarRange {...props} />);
      expect(calendar.state().beginningDate).toBe(day1);
      expect(calendar.state().endDate).toBe(null);

      const day2 = new Date(2018, 0, 5);
      calendar.instance().onDateClick(day2);
      expect(clickSpy.calledWith(day1, day2)).toBe(true);
      expect(calendar.state().beginningDate).toBe(day1);
      expect(calendar.state().endDate).toBe(day2);
    });

    describe('older than beginning date selected', () => {
      it('no end date', () => {
        const clickSpy = sinon.spy();
        const day1 = new Date(2018, 0, 1);
        const props = {
          beginningDate: day1,
          endDate: null,
          onDateClick: clickSpy
        };
        const calendar = shallow(<CalendarRange {...props} />);
        expect(calendar.state().beginningDate).toBe(day1);
        expect(calendar.state().endDate).toBe(null);

        const day2 = new Date(2017, 11, 20);
        calendar.instance().onDateClick(day2);
        expect(clickSpy.calledWith(day2, day1)).toBe(true);
        expect(calendar.state().beginningDate).toBe(day2);
        expect(calendar.state().endDate).toBe(day1);
      });

      it('less than 2 day difference', () => {
        const clickSpy = sinon.spy();
        const day1 = new Date(2018, 0, 5);
        const day2 = new Date(2018, 0, 15);
        const props = {
          beginningDate: day1,
          endDate: day2,
          onDateClick: clickSpy
        };
        const calendar = shallow(<CalendarRange {...props} />);
        expect(calendar.state().beginningDate).toBe(day1);
        expect(calendar.state().endDate).toBe(day2);

        const day3 = new Date(2018, 0, 3);
        calendar.instance().onDateClick(day3);
        expect(clickSpy.calledWith(day3, day2)).toBe(true);
        expect(calendar.state().beginningDate).toBe(day3);
        expect(calendar.state().endDate).toBe(day2);
      });

      it('more than 2 day difference', () => {
        const clickSpy = sinon.spy();
        const day1 = new Date(2018, 0, 5);
        const day2 = new Date(2018, 0, 15);
        const props = {
          beginningDate: day1,
          endDate: day2,
          onDateClick: clickSpy
        };
        const calendar = shallow(<CalendarRange {...props} />);
        expect(calendar.state().beginningDate).toBe(day1);
        expect(calendar.state().endDate).toBe(day2);

        const day3 = new Date(2018, 0, 1);
        calendar.instance().onDateClick(day3);
        expect(clickSpy.calledWith(day3, null)).toBe(true);
        expect(calendar.state().beginningDate).toBe(day3);
        expect(calendar.state().endDate).toBe(null);
      });
    });

    describe('older than end date selected', () => {
      it('less than 2 day difference', () => {
        const clickSpy = sinon.spy();
        const day1 = new Date(2018, 0, 1);
        const day2 = new Date(2018, 0, 15);
        const props = {
          beginningDate: day1,
          endDate: day2,
          onDateClick: clickSpy
        };
        const calendar = shallow(<CalendarRange {...props} />);
        expect(calendar.state().beginningDate).toBe(day1);
        expect(calendar.state().endDate).toBe(day2);

        const day3 = new Date(2018, 0, 16);
        calendar.instance().onDateClick(day3);
        expect(clickSpy.calledWith(day1, day3)).toBe(true);
        expect(calendar.state().beginningDate).toBe(day1);
        expect(calendar.state().endDate).toBe(day3);
      });

      it('more than 2 day difference', () => {
        const clickSpy = sinon.spy();
        const day1 = new Date(2018, 0, 1);
        const day2 = new Date(2018, 0, 15);
        const props = {
          beginningDate: day1,
          endDate: day2,
          onDateClick: clickSpy
        };
        const calendar = shallow(<CalendarRange {...props} />);
        expect(calendar.state().beginningDate).toBe(day1);
        expect(calendar.state().endDate).toBe(day2);

        const day3 = new Date(2018, 0, 20);
        calendar.instance().onDateClick(day3);
        expect(clickSpy.calledWith(day3, null)).toBe(true);
        expect(calendar.state().beginningDate).toBe(day3);
        expect(calendar.state().endDate).toBe(null);
      });
    });

    describe('click date within range', () => {
      it('less than 2 day difference from beginning', () => {
        const clickSpy = sinon.spy();
        const day1 = new Date(2018, 0, 1);
        const day2 = new Date(2018, 0, 15);
        const props = {
          beginningDate: day1,
          endDate: day2,
          onDateClick: clickSpy
        };
        const calendar = shallow(<CalendarRange {...props} />);
        expect(calendar.state().beginningDate).toBe(day1);
        expect(calendar.state().endDate).toBe(day2);

        const day3 = new Date(2018, 0, 2);
        calendar.instance().onDateClick(day3);
        expect(clickSpy.calledWith(day3, day2)).toBe(true);
        expect(calendar.state().beginningDate).toBe(day3);
        expect(calendar.state().endDate).toBe(day2);
      });

      it('more than 2 day difference from beginning', () => {
        const clickSpy = sinon.spy();
        const day1 = new Date(2018, 0, 1);
        const day2 = new Date(2018, 0, 15);
        const props = {
          beginningDate: day1,
          endDate: day2,
          onDateClick: clickSpy
        };
        const calendar = shallow(<CalendarRange {...props} />);
        expect(calendar.state().beginningDate).toBe(day1);
        expect(calendar.state().endDate).toBe(day2);

        const day3 = new Date(2018, 0, 5);
        calendar.instance().onDateClick(day3);
        expect(clickSpy.calledWith(day3, null)).toBe(true);
        expect(calendar.state().beginningDate).toBe(day3);
        expect(calendar.state().endDate).toBe(null);
      });

      it('less than 2 day difference from end', () => {
        const clickSpy = sinon.spy();
        const day1 = new Date(2018, 0, 1);
        const day2 = new Date(2018, 0, 15);
        const props = {
          beginningDate: day1,
          endDate: day2,
          onDateClick: clickSpy
        };
        const calendar = shallow(<CalendarRange {...props} />);
        expect(calendar.state().beginningDate).toBe(day1);
        expect(calendar.state().endDate).toBe(day2);

        const day3 = new Date(2018, 0, 14);
        calendar.instance().onDateClick(day3);
        expect(clickSpy.calledWith(day1, day3)).toBe(true);
        expect(calendar.state().beginningDate).toBe(day1);
        expect(calendar.state().endDate).toBe(day3);
      });

      it('more than 2 day difference from beginning', () => {
        const clickSpy = sinon.spy();
        const day1 = new Date(2018, 0, 1);
        const day2 = new Date(2018, 0, 15);
        const props = {
          beginningDate: day1,
          endDate: day2,
          onDateClick: clickSpy
        };
        const calendar = shallow(<CalendarRange {...props} />);
        expect(calendar.state().beginningDate).toBe(day1);
        expect(calendar.state().endDate).toBe(day2);

        const day3 = new Date(2018, 0, 12);
        calendar.instance().onDateClick(day3);
        expect(clickSpy.calledWith(day3, null)).toBe(true);
        expect(calendar.state().beginningDate).toBe(day3);
        expect(calendar.state().endDate).toBe(null);
      });
    });
  });
});
