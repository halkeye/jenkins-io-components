import {StoryObj, Meta} from '@storybook/web-components';
import {action} from '@storybook/addon-actions';
import {html} from 'lit';
import {ifDefined} from 'lit/directives/if-defined.js';
import {expect} from '@storybook/test';
import * as test from '@storybook/test';
import {userEvent} from '@storybook/test';

import {ChangelogRatings} from '../jio-changelog-ratings';
import '../jio-components';

export default {
  title: 'Example/ChangelogRatings',
  component: 'jio-changelog-ratings',
} as Meta;

function oneEvent(eventTarget: Element, eventName: string) {
  return new Promise((resolve) => {
    function listener(ev: Event) {
      resolve(ev);
      eventTarget.removeEventListener(eventName, listener);
    }
    eventTarget.addEventListener(eventName, listener);
  });
}

const render = ({good, nolike, rollback, version, ratings}) => {
  const ratingsJSON =
    ratings === undefined ? undefined : JSON.stringify(ratings);
  return html`<jio-changelog-ratings
    @changelog-ratings-rated=${action('changelog-ratings-rated')}
    @changelog-ratings-canceled=${action('changelog-ratings-canceled')}
    good=${ifDefined(good)}
    nolike=${ifDefined(nolike)}
    rollback=${ifDefined(rollback)}
    version=${ifDefined(version)}
    ratings=${ifDefined(ratingsJSON)}
  ></jio-changelog-ratings>`;
};

export const AllArgs: StoryObj<ChangelogRatings> = {
  render,
  args: {
    good: 10,
    nolike: 20,
    rollback: 30,
    version: '2.345',
    ratings: ['63232', 1, '63506', 3, '61990', 5],
  },
  play: async ({canvasElement}) => {
    const wc = canvasElement.querySelector(
      'jio-changelog-ratings'
    ) as ChangelogRatings;
    expect(wc.shadowRoot.children).toHaveLength(1);
    expect(wc.shadowRoot.children[0].children).toHaveLength(4);

    expect(wc.shadowRoot.querySelectorAll('span')[0]).toHaveAttribute(
      'data-direction',
      'good'
    );
    expect(
      wc.shadowRoot
        .querySelectorAll('span')[0]
        .querySelector('jio-changelog-weather-icon')
    ).toHaveAttribute('count', '10');
    expect(
      wc.shadowRoot
        .querySelectorAll('span')[0]
        .querySelector('jio-changelog-weather-icon')
    ).toHaveAttribute('mode', 'sunny');

    expect(wc.shadowRoot.querySelectorAll('span')[1]).toHaveAttribute(
      'data-direction',
      'nolike'
    );
    expect(
      wc.shadowRoot
        .querySelectorAll('span')[1]
        .querySelector('jio-changelog-weather-icon')
    ).toHaveAttribute('count', '20');
    expect(
      wc.shadowRoot
        .querySelectorAll('span')[1]
        .querySelector('jio-changelog-weather-icon')
    ).toHaveAttribute('mode', 'cloudy');

    expect(wc.shadowRoot.querySelectorAll('span')[2]).toHaveAttribute(
      'data-direction',
      'rollback'
    );
    expect(
      wc.shadowRoot
        .querySelectorAll('span')[2]
        .querySelector('jio-changelog-weather-icon')
    ).toHaveAttribute('count', '30');
    expect(
      wc.shadowRoot
        .querySelectorAll('span')[2]
        .querySelector('jio-changelog-weather-icon')
    ).toHaveAttribute('mode', 'storm');

    expect(
      wc.shadowRoot.querySelector('span.related-issues')
    ).toHaveTextContent('Community reported issues:');

    let issueContainer = wc.shadowRoot.querySelectorAll(
      'span.related-issues span'
    )[0];
    expect(issueContainer).toHaveTextContent('5×JENKINS-61990');
    expect(issueContainer.querySelector('a')).toHaveAttribute(
      'href',
      'https://issues.jenkins.io/browse/JENKINS-61990'
    );

    issueContainer = wc.shadowRoot.querySelectorAll(
      'span.related-issues span'
    )[1];
    expect(issueContainer).toHaveTextContent('3×JENKINS-63506');
    expect(issueContainer.querySelector('a')).toHaveAttribute(
      'href',
      'https://issues.jenkins.io/browse/JENKINS-63506'
    );

    issueContainer = wc.shadowRoot.querySelectorAll(
      'span.related-issues span'
    )[2];
    expect(issueContainer).toHaveTextContent('1×JENKINS-63232');
    expect(issueContainer.querySelector('a')).toHaveAttribute(
      'href',
      'https://issues.jenkins.io/browse/JENKINS-63232'
    );
  },
};

export const Good: StoryObj<ChangelogRatings> = {
  render,
  name: 'triggers event when good without asking for issue',
  args: AllArgs.args,
  play: async ({canvasElement}) => {
    const spy = test.spyOn(window, 'prompt');

    test.mocked(window.prompt).mockImplementation(() => {
      return undefined;
    });

    const wc = canvasElement.querySelector(
      'jio-changelog-ratings'
    ) as ChangelogRatings;

    const listener = oneEvent(wc, 'changelog-ratings-rated');
    userEvent.click(wc.shadowRoot.querySelector('[data-direction="good"]'));

    const {detail} = (await listener) as CustomEvent;

    expect(window.prompt).toHaveBeenCalledTimes(0);
    expect(detail).toEqual({version: '2.345', rating: 1, issue: undefined});

    spy.mockRestore();
  },
};

// NoLink

