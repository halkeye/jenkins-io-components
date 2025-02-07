import {StoryObj, Meta} from '@storybook/web-components';
import {html} from 'lit';
import {expect} from '@storybook/test';

import {CDFLogo} from '../jio-cdf-logo';
import '../jio-cdf-logo';

export default {
  title: 'Example/CDFLogo',
  component: 'jio-cdf-logo',
} as Meta;

const render = () => html`<jio-cdf-logo></jio-cdf-logo>`;

export const Default: StoryObj<CDFLogo> = {
  render,
  args: {},
  play: async ({canvasElement}) => {
    const cdfLogo = canvasElement.querySelector('jio-cdf-logo') as CDFLogo;
    const wc = cdfLogo.shadowRoot;

    expect(wc.querySelector('svg')).toBeTruthy();
    expect(wc.querySelector('svg title').textContent).toEqual('CDF');
  },
};
