import {StoryObj, Meta} from '@storybook/web-components';
import {html} from 'lit';
import {ifDefined} from 'lit/directives/if-defined.js';
import {expect} from '@storybook/test';

import {NavbarLink} from '../jio-navbar-link';
import '../jio-navbar-link';

export default {
  title: 'Example/Navbar/NavbarLink',
  component: 'jio-navbar-link',
} as Meta;

const render = ({href, property, locationPathname}) =>
  html`<div style="background: black">
    <jio-navbar-link
      href=${ifDefined(href)}
      property=${ifDefined(property)}
      locationPathname=${ifDefined(locationPathname)}
      >Link Title</jio-navbar-link
    >
  </div>`;

export const DefaultArgs: StoryObj<NavbarLink> = {
  render,
  // storyName: 'Default args assumes local property',
  args: {},
  play: async ({canvasElement}) => {
    const wc = canvasElement.querySelector('jio-navbar-link') as NavbarLink;
    expect(wc.shadowRoot.children).toHaveLength(1);

    const a = wc.shadowRoot.querySelector('a');
    expect(Array.from(a.classList)).toEqual(['nav-link']);
    expect(a).toHaveAttribute('href', '/');
    expect(a.querySelector('slot').assignedNodes()[0]).toHaveTextContent(
      'Link Title'
    );
  },
};

export const MatchingHref: StoryObj<NavbarLink> = {
  render,
  args: {
    href: '/iframe.html',
  },
  play: async ({canvasElement}) => {
    const wc = canvasElement.querySelector('jio-navbar-link') as NavbarLink;
    expect(wc.shadowRoot.children).toHaveLength(1);

    const a = wc.shadowRoot.querySelector('a');
    expect(Array.from(a.classList).sort()).toEqual(['active', 'nav-link']);
    expect(a).toHaveAttribute('href', '/iframe.html');
    expect(a.querySelector('slot').assignedNodes()[0]).toHaveTextContent(
      'Link Title'
    );
  },
};

export const DifferentPropertyRelativeLink: StoryObj<NavbarLink> = {
  render,
  // storyName: 'When properties dont match, relative link should be full',
  args: {
    href: '/',
    property: 'https://webcomponents.jenkins.io',
  },
  play: async ({canvasElement}) => {
    const wc = canvasElement.querySelector('jio-navbar-link') as NavbarLink;
    expect(wc.shadowRoot.children).toHaveLength(1);

    const a = wc.shadowRoot.querySelector('a');
    expect(Array.from(a.classList)).toEqual(['nav-link']);
    expect(a).toHaveAttribute('href', 'https://www.jenkins.io/');
    expect(a.querySelector('slot').assignedNodes()[0]).toHaveTextContent(
      'Link Title'
    );
  },
};

export const DifferentPropertyAbsoluteLink: StoryObj<NavbarLink> = {
  render,
  // storyName: 'When properties dont match, absolute link should be full',
  args: {
    href: 'https://plugins.jenkins.io/jcasc',
    property: 'https://webcomponents.jenkins.io',
  },
  play: async ({canvasElement}) => {
    const wc = canvasElement.querySelector('jio-navbar-link') as NavbarLink;
    expect(wc.shadowRoot.children).toHaveLength(1);

    const a = wc.shadowRoot.querySelector('a');
    expect(Array.from(a.classList)).toEqual(['nav-link']);
    expect(a).toHaveAttribute('href', 'https://plugins.jenkins.io/jcasc');
    expect(a.querySelector('slot').assignedNodes()[0]).toHaveTextContent(
      'Link Title'
    );
  },
};

export const SamePropertyRelativeLink: StoryObj<NavbarLink> = {
  render,
  // storyName: 'When properties match, relative link should be relative',
  args: {
    href: '/path/to',
    property: 'https://www.jenkins.io',
  },
  play: async ({canvasElement}) => {
    const wc = canvasElement.querySelector('jio-navbar-link') as NavbarLink;
    expect(wc.shadowRoot.children).toHaveLength(1);

    const a = wc.shadowRoot.querySelector('a');
    expect(Array.from(a.classList)).toEqual(['nav-link']);
    expect(a).toHaveAttribute('href', '/path/to');
    expect(a.querySelector('slot').assignedNodes()[0]).toHaveTextContent(
      'Link Title'
    );
  },
};

export const SamePropertyAbsoluteLink: StoryObj<NavbarLink> = {
  render,
  // storyName: 'When properties match, absolute link should be relative',
  args: {
    href: 'https://www.jenkins.io/path/to',
    property: 'https://www.jenkins.io',
  },
  play: async ({canvasElement}) => {
    const wc = canvasElement.querySelector('jio-navbar-link') as NavbarLink;
    expect(wc.shadowRoot.children).toHaveLength(1);

    const a = wc.shadowRoot.querySelector('a');
    expect(Array.from(a.classList)).toEqual(['nav-link']);
    expect(a).toHaveAttribute('href', '/path/to');
    expect(a.querySelector('slot').assignedNodes()[0]).toHaveTextContent(
      'Link Title'
    );
  },
};
