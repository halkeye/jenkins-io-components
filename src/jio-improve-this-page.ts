import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {ionIconText} from './shared-styles';
import {msg, str, localized} from '@lit/localize';

@localized()
@customElement('jio-improve-this-page')
export class ImproveThisPage extends LitElement {
  static override styles = [
    ionIconText,
    css`
      ion-icon { color: black; }
    `
  ];

  /**
   * Github source path relative to $githubRepo
   */
  @property({ attribute: 'source-path' })
  sourcePath = '';

  /**
   * Github repo
   */
  @property({ attribute: 'github-repo' })
  githubRepo = '';

  /**
   * Github branch
   */
  @property({ attribute: 'github-branch' })
  githubBranch = 'master';

  override render() {
    if (!this.sourcePath) {return null;}
    if (!this.githubRepo) {return null;}
    const sourcePath = this.sourcePath;
    const githubRepo = this.githubRepo;
    const githubBranch = this.githubBranch;

    return html`
    <a href=${`https://github.com/${githubRepo}/edit/${githubBranch}/${sourcePath}`} title=${msg(str`Edit ${sourcePath} on GitHub`)} rel="noreferrer noopener">
      <ion-icon name="logo-github"></ion-icon>
      <span class="text">${msg('Improve this page')}</span>
     </a>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'jio-improve-this-page': ImproveThisPage;
  }
}
