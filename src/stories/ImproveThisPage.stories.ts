import {StoryObj, Meta} from '@storybook/web-components';
import {html} from 'lit';
import {ifDefined} from 'lit/directives/if-defined.js';
import {expect} from '@storybook/test';

import {ImproveThisPage} from '../jio-improve-this-page';
import '../jio-improve-this-page';

export default {
  title: 'Example/ImproveThisPage',
  component: 'jio-improve-this-page',
} as Meta;

const render = ({githubRepo, sourcePath, githubBranch}) =>
  html`<jio-improve-this-page
    sourcePath=${ifDefined(sourcePath)}
    githubRepo=${ifDefined(githubRepo)}
    githubBranch=${ifDefined(githubBranch)}
  ></jio-improve-this-page>`;
export const RepoAndSourcePathAndBranch: StoryObj<ImproveThisPage> = {
  render,
  args: {
    githubBranch: 'boobear',
    sourcePath: 'src/stories/ImproveThisPage.ts',
    githubRepo: 'jenkins-infra/jenkins-io-components',
  },
  play: async ({canvasElement}) => {
    const improveThisPage = canvasElement.querySelector(
      'jio-improve-this-page'
    ) as ImproveThisPage;

    // Wait for the component to render
    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(improveThisPage.githubBranch).toEqual('boobear');
    expect(improveThisPage.githubRepo).toEqual(
      'jenkins-infra/jenkins-io-components'
    );
    expect(improveThisPage.sourcePath).toEqual(
      'src/stories/ImproveThisPage.ts'
    );

    expect(improveThisPage.shadowRoot.children).toHaveLength(1);

    const link = improveThisPage.shadowRoot.querySelector('a');
    expect(link).toHaveAttribute(
      'href',
      'https://github.com/jenkins-infra/jenkins-io-components/edit/boobear/src/stories/ImproveThisPage.ts'
    );
    expect(link).toHaveAttribute('rel', 'noreferrer noopener');
    expect(link).toHaveAttribute(
      'title',
      'Edit src/stories/ImproveThisPage.ts on GitHub'
    );
    expect(link).not.toHaveAttribute('target');
    expect(link).toHaveTextContent('Improve this page');
  },
};

export const RepoAndSourcePath: StoryObj<ImproveThisPage> = {
  render,
  args: {
    sourcePath: 'src/stories/Footer.stories.ts',
    githubRepo: 'jenkins-infra/jenkins-io-components',
  },
  play: async ({canvasElement}) => {
    const improveThisPage = canvasElement.querySelector(
      'jio-improve-this-page'
    ) as ImproveThisPage;

    // Wait for the component to render
    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(improveThisPage.githubBranch).toEqual('master');
    expect(improveThisPage.githubRepo).toEqual(
      'jenkins-infra/jenkins-io-components'
    );
    expect(improveThisPage.sourcePath).toEqual(
      'src/stories/Footer.stories.ts'
    );

    expect(improveThisPage.shadowRoot.children).toHaveLength(1);

    const link = improveThisPage.shadowRoot.querySelector('a');
    expect(link).toHaveAttribute(
      'href',
      'https://github.com/jenkins-infra/jenkins-io-components/edit/master/src/stories/Footer.stories.ts'
    );
    expect(link).toHaveAttribute('rel', 'noreferrer noopener');
    expect(link).toHaveAttribute(
      'title',
      'Edit src/stories/Footer.stories.ts on GitHub'
    );
    expect(link).not.toHaveAttribute('target');
    expect(link).toHaveTextContent('Improve this page');
  },
};

export const NoRepo: StoryObj<ImproveThisPage> = {
  render,
  args: {
    sourcePath: 'src/stories/ImproveThisPage.ts',
  },
  play: async ({canvasElement}) => {
    const improveThisPage = canvasElement.querySelector(
      'jio-improve-this-page'
    ) as ImproveThisPage;
    expect(improveThisPage.shadowRoot.children).toHaveLength(0);
  },
};

export const NoSourcePath: StoryObj<ImproveThisPage> = {
  render,
  args: {
    githubRepo: 'jenkins-infra/jenkins-io-components',
  },
  play: async ({canvasElement}) => {
    const improveThisPage = canvasElement.querySelector(
      'jio-improve-this-page'
    ) as ImproveThisPage;
    expect(improveThisPage.shadowRoot.children).toHaveLength(0);
  },
};
