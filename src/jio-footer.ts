import {LitElement, html, nothing, TemplateResult} from 'lit';
import {ifDefined} from 'lit/directives/if-defined.js';
import {customElement, property} from 'lit/decorators.js';
import {msg, localized} from '@lit/localize';

import {relOrAbsoluteLink} from './jio-navbar-link';

import './jio-improve-this-page';
import './jio-report-a-problem';
import './jio-report-infra-issue';

import globalStyles from './global.css';
import containerStyles from './container.css';
import colStyles from './col.css';
import componentStyles from './jio-footer.css';

const licenseHtmls = {
   'cc-sa': html`
     <div id="creativecommons">
        <a href="https://creativecommons.org/licenses/by-sa/4.0/">
           <p>
              <img alt=${msg('Creative Commons Attribution-ShareAlike license')}
                   src="https://mirrors.creativecommons.org/presskit/buttons/88x31/svg/by-sa.svg"
                   width="88" height="31"
              >
           </p>
        </a>
        <p>
           ${msg('The content driving this site is licensed under the Creative Commons Attribution-ShareAlike 4.0 license.')}
        </p>
     </div>`
} as Record<string, TemplateResult>;

/**
 * Standard jenkins.io footer
 */
@localized()
@customElement('jio-footer')
export class Footer extends LitElement {
   static override styles = [globalStyles, containerStyles, colStyles, componentStyles];

   @property()
   license = 'cc-sa';

   @property()
   property = 'https://www.jenkins.io';
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

   /**
    * The name of the bug report template to use
    */
   @property({type: String})
   reportAProblemTemplate = "";

   override render() {
      // Check if the current page is /download or /download/mirrors
      const isDownloadPage = this.sourcePath.includes('/download/') || this.sourcePath.includes('/download/mirrors/');

      return html`
<footer>
   <div class="container">
      <div class="row">
         <div class="col-md-4 col1">
            <p class="box">
               <jio-improve-this-page sourcePath=${this.sourcePath} githubRepo=${this.githubRepo} .githubBranch=${ifDefined(this.githubBranch)}></jio-improve-this-page>
               ${isDownloadPage
                  ? html`<jio-report-infra-issue sourcePath=${this.sourcePath} githubRepo=${this.githubRepo} .githubBranch=${ifDefined(this.githubBranch)}></jio-report-infra-issue>`
                  : html`<jio-report-a-problem sourcePath=${this.sourcePath} githubRepo=${this.githubRepo} .githubBranch=${ifDefined(this.githubBranch)} .template=${ifDefined(this.reportAProblemTemplate)}></jio-report-a-problem>`
               }
            </p>
            <div class="license-box">
              ${licenseHtmls[this.license] || nothing}
            </div>
         </div>
         <div class="links col-md-8">
            <div class="container">
               <div class="row">
                  <div class="area col-md-3">
                     <div class="div-mar">
                        <h5>Resources</h5>
                        <ul class="resources">
                           <li>
                              <a href=${relOrAbsoluteLink('/download/', this.property).href}>${msg('Downloads')}</a>
                           </li>
                           <li>
                              <a href=${relOrAbsoluteLink('/blog/', this.property).href}>${msg('Blog')}</a>
                           </li>
                           <li>
                              <a href=${relOrAbsoluteLink('/doc/', this.property).href}>${msg('Documentation')}</a>
                           </li>
                           <li>
                              <a href=${relOrAbsoluteLink('https://plugins.jenkins.io/', this.property).href}>${msg('Plugins')}</a>
                           </li>
                           <li>
                              <a href=${relOrAbsoluteLink('/security/', this.property).href}>${msg('Security')}</a>
                           </li>
                           <li>
                              <a href=${relOrAbsoluteLink('/participate/', this.property).href}>${msg('Contributing')}</a>
                           </li>
                        </ul>
                     </div>
                  </div>
                  <div class="area col-md-3">
                     <div class="div-mar">
                        <h5>Project</h5>
                        <ul class="project">
                           <li>
                              <a href=${relOrAbsoluteLink('/project/', this.property).href}>${msg('Structure and governance')}</a>
                           </li>
                           <li>
                              <a href=${relOrAbsoluteLink('https://issues.jenkins.io', this.property).href}>${msg('Issue tracker')}</a>
                           </li>
                           <li>
                              <a href=${relOrAbsoluteLink('/project/roadmap/', this.property).href}>${msg('Roadmap')}</a>
                           </li>
                           <li>
                              <a href=${relOrAbsoluteLink('https://github.com/jenkinsci', this.property).href}>${msg('GitHub')}</a>
                           </li>
                           <li>
                              <a href=${relOrAbsoluteLink('https://ci.jenkins.io', this.property).href}>${msg('Jenkins on Jenkins')}</a>
                           </li>
                           <li>
                              <a href=${relOrAbsoluteLink('https://stats.jenkins.io', this.property).href}>${msg('Statistics')}</a>
                           </li>
                        </ul>
                     </div>
                  </div>
                  <div class="area col-md-3">
                     <div class="div-mar">
                        <h5>Community</h5>
                        <ul class="community">
                           <li>
                              <a href=${relOrAbsoluteLink('https://community.jenkins.io', this.property).href}>${msg('Forum')}</a>
                           </li>
                           <li>
                              <a href=${relOrAbsoluteLink('/events/', this.property).href}>${msg('Events')}</a>
                           </li>
                           <li>
                              <a href=${relOrAbsoluteLink('/mailing-lists/', this.property).href}>${msg('Mailing lists')}</a>
                           </li>
                           <li>
                              <a href=${relOrAbsoluteLink('/chat/', this.property).href}>${msg('Chats')}</a>
                           </li>
                           <li>
                              <a href=${relOrAbsoluteLink('/sigs/', this.property).href}>${msg('Special Interest Groups')}</a>
                           </li>
                           <li>
                              <a href=${relOrAbsoluteLink('https://twitter.com/jenkinsci', this.property).href}>${msg('𝕏 (formerly Twitter)')}</a>
                           </li>
                           <li>
                              <a href=${relOrAbsoluteLink('https://reddit.com/r/jenkinsci', this.property).href}>${msg('Reddit')}</a>
                           </li>
                        </ul>
                     </div>
                  </div>
                  <div class="area col-md-3">
                     <div class="div-mar">
                        <h5>Other</h5>
                        <ul class="other">
                           <li>
                              <a href=${relOrAbsoluteLink('/project/conduct/', this.property).href}>${msg('Code of Conduct')}</a>
                           </li>
                           <li>
                              <a href=${relOrAbsoluteLink('/press/', this.property).href}>${msg('Press information')}</a>
                           </li>
                           <li>
                              <a href=${relOrAbsoluteLink('/merchandise/', this.property).href}>${msg('Merchandise')}</a>
                           </li>
                           <li>
                              <a href=${relOrAbsoluteLink('/artwork/', this.property).href}>${msg('Artwork')}</a>
                           </li>
                           <li>
                              <a href=${relOrAbsoluteLink('/awards/', this.property).href}>${msg('Awards')}</a>
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</footer>
    `;
   }
}

declare global {
   interface HTMLElementTagNameMap {
      'jio-footer': Footer;
   }
}