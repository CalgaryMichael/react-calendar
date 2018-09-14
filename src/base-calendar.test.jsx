import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import BaseCalendar from './base-calendar.jsx';

describe('BaseCalendar Tests', () => {
  describe('BaseCalendar.getStyles', () => {
    it('decrement hover', () => {
      const calendar = new BaseCalendar({});
      calendar.state = {
        decrementHover: false
      };
      expect(calendar.getStyles().chevronLeft.opacity).toEqual(undefined);

      calendar.state = {
        decrementHover: true
      };
      expect(calendar.getStyles().chevronLeft.opacity).toEqual(0.5);
    });

    it('increment hover', () => {
      const calendar = new BaseCalendar({});
      calendar.state = {
        incrementHover: false
      };
      expect(calendar.getStyles().chevronRight.opacity).toEqual(undefined);

      calendar.state = {
        incrementHover: true
      };
      expect(calendar.getStyles().chevronRight.opacity).toEqual(0.5);
    });
  });

  describe('BaseCalendar.nextMonth', () => {
    it('simple', () => {
      const calendar = new BaseCalendar({});
      calendar.state = { currentMonth: new Date(2018, 0, 1), currentYear: 2018 };
      const stub = sinon.stub(calendar, 'setState');

      calendar.nextMonth();
      expect(stub.calledWith({ currentMonth: new Date(2018, 1, 1), currentYear: 2018 })).toBe(true);
      stub.restore();
    });
  });

  describe('BaseCalendar.prevMonth', () => {
    it('simple', () => {
      const calendar = new BaseCalendar({});
      calendar.state = { currentMonth: new Date(2018, 0, 1), currentYear: 2018 };
      const stub = sinon.stub(calendar, 'setState');

      calendar.prevMonth();
      expect(stub.calledWith({ currentMonth: new Date(2017, 11, 1), currentYear: 2017 })).toBe(true);
      stub.restore();
    });
  });

  describe('BaseCalendar.incrementMouseEnter', () => {
    it('simple', () => {
      const calendar = new BaseCalendar({});
      const stub = sinon.stub(calendar, 'setState');

      calendar.incrementMouseEnter();
      expect(stub.calledWith({ incrementHover: true })).toBe(true);
      stub.restore();
    });
  });

  describe('BaseCalendar.incrementMouseLeave', () => {
    it('simple', () => {
      const calendar = new BaseCalendar({});
      const stub = sinon.stub(calendar, 'setState');

      calendar.incrementMouseLeave();
      expect(stub.calledWith({ incrementHover: false })).toBe(true);
      stub.restore();
    });
  });

  describe('BaseCalendar.decrementMouseEnter', () => {
    it('simple', () => {
      const calendar = new BaseCalendar({});
      const stub = sinon.stub(calendar, 'setState');

      calendar.decrementMouseEnter();
      expect(stub.calledWith({ decrementHover: true })).toBe(true);
      stub.restore();
    });
  });

  describe('BaseCalendar.decrementMouseLeave', () => {
    it('simple', () => {
      const calendar = new BaseCalendar({});
      const stub = sinon.stub(calendar, 'setState');

      calendar.decrementMouseLeave();
      expect(stub.calledWith({ decrementHover: false })).toBe(true);
      stub.restore();
    });
  });

  describe('BaseCalendar.renderDecrement', () => {
    it('onClick', () => {
      const styles = {chevronLeft: {}}
      const calendar = new BaseCalendar({});
      const spy = sinon.spy();
      calendar.prevMonth = spy;

      const decrement = shallow(calendar.renderDecrement(styles));
      decrement.simulate('click');
      expect(spy.called).toBe(true);
    });

    it('onMouseEnter', () => {
      const styles = {chevronLeft: {}}
      const calendar = new BaseCalendar({});
      const spy = sinon.spy();
      calendar.decrementMouseEnter = spy;

      const decrement = shallow(calendar.renderDecrement(styles));
      decrement.simulate('mouseenter');
      expect(spy.called).toBe(true);
    });

    it('onMouseLeave', () => {
      const styles = {chevronLeft: {}}
      const calendar = new BaseCalendar({});
      const spy = sinon.spy();
      calendar.decrementMouseLeave = spy;

      const decrement = shallow(calendar.renderDecrement(styles));
      decrement.simulate('mouseleave');
      expect(spy.called).toBe(true);
    });
  });

  describe('BaseCalendar.renderIncrement', () => {
    it('onClick', () => {
      const styles = {chevronRight: {}}
      const calendar = new BaseCalendar({});
      const spy = sinon.spy();
      calendar.nextMonth = spy;

      const increment = shallow(calendar.renderIncrement(styles));
      increment.simulate('click');
      expect(spy.called).toBe(true);
    });

    it('onMouseEnter', () => {
      const styles = {chevronRight: {}}
      const calendar = new BaseCalendar({});
      const spy = sinon.spy();
      calendar.incrementMouseEnter = spy;

      const increment = shallow(calendar.renderIncrement(styles));
      increment.simulate('mouseenter');
      expect(spy.called).toBe(true);
    });

    it('onMouseLeave', () => {
      const styles = {chevronRight: {}}
      const calendar = new BaseCalendar({});
      const spy = sinon.spy();
      calendar.incrementMouseLeave = spy;

      const increment = shallow(calendar.renderIncrement(styles));
      increment.simulate('mouseleave');
      expect(spy.called).toBe(true);
    });
  });
});
