import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {ionIconText} from './shared-styles';
import {msg, str, localized} from '@lit/localize';

@localized()
@customElement('jio-report-infra-issue')
export class ReportInfraIssue extends LitElement {
  static override styles = [
    ionIconText,
    css`
      ion-icon { color: #FFA91B; }
    `
  ];

  /**
   * Overrides the page title. Defaults to page title
   */
  @property()
  pageTitle = '';

  /**
   * Overrides the page title. Defaults to page url
   */
  @property()
  url = '';

  /**
   * Github source path relative to $githubRepo
   */
  @property()
  sourcePath = '';

  /**
   * Github repo
   */
  @property()
  githubRepo = '';

  /**
   * Github branch
   */
  @property()
  githubBranch = 'master';

  get locationHref() {
    const _location = typeof location !== 'undefined' ? location : {href: 'http://unknown'};
    return _location.href;
  }

  get windowTitle() {
    const _document = typeof document !== 'undefined' ? document : {title: 'Unknown'};
    return _document.title;
  }

  get derivedTitle() {
    return this.pageTitle || this.windowTitle;
  }

  get derivedUrl() {
    return this.url || this.locationHref;
  }

  override render() {
    // Only render the link if githubRepo is provided
    if (!this.githubRepo) {
      return null;
    }

    return html`
      <a href="https://github.com/jenkins-infra/helpdesk/issues" title=${msg(str`Report an infrastructure issue related to ${this.sourcePath || this.derivedUrl}`)}>
        <ion-icon class="report" name="warning"></ion-icon>
        <span class="text">${msg('Report Infra Issue')}</span>
      </a>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'jio-report-infra-issue': ReportInfraIssue;
  }
}