import {StoryObj, Meta} from '@storybook/web-components';

import {html} from 'lit';
import {ifDefined} from 'lit/directives/if-defined.js';
import {deepQuerySelectorAll} from 'shadow-dom-testing-library';
import {expect} from '@storybook/test';

import {Footer} from '../jio-footer';
import {ImproveThisPage} from '../jio-improve-this-page';
import {ReportAProblem} from '../jio-report-a-problem';
import '../jio-footer';

import {RepoAndSourcePath} from './ImproveThisPage.stories';

export default {
  title: 'Example/Footer',
  component: 'jio-footer',
  controls: {
    expanded: true,
  },
  argTypes: {},
} as Meta;

const render = ({
  property,
  sourcePath,
  githubRepo,
  githubBranch,
  reportAProblemTemplate,
}) =>
  html`<jio-footer
    property=${ifDefined(property)}
    sourcePath=${ifDefined(sourcePath)}
    githubRepo=${ifDefined(githubRepo)}
    githubBranch=${ifDefined(githubBranch)}
    reportAProblemTemplate=${ifDefined(reportAProblemTemplate)}
  ></jio-footer>`;

export const Default: StoryObj<Footer> = {
  render,
  args: {},
};

export const HasSourcePath: StoryObj<Footer> = {
  render,
  args: {
    property: 'https://www.jenkins.io',
    githubRepo: 'jenkins-infra/jenkins-io-components',
    sourcePath: 'src/stories/Footer.stories.ts',
  },
  play: async ({canvasElement, args, ...rest}) => {
    const wc = canvasElement.querySelector('jio-footer') as Footer;

    // Wait for the component to render
    await new Promise((resolve) => setTimeout(resolve, 100));

    await RepoAndSourcePath.play({
      ...rest,
      args,
      canvasElement: wc.shadowRoot as unknown as HTMLElement,
    });

    const improveThisPage = wc.shadowRoot.querySelector(
      'jio-improve-this-page'
    ) as ImproveThisPage;
    expect(improveThisPage.githubBranch).toEqual(args.githubBranch || 'master');
    expect(improveThisPage.githubRepo).toEqual(args.githubRepo);
    expect(improveThisPage.sourcePath).toEqual(args.sourcePath);

    const reportAProblem = wc.shadowRoot.querySelector(
      'jio-report-a-problem'
    ) as ReportAProblem;
    expect(reportAProblem.githubBranch).toEqual(args.githubBranch || 'master');
    expect(reportAProblem.githubRepo).toEqual(args.githubRepo);
    expect(reportAProblem.sourcePath).toEqual(args.sourcePath);
  },
};

export const NoSourcePath: StoryObj<Footer> = {
  render,
  args: {
    property: 'https://www.jenkins.io',
    githubRepo: 'jenkins-infra/jenkins-io-components',
  },
};

export const ExternalProperty: StoryObj<Footer> = {
  render,
  args: {
    property: 'https://accounts.jenkins.io',
    githubRepo: 'jenkins-infra/jenkins-io-components',
    sourcePath: 'src/stories/Footer.stories.ts',
  },
};

export const JenkinsIOBugTemplate: StoryObj<Footer> = {
  render,
  args: {
    property: 'https://webcomponents.jenkins.io',
    sourcePath: 'src/stories/ReportAProblem.ts',
    githubRepo: 'halkeye/fake-jenkins-io-issue-templates',
    githubBranch: 'main',
    reportAProblemTemplate: '4-bug.yml',
  },
  play: async ({canvasElement}) => {
    const reportAProblem = deepQuerySelectorAll(
      canvasElement,
      'jio-report-a-problem'
    )[0] as ReportAProblem;

    // Wait for the component to render
    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(reportAProblem.shadowRoot.children).toHaveLength(1);
    expect(reportAProblem.shadowRoot.querySelector('a')).toHaveAttribute(
      'title',
      'Report a page issue with src/stories/ReportAProblem.ts'
    );
    expect(
      reportAProblem.shadowRoot.querySelector('a ion-icon')
    ).toHaveAttribute('name', 'warning');
    expect(reportAProblem.shadowRoot.querySelector('a span')).toHaveTextContent(
      'Report page issue'
    );

    const url = new URL(
      reportAProblem.shadowRoot.querySelector('a').getAttribute('href')
    );
    expect(Array.from(url.searchParams.keys()).sort()).toEqual([
      'labels',
      'problem',
      'template',
    ]);
    expect(url.searchParams.get('labels')).toEqual('bug');
    expect(url.searchParams.get('template')).toEqual('4-bug.yml');
  },
};
