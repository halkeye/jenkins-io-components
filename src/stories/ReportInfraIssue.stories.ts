import {StoryObj, Meta} from '@storybook/web-components';
import {html} from 'lit';
import {ifDefined} from 'lit/directives/if-defined.js';
import {expect} from '@storybook/jest';

import {ReportInfraIssue} from '../jio-report-infra-issue';
import '../jio-report-infra-issue';

export default {
  title: 'Example/ReportInfraIssue',
  component: 'jio-report-infra-issue',
} as Meta;

const render = ({githubRepo, sourcePath, pageTitle, url}) => html`<jio-report-infra-issue
  sourcePath=${ifDefined(sourcePath)}
  githubRepo=${ifDefined(githubRepo)}
  pageTitle=${ifDefined(pageTitle)}
  url=${ifDefined(url)}
></jio-report-infra-issue>`;

const expectToBeHelpdeskLink = (href: string) => {
  expect(href).toEqual('https://github.com/jenkins-infra/helpdesk/issues');
};

export const DefaultArgs: StoryObj<ReportInfraIssue> = {
  render,
  args: {},
  play: async ({canvasElement}) => {
    const reportInfraIssue = canvasElement.querySelector('jio-report-infra-issue') as ReportInfraIssue;
    expect(reportInfraIssue.shadowRoot.children).toHaveLength(0);
  }
};

export const RepoAndSourcePath: StoryObj<ReportInfraIssue> = {
  render,
  args: {
    sourcePath: 'src/stories/ReportInfraIssue.ts',
    githubRepo: 'jenkins-infra/jenkins-io-components',
  },
  play: async ({canvasElement, args}) => {
    const reportInfraIssue = canvasElement.querySelector('jio-report-infra-issue') as ReportInfraIssue;
    expect(reportInfraIssue.githubRepo).toEqual(args.githubRepo || 'jenkins-infra/jenkins-io-components');
    expect(reportInfraIssue.sourcePath).toEqual(args.sourcePath || 'src/stories/ReportInfraIssue.ts');

    expect(reportInfraIssue.shadowRoot.children).toHaveLength(1);
    expect(reportInfraIssue.shadowRoot.querySelector('a')).toHaveAttribute('title', 'Report an infrastructure issue related to src/stories/ReportInfraIssue.ts');
    expect(reportInfraIssue.shadowRoot.querySelector('a ion-icon')).toHaveAttribute('name', 'warning');
    expect(reportInfraIssue.shadowRoot.querySelector('a span')).toHaveTextContent('Report Infra Issue');

    expectToBeHelpdeskLink(reportInfraIssue.shadowRoot.querySelector('a').getAttribute('href'));
  }
};

export const NoRepo: StoryObj<ReportInfraIssue> = {
  render,
  args: {
    sourcePath: 'src/stories/ReportInfraIssue.ts',
  },
  play: async ({canvasElement}) => {
    const reportInfraIssue = canvasElement.querySelector('jio-report-infra-issue') as ReportInfraIssue;
    expect(reportInfraIssue.shadowRoot.children).toHaveLength(0);
  }
};

export const NoSourcePath: StoryObj<ReportInfraIssue> = {
  render,
  args: {
    githubRepo: 'jenkins-infra/jenkins-io-components',
  },
  play: async ({canvasElement, args}) => {
    const reportInfraIssue = canvasElement.querySelector('jio-report-infra-issue') as ReportInfraIssue;
    expect(reportInfraIssue.shadowRoot.children).toHaveLength(1);
    expect(reportInfraIssue.shadowRoot.querySelector('a')).toHaveAttribute('title', expect.stringContaining('Report an infrastructure issue related to http'));
    expect(reportInfraIssue.shadowRoot.querySelector('a ion-icon')).toHaveAttribute('name', 'warning');
    expect(reportInfraIssue.shadowRoot.querySelector('a span')).toHaveTextContent('Report Infra Issue');

    expectToBeHelpdeskLink(reportInfraIssue.shadowRoot.querySelector('a').getAttribute('href'));
  }
};

export const OverridePageTitle: StoryObj<ReportInfraIssue> = {
  render,
  args: {
    ...RepoAndSourcePath.args,
    pageTitle: 'thingie'
  },
  play: async ({canvasElement, args}) => {
    const reportInfraIssue = canvasElement.querySelector('jio-report-infra-issue') as ReportInfraIssue;

    expect(reportInfraIssue.shadowRoot.children).toHaveLength(1);
    expect(reportInfraIssue.shadowRoot.querySelector('a')).toHaveAttribute('title', expect.stringContaining('Report an infrastructure issue related to src/stories/ReportInfraIssue.ts'));
    expect(reportInfraIssue.shadowRoot.querySelector('a ion-icon')).toHaveAttribute('name', 'warning');
    expect(reportInfraIssue.shadowRoot.querySelector('a span')).toHaveTextContent('Report Infra Issue');

    expectToBeHelpdeskLink(reportInfraIssue.shadowRoot.querySelector('a').getAttribute('href'));
  }
};

export const OverrideURL: StoryObj<ReportInfraIssue> = {
  render,
  args: {
    ...RepoAndSourcePath.args,
    pageTitle: 'thingie',
    url: 'https://google.com/'
  },
  play: async ({canvasElement, args}) => {
    const reportInfraIssue = canvasElement.querySelector('jio-report-infra-issue') as ReportInfraIssue;

    expect(reportInfraIssue.shadowRoot.children).toHaveLength(1);
    expect(reportInfraIssue.shadowRoot.querySelector('a')).toHaveAttribute('title', expect.stringContaining('Report an infrastructure issue related to src/stories/ReportInfraIssue.ts'));
    expect(reportInfraIssue.shadowRoot.querySelector('a ion-icon')).toHaveAttribute('name', 'warning');
    expect(reportInfraIssue.shadowRoot.querySelector('a span')).toHaveTextContent('Report Infra Issue');

    expectToBeHelpdeskLink(reportInfraIssue.shadowRoot.querySelector('a').getAttribute('href'));
  }
};