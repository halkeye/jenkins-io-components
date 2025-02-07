import {StoryObj, Meta} from '@storybook/web-components';
import {html} from 'lit';
import {ifDefined} from 'lit/directives/if-defined.js';
import {expect} from '@storybook/test';

import {ChangelogWeatherIcon} from '../jio-changelog-weather-icon';
import '../jio-components';

export default {
  title: 'Example/ChangelogWeatherIcon',
  component: 'jio-changelog-weather-icon',
  argTypes: {
    mode: {
      options: ['sunny', 'cloudy', 'storm'],
      control: {type: 'select'},
      default: 'sunny',
    },
  },
} as Meta;

const render = ({count, mode}) =>
  html`<jio-changelog-weather-icon
    mode=${ifDefined(mode)}
    count=${ifDefined(count)}
  ></jio-changelog-weather-icon>`;

export const SunnyAndLightByDefault: StoryObj<ChangelogWeatherIcon> = {
  render,
  args: {},
  play: async ({canvasElement}) => {
    const wc = canvasElement.querySelector(
      'jio-changelog-weather-icon'
    ) as ChangelogWeatherIcon;
    expect(wc.shadowRoot.children).toHaveLength(1);
    expect(wc.shadowRoot).toHaveTextContent('0');
    expect(wc.shadowRoot.querySelector('span')).toHaveClass('light');
    expect(wc.shadowRoot.querySelector('jio-weather-icon')).toHaveAttribute(
      'title',
      'No major issues with this release'
    );
    expect(wc.shadowRoot.querySelector('jio-weather-icon')).toHaveAttribute(
      'weather',
      'sunny'
    );
  },
};

export const BrightWhenCountSunny: StoryObj<ChangelogWeatherIcon> = {
  render,
  args: {
    mode: 'sunny',
    count: 10,
  },
  play: async ({canvasElement}) => {
    const wc = canvasElement.querySelector(
      'jio-changelog-weather-icon'
    ) as ChangelogWeatherIcon;
    expect(wc.shadowRoot.children).toHaveLength(1);
    expect(wc.shadowRoot).toHaveTextContent('10');
    expect(wc.shadowRoot.querySelector('span')).not.toHaveClass('light');
    expect(wc.shadowRoot.querySelector('jio-weather-icon')).toHaveAttribute(
      'title',
      'No major issues with this release'
    );
    expect(wc.shadowRoot.querySelector('jio-weather-icon')).toHaveAttribute(
      'weather',
      'sunny'
    );
  },
};

export const BrightWhenCountCloudy: StoryObj<ChangelogWeatherIcon> = {
  render,
  args: {
    mode: 'cloudy',
    count: 10,
  },
  play: async ({canvasElement}) => {
    const wc = canvasElement.querySelector(
      'jio-changelog-weather-icon'
    ) as ChangelogWeatherIcon;
    expect(wc.shadowRoot.children).toHaveLength(1);
    expect(wc.shadowRoot).toHaveTextContent('10');
    expect(wc.shadowRoot.querySelector('span')).not.toHaveClass('light');
    expect(wc.shadowRoot.querySelector('jio-weather-icon')).toHaveAttribute(
      'title',
      'I experienced notable issues'
    );
    expect(wc.shadowRoot.querySelector('jio-weather-icon')).toHaveAttribute(
      'weather',
      'cloudy'
    );
  },
};

export const BrightWhenCountStorm: StoryObj<ChangelogWeatherIcon> = {
  render,
  args: {
    mode: 'storm',
    count: 10,
  },
  play: async ({canvasElement}) => {
    const wc = canvasElement.querySelector(
      'jio-changelog-weather-icon'
    ) as ChangelogWeatherIcon;
    expect(wc.shadowRoot.children).toHaveLength(1);
    expect(wc.shadowRoot).toHaveTextContent('10');
    expect(wc.shadowRoot.querySelector('span')).not.toHaveClass('light');
    expect(wc.shadowRoot.querySelector('jio-weather-icon')).toHaveAttribute(
      'title',
      'I had to roll back'
    );
    expect(wc.shadowRoot.querySelector('jio-weather-icon')).toHaveAttribute(
      'weather',
      'storm'
    );
  },
};

export const FadedWithNoCountSunny: StoryObj<ChangelogWeatherIcon> = {
  render,
  args: {
    mode: 'sunny',
  },
  play: async ({canvasElement}) => {
    const wc = canvasElement.querySelector(
      'jio-changelog-weather-icon'
    ) as ChangelogWeatherIcon;
    expect(wc.shadowRoot.children).toHaveLength(1);
    expect(wc.shadowRoot).toHaveTextContent('0');
    expect(wc.shadowRoot.querySelector('span')).toHaveClass('light');
    expect(wc.shadowRoot.querySelector('jio-weather-icon')).toHaveAttribute(
      'title',
      'No major issues with this release'
    );
    expect(wc.shadowRoot.querySelector('jio-weather-icon')).toHaveAttribute(
      'weather',
      'sunny'
    );
  },
};

export const FadedWithNoCountCloudy: StoryObj<ChangelogWeatherIcon> = {
  render,
  args: {
    mode: 'cloudy',
  },
  play: async ({canvasElement}) => {
    const wc = canvasElement.querySelector(
      'jio-changelog-weather-icon'
    ) as ChangelogWeatherIcon;
    expect(wc.shadowRoot.children).toHaveLength(1);
    expect(wc.shadowRoot).toHaveTextContent('0');
    expect(wc.shadowRoot.querySelector('span')).toHaveClass('light');
    expect(wc.shadowRoot.querySelector('jio-weather-icon')).toHaveAttribute(
      'title',
      'I experienced notable issues'
    );
    expect(wc.shadowRoot.querySelector('jio-weather-icon')).toHaveAttribute(
      'weather',
      'cloudy'
    );
  },
};

export const FadedWithNoCountStorm: StoryObj<ChangelogWeatherIcon> = {
  render,
  args: {
    mode: 'storm',
  },
  play: async ({canvasElement}) => {
    const wc = canvasElement.querySelector(
      'jio-changelog-weather-icon'
    ) as ChangelogWeatherIcon;
    expect(wc.shadowRoot.children).toHaveLength(1);
    expect(wc.shadowRoot).toHaveTextContent('0');
    expect(wc.shadowRoot.querySelector('span')).toHaveClass('light');
    expect(wc.shadowRoot.querySelector('jio-weather-icon')).toHaveAttribute(
      'title',
      'I had to roll back'
    );
    expect(wc.shadowRoot.querySelector('jio-weather-icon')).toHaveAttribute(
      'weather',
      'storm'
    );
  },
};
