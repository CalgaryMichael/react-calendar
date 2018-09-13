import React from 'react';
import Day from './day.jsx';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import dateFns from 'date-fns';

describe('Day Tests', () => {
  describe('Day.constructor', () => {
    let weekendStub;
    beforeEach(() => {
      weekendStub = sinon.stub(dateFns, 'isWeekend');
    });

    afterEach(() => {
      weekendStub.restore();
    });

    it('is not a weekend', () => {
      weekendStub.returns(false);
      const props = {day: new Date(2018, 1, 1)};
      const day = new Day(props);
      expect(day.state).toEqual({ isWeekend: false, hovered: false });
    });

    it('is a weekend', () => {
      weekendStub.returns(true);
      const props = {day: new Date(2018, 1, 1)};
      const day = new Day(props);
      expect(day.state).toEqual({ isWeekend: true, hovered: false });
    });
  });

  describe('Day.getStyles', () => {
    describe('weekend', () => {
      it('without highlighted weekends', () => {
        const props = {
          day: new Date(2018, 1, 1),
          higlightWeekend: false
        };
        const day = new Day(props);
        day.state.isWeekend = false;
        expect(day.getStyles().outer.backgroundColor).toBe(undefined);

        day.state.isWeekend = true;
        expect(day.getStyles().outer.backgroundColor).toBe(undefined);
      });

      it('with highlighted weekends', () => {
        const props = {
          day: new Date(2018, 1, 1),
          higlightWeekend: true
        };
        const day = new Day(props);
        day.state.isWeekend = false;
        expect(day.getStyles().outer.backgroundColor).toBe(undefined);

        day.state.isWeekend = true;
        expect(day.getStyles().outer.backgroundColor).toBe('#EEEEEE');
      });
    });

    it('is not disabled', () => {
      const props = {
        day: new Date(2018, 1, 1),
        disabled: false,
        selected: false,
        inRange: false
      };
      const day = new Day(props);
      expect(day.getStyles().date.color).toBe(undefined);
    });

    it('shows disabled', () => {
      const props = {
        day: new Date(2018, 1, 1),
        disabled: true,
        showDisabled: true,
        selected: false,
        inRange: false
      };
      const day = new Day(props);
      expect(day.getStyles().date.color).toBe('#AAAAAA');
    });

    it('does not show disabled', () => {
      const props = {
        day: new Date(2018, 1, 1),
        disabled: true,
        showDisabled: false,
        selected: false,
        inRange: false
      };
      const day = new Day(props);
      const styles = day.getStyles();
      expect(styles.outer.border).toBe('none');
      expect(styles.outer.backgroundColor).toBe('none');
      expect(styles.date.display).toBe('none');
    });

    it('is hovered', () => {
      const props = {
        day: new Date(2018, 1, 1),
        disabled: false,
        showDisabled: true,
        selected: false,
        inRange: false
      };
      const day = new Day(props);
      day.state.hovered = true;
      expect(day.getStyles().outer.backgroundColor).toBe('#e4e7e7');
    });

    it('is hovered and disabled', () => {
      const props = {
        day: new Date(2018, 1, 1),
        disabled: true,
        showDisabled: true,
        selected: false,
        inRange: false
      };
      const day = new Day(props);
      day.state.overed = true;
      expect(day.getStyles().date.color).toBe('#AAAAAA');
    });

    it('is selected', () => {
      const props = {
        day: new Date(2018, 1, 1),
        disabled: false,
        showDisabled: true,
        selected: true,
        inRange: false
      };
      const day = new Day(props);
      expect(day.getStyles().outer.backgroundColor).toBe('#FFE0B2');
    });

    it('is in range', () => {
      const props = {
        day: new Date(2018, 1, 1),
        disabled: false,
        showDisabled: true,
        selected: false,
        inRange: true
      };
      const day = new Day(props);
      expect(day.getStyles().outer.backgroundColor).toBe('#FFF3E0');
    });

    it('is in range and selected', () => {
      const props = {
        day: new Date(2018, 1, 1),
        disabled: false,
        showDisabled: true,
        selected: true,
        inRange: true
      };
      const day = new Day(props);
      expect(day.getStyles().outer.backgroundColor).toBe('#FFE0B2');
    });

    it('is disabled and selected and in range', () => {
      const props = {
        day: new Date(2018, 1, 1),
        disabled: true,
        showDisabled: true,
        selected: true,
        inRange: true
      };
      const day = new Day(props);
      expect(day.getStyles().date.color).toBe('#AAAAAA');
    });
  });

  describe('Day.getClassName', () => {
    it('weekend', () => {
      const props = {day: new Date(2018, 1, 1)};
      const day = new Day(props);
      day.state.isWeekend = false;
      expect(day.getClassName()).toBe('calendar-day');

      day.state.isWeekend = true;
      expect(day.getClassName()).toBe('calendar-day weekend');
    });

    it('is not disabled or selected', () => {
      const props = {
        day: new Date(2018, 1, 1),
        disabled: false,
        selected: false,
        inRange: false
      };
      const day = new Day(props);
      expect(day.getClassName()).toBe('calendar-day');
    });

    it('is disabled', () => {
      const props = {
        day: new Date(2018, 1, 1),
        disabled: true,
        selected: false,
        inRange: false
      };
      const day = new Day(props);
      expect(day.getClassName()).toBe('calendar-day disabled');
    });

    it('is weekend and disabled', () => {
      const props = {
        day: new Date(2018, 1, 1),
        disabled: true,
        selected: false,
        inRange: false
      };
      const day = new Day(props);
      day.state.isWeekend = true;
      expect(day.getClassName()).toBe('calendar-day weekend disabled');
    });

    it('is selected', () => {
      const props = {
        day: new Date(2018, 1, 1),
        disabled: false,
        selected: true,
        inRange: false
      };
      const day = new Day(props);
      expect(day.getClassName()).toBe('calendar-day selected');
    });

    it('is in range', () => {
      const props = {
        day: new Date(2018, 1, 1),
        disabled: false,
        selected: false,
        inRange: true
      };
      const day = new Day(props);
      expect(day.getClassName()).toBe('calendar-day in-range');
    });

    it('is weekend and selected', () => {
      const props = {
        day: new Date(2018, 1, 1),
        disabled: false,
        selected: true,
        inRange: false
      };
      const day = new Day(props);
      day.state.isWeekend = true;
      expect(day.getClassName()).toBe('calendar-day weekend selected');
    });

    it('is weekend and in range', () => {
      const props = {
        day: new Date(2018, 1, 1),
        disabled: false,
        selected: false,
        inRange: true
      };
      const day = new Day(props);
      day.state.isWeekend = true;
      expect(day.getClassName()).toBe('calendar-day weekend in-range');
    });

    it('is disabled and selected and in range', () => {
      const props = {
        day: new Date(2018, 1, 1),
        disabled: true,
        selected: true,
        inRange: true
      };
      const day = new Day(props);
      expect(day.getClassName()).toBe('calendar-day disabled');
    });
  });

  describe('Day.render', () => {
    it('click handler', () => {
      const clickSpy = sinon.spy();
      const props = {
        day: new Date(2018, 0, 1),
        disabled: true,
        onClick: clickSpy
      };
      let day = shallow(<Day {...props} />);
      day.simulate('click');
      expect(clickSpy.called).toBe(false);

      props.disabled = false;
      day = shallow(<Day {...props} />);
      day.simulate('click');
      expect(clickSpy.called).toBe(true);
    });

    it('formatted Date', () => {
      const props = {
        day: new Date(2018, 0, 1)
      };
      let day = shallow(<Day {...props} />);
      let formattedDate = day.find('span.calendar-day-number');
      expect(formattedDate.text()).toEqual('1');

      props.dateFormat = 'DD'
      day = shallow(<Day {...props} />);
      formattedDate = day.find('span.calendar-day-number');
      expect(formattedDate.text()).toEqual('01');
    });
  });
});