export const NoLikeNoValueEntered: StoryObj<ChangelogRatings> = {
  render,
  name: 'click no like/emit event when no issue provided',
  args: AllArgs.args,
  play: async ({canvasElement}) => {
    const spy = test.spyOn(window, 'prompt');

    test
      .mocked(window.prompt)
      .mockImplementationOnce(() => {
        return '';
      })
      .mockImplementationOnce(() => {
        return '';
      });

    const wc = canvasElement.querySelector(
      'jio-changelog-ratings'
    ) as ChangelogRatings;

    const listener = oneEvent(wc, 'changelog-ratings-rated');
    userEvent.click(wc.shadowRoot.querySelector('[data-direction="nolike"]'));

    const {detail} = (await listener) as CustomEvent;

    expect(window.prompt).toHaveBeenCalledTimes(2);
    expect(detail).toEqual({version: '2.345', rating: 0, issue: ''});

    spy.mockRestore();
  },
};

export const NoLikeOneValueEntered: StoryObj<ChangelogRatings> = {
  render,
  name: 'click no like/emit event when issue provided second time',
  args: AllArgs.args,
  play: async ({canvasElement}) => {
    const spy = test.spyOn(window, 'prompt');

    test
      .mocked(window.prompt)
      .mockImplementationOnce(() => {
        return '';
      })
      .mockImplementationOnce(() => {
        return 'JENKINS-123';
      });

    const wc = canvasElement.querySelector(
      'jio-changelog-ratings'
    ) as ChangelogRatings;

    const listener = oneEvent(wc, 'changelog-ratings-rated');
    userEvent.click(wc.shadowRoot.querySelector('[data-direction="nolike"]'));

    const {detail} = (await listener) as CustomEvent;

    expect(window.prompt).toHaveBeenCalledTimes(2);
    expect(detail).toEqual({version: '2.345', rating: 0, issue: 'JENKINS-123'});

    spy.mockRestore();
  },
};

export const NoLikeFirstValueEntered: StoryObj<ChangelogRatings> = {
  render,
  name: 'click no like/emit event when issue provided first time',
  args: AllArgs.args,
  play: async ({canvasElement}) => {
    const spy = test.spyOn(window, 'prompt');

    test.mocked(window.prompt).mockImplementationOnce(() => {
      return 'JENKINS-123';
    });

    const wc = canvasElement.querySelector(
      'jio-changelog-ratings'
    ) as ChangelogRatings;

    const listener = oneEvent(wc, 'changelog-ratings-rated');
    userEvent.click(wc.shadowRoot.querySelector('[data-direction="nolike"]'));

    const {detail} = (await listener) as CustomEvent;

    expect(window.prompt).toHaveBeenCalledTimes(1);
    expect(detail).toEqual({version: '2.345', rating: 0, issue: 'JENKINS-123'});

    spy.mockRestore();
  },
};

// Rollback

export const RollbackNoValueEntered: StoryObj<ChangelogRatings> = {
  render,
  name: 'click rollback/emit event when no issue provided',
  args: AllArgs.args,
  play: async ({canvasElement}) => {
    const spy = test.spyOn(window, 'prompt');

    test
      .mocked(window.prompt)
      .mockImplementationOnce(() => {
        return '';
      })
      .mockImplementationOnce(() => {
        return '';
      });

    const wc = canvasElement.querySelector(
      'jio-changelog-ratings'
    ) as ChangelogRatings;

    const listener = oneEvent(wc, 'changelog-ratings-rated');
    userEvent.click(wc.shadowRoot.querySelector('[data-direction="rollback"]'));

    const {detail} = (await listener) as CustomEvent;

    expect(window.prompt).toHaveBeenCalledTimes(2);
    expect(detail).toEqual({version: '2.345', rating: -1, issue: ''});

    spy.mockRestore();
  },
};

export const RollbackOneValueEntered: StoryObj<ChangelogRatings> = {
  render,
  name: 'click rollback/emit event when issue provided second time',
  args: AllArgs.args,
  play: async ({canvasElement}) => {
    const spy = test.spyOn(window, 'prompt');

    test
      .mocked(window.prompt)
      .mockImplementationOnce(() => {
        return '';
      })
      .mockImplementationOnce(() => {
        return 'JENKINS-123';
      });

    const wc = canvasElement.querySelector(
      'jio-changelog-ratings'
    ) as ChangelogRatings;

    const listener = oneEvent(wc, 'changelog-ratings-rated');
    userEvent.click(wc.shadowRoot.querySelector('[data-direction="rollback"]'));

    const {detail} = (await listener) as CustomEvent;

    expect(window.prompt).toHaveBeenCalledTimes(2);
    expect(detail).toEqual({
      version: '2.345',
      rating: -1,
      issue: 'JENKINS-123',
    });

    spy.mockRestore();
  },
};

export const RollbackFirstValueEntered: StoryObj<ChangelogRatings> = {
  render,
  name: 'click rollback/emit event when issue provided first time',
  args: AllArgs.args,
  play: async ({canvasElement}) => {
    const spy = test.spyOn(window, 'prompt');

    test.mocked(window.prompt).mockImplementationOnce(() => {
      return 'JENKINS-123';
    });

    const wc = canvasElement.querySelector(
      'jio-changelog-ratings'
    ) as ChangelogRatings;

    const listener = oneEvent(wc, 'changelog-ratings-rated');
    userEvent.click(wc.shadowRoot.querySelector('[data-direction="rollback"]'));

    const {detail} = (await listener) as CustomEvent;

    expect(window.prompt).toHaveBeenCalledTimes(1);
    expect(detail).toEqual({
      version: '2.345',
      rating: -1,
      issue: 'JENKINS-123',
    });

    spy.mockRestore();
  },
};
