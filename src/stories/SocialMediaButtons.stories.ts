import {StoryObj, Meta} from '@storybook/web-components';
import {html} from 'lit';
import {ifDefined} from 'lit/directives/if-defined.js';
import {expect} from '@storybook/test';

import {SocialMediaButtons} from '../jio-socialmedia-buttons';
import '../jio-components';

export default {
  title: 'Example/SocialMediaButtons',
  component: 'jio-socialmedia-buttons',
} as Meta;

const render = ({github, twitter, linkedin, blog}) =>
  html`<jio-socialmedia-buttons
    github=${ifDefined(github)}
    twitter=${ifDefined(twitter)}
    linkedin=${ifDefined(linkedin)}
    blog=${ifDefined(blog)}
  ></jio-socialmedia-buttons>`;

export const Github: StoryObj<SocialMediaButtons> = {
  render,
  args: {
    github: 'halkeye',
  },
  play: async ({canvasElement}) => {
    const socialMediaButtons = canvasElement.querySelector(
      'jio-socialmedia-buttons'
    ) as SocialMediaButtons;
    expect(socialMediaButtons.shadowRoot.children).toHaveLength(1);

    const githubLink = socialMediaButtons.shadowRoot.querySelector(
      'ul li a[href="https://github.com/halkeye"]'
    );
    expect(githubLink).toHaveAttribute('rel', 'noreferrer noopener');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveTextContent('Github');
  },
};

export const Linkedin: StoryObj<SocialMediaButtons> = {
  render,
  args: {
    linkedin: 'halkeye',
  },
  play: async ({canvasElement}) => {
    const socialMediaButtons = canvasElement.querySelector(
      'jio-socialmedia-buttons'
    ) as SocialMediaButtons;
    expect(socialMediaButtons.shadowRoot.children).toHaveLength(1);

    const linkedinLink = socialMediaButtons.shadowRoot.querySelector(
      'ul li a[href="https://www.linkedin.com/in/halkeye"]'
    );
    expect(linkedinLink).toHaveAttribute('rel', 'noreferrer noopener');
    expect(linkedinLink).toHaveAttribute('target', '_blank');
    expect(linkedinLink).toHaveTextContent('LinkedIn');
  },
};

export const Twitter: StoryObj<SocialMediaButtons> = {
  render,
  args: {
    twitter: 'halkeye',
  },
  play: async ({canvasElement}) => {
    const socialMediaButtons = canvasElement.querySelector(
      'jio-socialmedia-buttons'
    ) as SocialMediaButtons;
    expect(socialMediaButtons.shadowRoot.children).toHaveLength(1);

    const linkedinLink = socialMediaButtons.shadowRoot.querySelector(
      'ul li a[href="https://twitter.com/halkeye"]'
    );
    expect(linkedinLink).toHaveAttribute('rel', 'noreferrer noopener');
    expect(linkedinLink).toHaveAttribute('target', '_blank');
    expect(linkedinLink).toHaveTextContent('Twitter');
  },
};

export const Blog: StoryObj<SocialMediaButtons> = {
  render,
  args: {
    blog: 'https://g4v.dev',
  },
  play: async ({canvasElement}) => {
    const socialMediaButtons = canvasElement.querySelector(
      'jio-socialmedia-buttons'
    ) as SocialMediaButtons;
    expect(socialMediaButtons.shadowRoot.children).toHaveLength(1);

    const linkedinLink = socialMediaButtons.shadowRoot.querySelector(
      'ul li a[href="https://g4v.dev"]'
    );
    expect(linkedinLink).toHaveAttribute('rel', 'noreferrer noopener');
    expect(linkedinLink).toHaveAttribute('target', '_blank');
    expect(linkedinLink).toHaveTextContent('Blog');
  },
};

export const Combined: StoryObj<SocialMediaButtons> = {
  render,
  args: {
    ...Github.args,
    ...Linkedin.args,
    ...Twitter.args,
    ...Blog.args,
  },
  play: async (args) => {
    Github.play(args);
    Linkedin.play(args);
    Twitter.play(args);
    Blog.play(args);
  },
};
