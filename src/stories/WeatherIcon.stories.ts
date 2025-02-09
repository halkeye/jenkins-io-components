import {StoryObj, Meta} from '@storybook/web-components';
import {html} from 'lit';
import {ifDefined} from 'lit/directives/if-defined.js';
import {expect} from '@storybook/test';

import {WeatherIcon} from '../jio-weather-icon';
import '../jio-weather-icon.ts';

export default {
  title: 'Example/WeatherIcon',
  component: 'jio-weather-icon',
  argTypes: {
    weather: {
      options: ['sunny', 'cloudy', 'storm'],
      control: {type: 'select'},
    },
  },
} as Meta;

const render = ({weather, title}) =>
  html`<jio-weather-icon
    weather=${ifDefined(weather)}
    title=${ifDefined(title)}
  ></jio-weather-icon>`;

export const Default: StoryObj<WeatherIcon> = {
  render,
  args: {},
  play: async ({canvasElement, ...args}) => {
    Sunny.play({...args, canvasElement});
  },
};

export const CustomTitle: StoryObj<WeatherIcon> = {
  render,
  args: {
    title: 'something else',
  },
  play: async ({canvasElement}) => {
    const weatherIcon = canvasElement.querySelector(
      'jio-weather-icon'
    ) as WeatherIcon;
    expect(weatherIcon.shadowRoot.children).toHaveLength(1);
    expect(weatherIcon.shadowRoot.querySelector('svg title')).toHaveTextContent(
      'something else'
    );
  },
};
export const Sunny: StoryObj<WeatherIcon> = {
  render,
  args: {
    weather: 'sunny',
  },
  play: async ({canvasElement}) => {
    const weatherIcon = canvasElement.querySelector(
      'jio-weather-icon'
    ) as WeatherIcon;
    expect(weatherIcon.shadowRoot.children).toHaveLength(1);
    expect(weatherIcon.shadowRoot.querySelector('svg title')).toHaveTextContent(
      'Sunny Weather Icon'
    );
  },
};

export const Cloudy: StoryObj<WeatherIcon> = {
  render,
  args: {
    weather: 'cloudy',
  },
  play: async ({canvasElement}) => {
    const weatherIcon = canvasElement.querySelector(
      'jio-weather-icon'
    ) as WeatherIcon;
    expect(weatherIcon.shadowRoot.children).toHaveLength(1);
    expect(weatherIcon.shadowRoot.querySelector('svg title')).toHaveTextContent(
      'Cloudy Weather Icon'
    );
  },
};

export const Storm: StoryObj<WeatherIcon> = {
  render,
  args: {
    weather: 'storm',
  },
  play: async ({canvasElement}) => {
    const weatherIcon = canvasElement.querySelector(
      'jio-weather-icon'
    ) as WeatherIcon;
    expect(weatherIcon.shadowRoot.children).toHaveLength(1);
    expect(weatherIcon.shadowRoot.querySelector('svg title')).toHaveTextContent(
      'Stormy Weather Icon'
    );
  },
};
