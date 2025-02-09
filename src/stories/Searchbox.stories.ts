import {expect} from '@storybook/test';
import {StoryObj, Meta} from '@storybook/web-components';
import {userEvent} from '@storybook/test';

import {html} from 'lit';
import {deepQuerySelector} from 'shadow-dom-testing-library';

import {Searchbox} from '../jio-searchbox';
import '../jio-searchbox';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const waitFor = async function waitFor(f: () => Promise<boolean>) {
  while (!(await f())) {
    await sleep(100);
  }
};

export default {
  title: 'Example/Searchbox',
  component: 'jio-searchbox',
  controls: {
    expanded: true,
  },
  argTypes: {},
} as Meta;

const render = () => html`<jio-searchbox></jio-searchbox>`;

export const Default: StoryObj<Searchbox> = {
  render,
  args: {},
};

export const SearchOpen: StoryObj<Searchbox> = {
  render,
  args: {},
  play: async ({canvasElement}) => {
    const wc = deepQuerySelector(canvasElement, 'jio-searchbox') as Searchbox;
    await waitFor(async () => wc.isReady === true);

    const button = wc.shadowRoot.querySelector('.DocSearch-Button');
    expect(button).toBeVisible();

    userEvent.click(button);
  },
};
