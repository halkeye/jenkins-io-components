import {expect} from '@storybook/test';
import {StoryObj, Meta} from '@storybook/web-components';
import {html} from 'lit';
import {ifDefined} from 'lit/directives/if-defined.js';

import {DatetimeBox} from '../jio-datetime-box';
import '../jio-datetime-box';

export default {
  title: 'Example/DatetimeBox',
  component: 'jio-datetime-box',
} as Meta;

const render = ({endDate, date}) =>
  html`<jio-datetime-box
    endDate=${ifDefined(endDate)}
    date=${ifDefined(date)}
  ></jio-datetime-box>`;

// while having no time could potentially be useful, it makes storybook output something different each time
// export const WithNoProperties: StoryObj<DatetimeBox> = {render};

export const WithStartTimeISO: StoryObj<DatetimeBox> = {
  render,
  name: 'With Start Time - ISO Str',
  args: {date: '2022-10-01T00:00:00Z'},
  play: async ({canvasElement}) => {
    const wc = canvasElement.querySelector('jio-datetime-box') as DatetimeBox;
    const sr = wc.shadowRoot;
    expect(sr.children).toHaveLength(1);
    const container = sr.querySelector('div');
    expect(Array.from(container.classList).sort()).toEqual(['date-time']);
    expect(container.children).toHaveLength(2);

    const dateContainer = container.querySelector('div.date');
    expect(dateContainer.children).toHaveLength(1);

    const timeContainer = dateContainer.querySelector('time');
    expect(timeContainer).toHaveAttribute(
      'datetime',
      '2022-10-01T00:00:00.000Z'
    );
    expect(timeContainer).toHaveAttribute('title', 'Start Time');
    expect(timeContainer.children).toHaveLength(2);
    expect(timeContainer.querySelector('.month')).toHaveTextContent('Oct');
    expect(timeContainer.querySelector('.day')).toHaveTextContent('01');

    expect(container.children[1]).toHaveTextContent('01:00 AM');
  },
};

export const WithStartTimeTimestamp: StoryObj<DatetimeBox> = {
  render,
  name: 'With Start Time - Timestamp',
  args: {date: 1664582400000},
  play: async ({canvasElement}) => {
    const wc = canvasElement.querySelector('jio-datetime-box') as DatetimeBox;
    const sr = wc.shadowRoot;
    expect(sr.children).toHaveLength(1);
    const container = sr.querySelector('div');
    expect(Array.from(container.classList).sort()).toEqual(['date-time']);
    expect(container.children).toHaveLength(2);

    const dateContainer = container.querySelector('div.date');
    expect(dateContainer.children).toHaveLength(1);

    const timeContainer = dateContainer.querySelector('time');
    expect(timeContainer).toHaveAttribute(
      'datetime',
      '2022-10-01T00:00:00.000Z'
    );
    expect(timeContainer).toHaveAttribute('title', 'Start Time');
    expect(timeContainer.children).toHaveLength(2);
    expect(timeContainer.querySelector('.month')).toHaveTextContent('Oct');
    expect(timeContainer.querySelector('.day')).toHaveTextContent('01');

    expect(container.children[1]).toHaveTextContent('01:00 AM');
  },
};

export const WithStartAndEndTime: StoryObj<DatetimeBox> = {
  render,
  name: 'With Start and End Time - ISO Str',
  args: {date: '2022-10-01T00:00:00Z', endDate: '2022-12-25T00:00:00Z'},
  play: async ({canvasElement}) => {
    const wc = canvasElement.querySelector('jio-datetime-box') as DatetimeBox;
    const sr = wc.shadowRoot;
    expect(sr.children).toHaveLength(1);

    const container = sr.querySelector('div.date-time');
    expect(Array.from(container.classList).sort()).toEqual(['date-time']);
    expect(container.children).toHaveLength(2);

    const dateContainer = container.querySelector('div.date');
    expect(dateContainer.children).toHaveLength(2);

    const startTimeContainer = dateContainer.querySelectorAll('time')[0];
    expect(startTimeContainer).toHaveAttribute(
      'datetime',
      '2022-10-01T00:00:00.000Z'
    );
    expect(startTimeContainer).toHaveAttribute('title', 'Start Time');
    expect(startTimeContainer.children).toHaveLength(2);
    expect(startTimeContainer.querySelector('.month')).toHaveTextContent(
      /^Oct$/
    );
    expect(startTimeContainer.querySelector('.day')).toHaveTextContent('01');

    const endTimeContainer = dateContainer.querySelectorAll('time')[1];
    expect(endTimeContainer).toHaveAttribute(
      'datetime',
      '2022-12-25T00:00:00.000Z'
    );
    expect(endTimeContainer).toHaveAttribute('title', 'End Time');
    expect(endTimeContainer.children).toHaveLength(2);
    expect(endTimeContainer.querySelector('.month')).toHaveTextContent('Dec');
    expect(endTimeContainer.querySelector('.day')).toHaveTextContent('25');

    expect(container.children[1]).toHaveTextContent('01:00 AM');
  },
};
