import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import CalendarRange from './calendar-range.jsx';
import dateFns from 'date-fns';

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

    describe('younger than beginning date selected', () => {
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
      it('same day as beginning', () => {
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

        const day3 = new Date(2018, 0, 1);
        calendar.instance().onDateClick(day3);
        expect(clickSpy.calledWith(day3, null)).toBe(true);
        expect(calendar.state().beginningDate).toBe(day3);
        expect(calendar.state().endDate).toBe(null);
      });

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

      it('same day as end', () => {
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

        const day3 = new Date(2018, 0, 15);
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

      it('more than 2 day difference from end', () => {
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

  describe('CalendarRange.onDateMouseEnter', () => {
    it('no beginning or end date', () => {
      const props = {
        beginningDate: null,
        endDate: null
      };
      const calendar = shallow(<CalendarRange {...props} />);

      let state = calendar.state();
      expect(state.beginningDate).toBe(null);
      expect(state.endDate).toBe(null);
      expect(state.hoveredDate).toBe(null);

      const hoveredDay = new Date(2018, 0, 1);
      calendar.instance().onDateMouseEnter(hoveredDay);

      state = calendar.state();
      expect(state.beginningDate).toBe(null);
      expect(state.endDate).toBe(null);
      expect(state.hoveredDate).toBe(null);
    });

    it('no end date', () => {
      const beginningDate = new Date(2018, 0, 1);
      const props = {
        beginningDate,
        endDate: null
      };
      const calendar = shallow(<CalendarRange {...props} />);

      let state = calendar.state();
      expect(state.beginningDate).toBe(beginningDate);
      expect(state.endDate).toBe(null);
      expect(state.hoveredDate).toBe(null);

      const hoveredDay = new Date(2018, 0, 5);
      calendar.instance().onDateMouseEnter(hoveredDay);

      state = calendar.state();
      expect(state.beginningDate).toBe(beginningDate);
      expect(state.endDate).toBe(null);
      expect(state.hoveredDate).toBe(hoveredDay);
    });

    it('with beginning and end date', () => {
      const beginningDate = new Date(2018, 0, 1);
      const endDate = new Date(2018, 0, 12);
      const props = {
        beginningDate,
        endDate
      };
      const calendar = shallow(<CalendarRange {...props} />);

      let state = calendar.state();
      expect(state.beginningDate).toBe(beginningDate);
      expect(state.endDate).toBe(endDate);
      expect(state.hoveredDate).toBe(null);

      const hoveredDay = new Date(2018, 0, 5);
      calendar.instance().onDateMouseEnter(hoveredDay);

      state = calendar.state();
      expect(state.beginningDate).toBe(beginningDate);
      expect(state.endDate).toBe(endDate);
      expect(state.hoveredDate).toBe(null);
    });
  });

  describe('CalendarRange.isDateDisabled', () => {
    it('date too young', () => {
      const day = dateFns.subDays(new Date(), 1);
      const calendar = new CalendarRange({});
      expect(calendar.isDateDisabled(day)).toBe(true);
    });

    it('same day', () => {
      const day = new Date();
      const calendar = new CalendarRange({});
      expect(calendar.isDateDisabled(day)).toBe(true);
    });

    it('date in the future', () => {
      const day = dateFns.addDays(new Date(), 1);
      const calendar = new CalendarRange({});
      expect(calendar.isDateDisabled(day)).toBe(false);
    });
  });

  describe('CalendarRange.isDateSelected', () => {
    it('no beginning or end date', () => {
      const calendar = new CalendarRange({});
      calendar.state = {
        beginningDate: null,
        endDate: null
      };
      const day = new Date(2018, 0, 1);
      expect(calendar.isDateSelected(day)).toBe(false);
    });

    it('matches beginning date', () => {
      const calendar = new CalendarRange({});
      calendar.state = {
        beginningDate: new Date(2018, 0, 1),
        endDate: new Date(2018, 0, 15)
      };
      const day = new Date(2018, 0, 1);
      expect(calendar.isDateSelected(day)).toBe(true);
    });

    it('matches end date', () => {
      const calendar = new CalendarRange({});
      calendar.state = {
        beginningDate: new Date(2018, 0, 1),
        endDate: new Date(2018, 0, 15)
      };
      const day = new Date(2018, 0, 15);
      expect(calendar.isDateSelected(day)).toBe(true);
    });

    it('does not match either date', () => {
      const calendar = new CalendarRange({});
      calendar.state = {
        beginningDate: new Date(2018, 0, 1),
        endDate: new Date(2018, 0, 15)
      };
      const day = new Date(2018, 0, 2);
      expect(calendar.isDateSelected(day)).toBe(false);
    });
  });

  describe('CalendarRange.isDateInRange', () => {
    it('no selected dates', () => {
      const state = {
        beginningDate: null,
        endDate: null,
        hoveredDate: null
      };
      const calendar = new CalendarRange({});
      calendar.state = state;

      const day = new Date(2018, 0, 5);
      expect(calendar.isDateInRange(day)).toBe(false);
    });

    it('both selected dates', () => {
      const state = {
        beginningDate: new Date(2018, 0, 1),
        endDate: new Date(2018, 0, 10),
        hoveredDate: null
      };
      const calendar = new CalendarRange({});
      calendar.state = state;

      const day = new Date(2018, 0, 5);
      expect(calendar.isDateInRange(day)).toBe(true);
    });

    describe('beginning date selected', () => {
      it('same as end range', () => {
        const day = new Date(2018, 0, 5);
        const state = {
          beginningDate: new Date(2018, 0, 1),
          endDate: null,
          hoveredDate: day
        };
        const calendar = new CalendarRange({});
        calendar.state = state;

        expect(calendar.isDateInRange(day)).toBe(true);
      });

      it('between beginning date and end range', () => {
        const state = {
          beginningDate: new Date(2018, 0, 1),
          endDate: null,
          hoveredDate: new Date(2018, 0, 10)
        };
        const calendar = new CalendarRange({});
        calendar.state = state;

        const day = new Date(2018, 0, 5);
        expect(calendar.isDateInRange(day)).toBe(true);
      });

      it('after end range', () => {
        const state = {
          beginningDate: new Date(2018, 0, 1),
          endDate: null,
          hoveredDate: new Date(2018, 0, 10)
        };
        const calendar = new CalendarRange({});
        calendar.state = state;

        const day = new Date(2018, 0, 15);
        expect(calendar.isDateInRange(day)).toBe(false);
      });

      it('before beginning date and end range', () => {
        const state = {
          beginningDate: new Date(2018, 0, 1),
          endDate: null,
          hoveredDate: new Date(2018, 0, 10)
        };
        const calendar = new CalendarRange({});
        calendar.state = state;

        const day = new Date(2017, 11, 15);
        expect(calendar.isDateInRange(day)).toBe(false);
      });
    });
  });

  describe('CalendarRange.getStyles', () => {
    it('increment and decrement enabled', () => {
      const calendar = new CalendarRange({});
      calendar.state.disableDecrement = false;
      const styles = calendar.getStyles();
      expect(styles.chevronLeft.opacity).toBe(undefined);
      expect(styles.chevronRight.opacity).toBe(undefined);
    });

    it('decrement disabled', () => {
      const calendar = new CalendarRange({});
      calendar.state.disableDecrement = true;
      const styles = calendar.getStyles();
      expect(styles.chevronLeft.opacity).toBe(0.5);
      expect(styles.chevronRight.opacity).toBe(undefined);
    });

    it('increment disabled', () => {
      const calendar = new CalendarRange({});
      calendar.state.disableIncrement = true;
      const styles = calendar.getStyles();
      expect(styles.chevronLeft.opacity).toBe(undefined);
      expect(styles.chevronRight.opacity).toBe(0.5);
    });
  });
});
