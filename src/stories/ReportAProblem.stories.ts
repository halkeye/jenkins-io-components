import {StoryObj, Meta} from '@storybook/web-components';
import {html} from 'lit';
import {ifDefined} from 'lit/directives/if-defined.js';
import {expect} from '@storybook/test';

import {ReportAProblem} from '../jio-report-a-problem';
import '../jio-report-a-problem';

export default {
  title: 'Example/ReportAProblem',
  component: 'jio-report-a-problem',
} as Meta;

const render = ({githubRepo, sourcePath, pageTitle, url, template}) =>
  html`<jio-report-a-problem
    sourcePath=${ifDefined(sourcePath)}
    githubRepo=${ifDefined(githubRepo)}
    pageTitle=${ifDefined(pageTitle)}
    url=${ifDefined(url)}
    template=${ifDefined(template)}
  ></jio-report-a-problem>`;

const expectToBeUrlEncoded = (href: string, {title, url, githubRepo}) => {
  const hrefURL = new URL(href);

  expect(href).toContain(`https://github.com/${githubRepo}/issues/new`);
  expect(href).toContain(new URLSearchParams({title}).toString());
  expect(href).toContain(encodeURIComponent(url));
  expect(hrefURL.searchParams.get('body') || '').toContain(url);

  const nonHrefBodyLines = hrefURL.searchParams
    .get('body')
    ?.split('\n')
    ?.filter((line) => line.startsWith(' '));
  expect(nonHrefBodyLines).toEqual([]);
};

export const DefaultArgs: StoryObj<ReportAProblem> = {
  render,
  args: {},
  play: async ({canvasElement}) => {
    const reportAProblem = canvasElement.querySelector(
      'jio-report-a-problem'
    ) as ReportAProblem;
    expect(reportAProblem.shadowRoot.children).toHaveLength(0);
  },
};

export const RepoAndSourcePath: StoryObj<ReportAProblem> = {
  render,
  args: {
    sourcePath: 'src/stories/ReportAProblem.ts',
    githubRepo: 'jenkins-infra/jenkins-io-components',
  },
  play: async ({canvasElement, args}) => {
    const reportAProblem = canvasElement.querySelector(
      'jio-report-a-problem'
    ) as ReportAProblem;
    expect(reportAProblem.githubBranch).toEqual(args.githubBranch || 'master');
    expect(reportAProblem.githubRepo).toEqual(
      args.githubRepo || 'jenkins-infra/jenkins-io-components'
    );
    expect(reportAProblem.sourcePath).toEqual(
      args.sourcePath || 'src/stories/Footer.stories.ts'
    );

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

    expectToBeUrlEncoded(
      reportAProblem.shadowRoot.querySelector('a').getAttribute('href'),
      {
        url: '',
        title: 'example-reportaproblem--repo-and-source-path page',
        githubRepo: args.githubRepo,
      }
    );
  },
};

export const NoRepo: StoryObj<ReportAProblem> = {
  render,
  args: {
    sourcePath: 'src/stories/ReportAProblem.ts',
  },
  play: async ({canvasElement}) => {
    const reportAProblem = canvasElement.querySelector(
      'jio-report-a-problem'
    ) as ReportAProblem;
    expect(reportAProblem.shadowRoot.children).toHaveLength(0);
  },
};

export const NoSourcePath: StoryObj<ReportAProblem> = {
  render,
  args: {
    githubRepo: 'jenkins-infra/jenkins-io-components',
  },
  play: async ({canvasElement, args}) => {
    const reportAProblem = canvasElement.querySelector(
      'jio-report-a-problem'
    ) as ReportAProblem;
    expect(reportAProblem.shadowRoot.children).toHaveLength(1);
    expect(reportAProblem.shadowRoot.querySelector('a')).toHaveAttribute(
      'title',
      expect.stringContaining('Report a page issue with http')
    );
    expect(
      reportAProblem.shadowRoot.querySelector('a ion-icon')
    ).toHaveAttribute('name', 'warning');
    expect(reportAProblem.shadowRoot.querySelector('a span')).toHaveTextContent(
      'Report page issue'
    );

    expectToBeUrlEncoded(
      reportAProblem.shadowRoot.querySelector('a').getAttribute('href'),
      {
        url: '',
        title: 'example-reportaproblem--no-source-path page',
        githubRepo: args.githubRepo,
      }
    );
  },
};

export const OverridePageTitle: StoryObj<ReportAProblem> = {
  render,
  args: {
    ...RepoAndSourcePath.args,
    pageTitle: 'thingie',
  },
  play: async ({canvasElement, args}) => {
    const reportAProblem = canvasElement.querySelector(
      'jio-report-a-problem'
    ) as ReportAProblem;

    expect(reportAProblem.shadowRoot.children).toHaveLength(1);
    expect(reportAProblem.shadowRoot.querySelector('a')).toHaveAttribute(
      'title',
      expect.stringContaining(
        'Report a page issue with src/stories/ReportAProblem.ts'
      )
    );
    expect(
      reportAProblem.shadowRoot.querySelector('a ion-icon')
    ).toHaveAttribute('name', 'warning');
    expect(reportAProblem.shadowRoot.querySelector('a span')).toHaveTextContent(
      'Report page issue'
    );

    expectToBeUrlEncoded(
      reportAProblem.shadowRoot.querySelector('a').getAttribute('href'),
      {url: '', title: 'thingie page', githubRepo: args.githubRepo}
    );
  },
};

export const OverrideURL: StoryObj<ReportAProblem> = {
  render,
  args: {
    ...RepoAndSourcePath.args,
    pageTitle: 'thingie',
    url: 'https://google.com/',
  },
  play: async ({canvasElement, args}) => {
    const reportAProblem = canvasElement.querySelector(
      'jio-report-a-problem'
    ) as ReportAProblem;

    expect(reportAProblem.shadowRoot.children).toHaveLength(1);
    expect(reportAProblem.shadowRoot.querySelector('a')).toHaveAttribute(
      'title',
      expect.stringContaining(
        'Report a page issue with src/stories/ReportAProblem.ts'
      )
    );
    expect(
      reportAProblem.shadowRoot.querySelector('a ion-icon')
    ).toHaveAttribute('name', 'warning');
    expect(reportAProblem.shadowRoot.querySelector('a span')).toHaveTextContent(
      'Report page issue'
    );

    expectToBeUrlEncoded(
      reportAProblem.shadowRoot.querySelector('a').getAttribute('href'),
      {
        url: 'https://google.com/',
        title: 'thingie page',
        githubRepo: args.githubRepo,
      }
    );
  },
};

export const JenkinsIOBugTemplate: StoryObj<ReportAProblem> = {
  render,
  args: {
    sourcePath: 'src/stories/ReportAProblem.ts',
    githubRepo: 'halkeye/fake-jenkins-io-issue-templates',
    githubBranch: 'main',
    template: '4-bug.yml',
  },
  play: async ({canvasElement}) => {
    const reportAProblem = canvasElement.querySelector(
      'jio-report-a-problem'
    ) as ReportAProblem;
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
