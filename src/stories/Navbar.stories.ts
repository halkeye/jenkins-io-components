import {expect} from '@storybook/test';
import {StoryObj, Meta} from '@storybook/web-components';
import {MINIMAL_VIEWPORTS} from '@storybook/addon-viewport';
import {within, waitFor, userEvent} from '@storybook/test';

import {deepQuerySelectorAll} from 'shadow-dom-testing-library';
import {html} from 'lit';
import {ifDefined} from 'lit/directives/if-defined.js';

import {Navbar} from '../jio-navbar';
import '../jio-navbar';

export default {
  title: 'Example/Navbar',
  component: 'jio-navbar',
  controls: {
    expanded: true,
  },
  argTypes: {
    showSearchBox: {control: {type: 'boolean'}},
    visibleMenu: {table: {disable: true}},
    menuToggled: {table: {disable: true}},
    theme: {control: 'select', options: ['light', 'dark', 'auto']},
  },
} as Meta;

const render = ({property, showSearchBox, locationPathname, theme}) =>
  html`<jio-navbar
    property=${ifDefined(property)}
    .locationPathname=${ifDefined(locationPathname)}
    .theme=${ifDefined(theme)}
    ?showSearchBox=${showSearchBox}
  ></jio-navbar>`;

export const AllLinksExternal: StoryObj<Navbar> = {
  render,
  args: {
    property: 'https://webcomponents.jenkins.io',
  },
};

export const SamePropertyActiveLink: StoryObj<Navbar> = {
  render,
  name: 'Active link inside dropdown',
  args: {
    property: 'https://www.jenkins.io',
    locationPathname: '/projects/gsoc/',
  },
  play: async ({canvasElement}) => {
    const wc = canvasElement.querySelector('jio-navbar') as Navbar;
    const root = await waitFor(
      () => (wc.shadowRoot as ShadowRoot).firstElementChild as HTMLElement,
      {
        timeout: 5000,
      }
    );

    const screen = within(root);

    const aboutDropdown = await screen.findByText('Subprojects');
    userEvent.click(aboutDropdown);

    expect(deepQuerySelectorAll(canvasElement, '.active')).toHaveLength(1);
  },
};

export const SamePropertyActiveToplevelLink: StoryObj<Navbar> = {
  render,
  name: 'Active link outside dropdown',
  args: {
    property: 'https://www.jenkins.io',
    locationPathname: '/blog/',
  },
  play: async ({canvasElement}) => {
    expect(deepQuerySelectorAll(canvasElement, '.active')).toHaveLength(1);
  },
};

// TODO - maybe header navitems shouldn't have active links?
export const SamePropertyActiveHeader: StoryObj<Navbar> = {
  render,
  name: 'Active link - Header navitem',
  args: {
    property: 'https://www.jenkins.io',
    locationPathname: '/solutions/',
  },
  play: async ({canvasElement}) => {
    const wc = canvasElement.querySelector('jio-navbar') as Navbar;
    const root = await waitFor(
      () => (wc.shadowRoot as ShadowRoot).firstElementChild as HTMLElement,
      {
        timeout: 5000,
      }
    );

    const screen = within(root);

    const aboutDropdown = await screen.findByText('Documentation');
    userEvent.click(aboutDropdown);

    expect(deepQuerySelectorAll(canvasElement, '.active')).toHaveLength(1);
  },
};

export const ChangeBrand: StoryObj<Navbar> = {
  render: ({property}) =>
    html`<jio-navbar property=${ifDefined(property)}>
      <a slot="brand" href="/" style="color: red">BRAND</a>
    </jio-navbar>`,
  args: {
    property: 'https://webcomponents.jenkins.io',
  },
};

export const ExtraRightSlot: StoryObj<Navbar> = {
  render: ({property}) =>
    html`<jio-navbar property=${ifDefined(property)}>
      <div slot="rightMenuItems">
        <jio-navbar-link property=${ifDefined(property)} href="/myself"
          >Profile</jio-navbar-link
        >
        <jio-navbar-link property=${ifDefined(property)} href="/logout"
          >Logout</jio-navbar-link
        >
      </div>
    </jio-navbar>`,
  args: {
    property: 'https://webcomponents.jenkins.io',
  },
};

export const SearchboxEnabled: StoryObj<Navbar> = {
  args: {
    showSearchBox: true,
  },
};

export const SearchboxOpen: StoryObj<Navbar> = {
  args: {
    showSearchBox: true,
  },
  play: async ({canvasElement}) => {
    const wc = canvasElement.querySelector('jio-navbar') as Navbar;

    expect(wc.shadowRoot.querySelector('jio-searchbox')).toBeVisible();
  },
};

export const MobileSearchBox: StoryObj<Navbar> = {
  args: {
    showSearchBox: true,
  },
  parameters: {
    viewport: {
      viewports: MINIMAL_VIEWPORTS,
      defaultViewport: 'mobile2',
    },
  },
  play: async ({canvasElement}) => {
    const wc = canvasElement.querySelector('jio-navbar') as Navbar;

    userEvent.click(wc.shadowRoot.querySelector('.navbar-toggler')); // open navbar

    expect(wc.shadowRoot.querySelector('jio-searchbox')).toBeVisible();
  },
};
