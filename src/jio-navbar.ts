import {LitElement, html, nothing, TemplateResult} from 'lit';
import {customElement, state, property} from 'lit/decorators.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import {msg, localized} from '@lit/localize';

import './jio-locale';
import './jio-cdf-logo';
import './jio-navbar-link';
import './jio-searchbox';

import globalStyles from './global.css';
import styles from './jio-navbar.css';

export type NavbarItemLink = {
  label: TemplateResult | string;
  link: string | Array<NavbarItemLink>;
  header?: boolean;
  title?: string;
};

export type Theme = 'dark' | 'light' | 'auto';

@localized()
@customElement('jio-navbar')
export class Navbar extends LitElement {
  static override styles = [globalStyles, styles];

  /**
   * Eg plugins.jenkins.io
   */
  @property()
  property = 'https://www.jenkins.io';

  /**
   * Show search box
   */
  @property({type: Boolean})
  showSearchBox: Boolean = false;

  @property()
  locationPathname: string = location.pathname;


  /**
   * Header theme (light/dark/auto)
   */
  @property()
  theme = 'light';

  /**
   * Keeps track of what menu is opened.
   *
   * Never to be set externally, though storybook shows it.
   * @private
   */
  @state()
  private visibleMenu = -1;

  /**
   * Keeps track if the collapsed (mobile) menu is shown or not
   *
   * Never to be set externally, though storybook shows it.
   * @private
   */
  @state()
  private menuToggled = false;

  constructor() {
    super();
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
  }

  override connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this.handleDocumentClick);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this.handleDocumentClick);
  }

  handleDocumentClick() {
    this.visibleMenu = -1;
  }

  override render() {
    const cdfMenuItems = [
      {label: msg("What is CDF?"), link: "https://cd.foundation/"},
      {label: msg("Jenkins X"), link: "https://jenkins-x.io/"},
      {label: msg("Tekton"), link: "https://tekton.dev/"},
      {label: msg("Spinnaker"), link: "https://www.spinnaker.io/"},
    ];
    const menuItems = [
      {label: msg("Blog"), link: "/blog/"},
      {label: msg("Success Stories"), link: "https://stories.jenkins.io/"},
      {label: msg("Contributor Spotlight"), link: "https://contributors.jenkins.io/"},
      {
        label: msg("Documentation"), link: [
          {
            label: msg("User Guide"), link: "/doc/book", header: true
          },
          {label: "- " + msg("Installing Jenkins"), link: "/doc/book/installing/"},
          {label: "- " + msg("Jenkins Pipeline"), link: "/doc/book/pipeline/"},
          {label: "- " + msg("Managing Jenkins"), link: "/doc/book/managing/"},
          {label: "- " + msg("Securing Jenkins"), link: "/doc/book/security/"},
          {label: "- " + msg("System Administration"), link: "/doc/book/system-administration/"},
          {label: "- " + msg("Troubleshooting Jenkins"), link: "/doc/book/troubleshooting/"},
          {label: "- " + msg("Terms and Definitions"), link: "/doc/book/glossary/"},
          {label: msg("Solution Pages"), link: "/solutions", header: true},
          {
            label: msg("Tutorials"), link: "/doc/tutorials", header: true
          },
          {
            label: msg("Developer Guide"), link: "/doc/developer", header: true
          },
          {label: msg("Contributor Guide"), link: "/participate", header: true},
          {label: msg("Books"), link: "/books", header: true},
        ]
      },
      {label: msg("Plugins"), link: "https://plugins.jenkins.io/"},
      {
        label: msg("Community"), link: [
          {
            label: msg("Overview"), link: "/participate/"
          },
          {
            label: msg("Chat"), link: "/chat/", title: "Chat with the rest of the Jenkins community on IRC"
          },
          {label: msg("Meet"), link: "/projects/jam/"},
          {
            label: msg("Events"), link: "/events/"
          },
          {label: msg("Forum"), link: "https://community.jenkins.io/"},
          {label: msg("Issue Tracker"), link: "https://issues.jenkins.io/"},
          {label: msg("Mailing Lists"), link: "/mailing-lists/", title: "Browse Jenkins mailing list archives and/ or subscribe to lists"},
          {label: msg("Roadmap"), link: "/project/roadmap/"},
          {label: msg("Account Management"), link: "https://accounts.jenkins.io/", title: "Create/manage your account for accessing wiki, issue tracker, etc"},
          {
            label: msg("Special Interest Groups"), link: "/sigs/", header: true
          },
          {label: "- " + msg("Advocacy and Outreach"), link: "/sigs/advocacy-and-outreach/"},
          {label: "- " + msg("Documentation"), link: "/sigs/docs/"},
          {label: "- " + msg("Google Summer of Code"), link: "/sigs/gsoc/"},
          {label: "- " + msg("Platform"), link: "/sigs/platform/"},
          {label: "- " + msg("User Experience"), link: "/sigs/ux/"},
        ]
      },
      {
        label: msg("Subprojects"), link: [
          {
            label: msg("Overview"), link: "/projects/"
          },
          {label: msg("Google Summer of Code in Jenkins"), link: "/projects/gsoc/"},
          {label: msg("Infrastructure"), link: "/projects/infrastructure/"},
          {label: msg("CI/CD and Jenkins Area Meetups"), link: "/projects/jam/"},
          {label: msg("Jenkins Configuration as Code"), link: "/projects/jcasc/"},
          {label: msg("Jenkins Operator"), link: "/projects/jenkins-operator/"},
          {label: msg("Jenkins Remoting"), link: "/projects/remoting/"},
          {label: msg("Document Jenkins on Kubernetes"), link: "/sigs/docs/gsod/2020/projects/document-jenkins-on-kubernetes/"},
        ]
      },
      {
        label: msg("Security"), link: [
          {
            label: msg("Overview"), link: "/security/"
          },
          {label: msg("Security Advisories"), link: "/security/advisories/"},
          {label: msg("Reporting Vulnerabilities"), link: "/security/reporting/"},
        ]
      },
      {
        label: msg("About"), link: [
          {label: msg("Roadmap"), link: "/project/roadmap/"},
          {
            label: msg("Press"), link: "/press/"
          },
          {
            label: msg("Awards"), link: "/awards/"
          },
          {label: msg("Conduct"), link: "/project/conduct/"},
          {label: msg("Artwork"), link: "/artwork/"},
        ]
      }
    ] as Array<NavbarItemLink>;
    const menuItemsHtml = menuItems.map((menuItem, idx) => {
      let body;
      if (menuItem.link && Array.isArray(menuItem.link)) {
        // eslint-disable-next-line lit/no-this-assign-in-render
        body = this.renderNavItemDropdown(menuItem, idx, this.visibleMenu === idx);
      } else {
        // eslint-disable-next-line lit/no-this-assign-in-render
        body = html`<li class="nav-item">${this.renderNavItemLink(menuItem)}</li>`;
      }
      return body;
    });
    const searchboxHtml = !this.showSearchBox ? nothing : html`<jio-searchbox @click=${this._handleSearchboxClick}></jio-searchbox>`;
    return html`
      <nav class="navbar" data-theme=${this.theme}>
        <span class="navbar-brand">
          <slot name="brand">
            <a href="/">Jenkins</a>
          </slot>
        </span>
        <button
          class="navbar-toggler collapsed btn"
          type="button"
          @click=${this._clickCollapseButton}
          aria-controls="navbarSupportedContent"
          aria-expanded=${this.menuToggled}
          aria-label="Toggle navigation">
          <ion-icon name=${this.menuToggled ? "close-outline" : "menu-outline"} title="Toggle Menu Visible"></ion-icon>
        </button>
        <div class="navbar-menu collapse ${this.menuToggled ? "show" : ""}">
          <ul class="nav navbar-nav mr-auto">
            ${this.renderNavItemDropdown({label: html`<jio-cdf-logo></jio-cdf-logo>`, link: cdfMenuItems}, 99, this.visibleMenu === 99)}
          </ul>
          <ul class="nav navbar-nav ml-auto">
            ${menuItemsHtml}
            <li class="nav-item download-btn">
              ${this.renderNavItemLink({link: '/download/', label: 'Download', }, ['btn btn-outline-secondary'])}
            </li>
            <slot name="rightMenuItems" @slotchange=${this.handleSlotchange}></slot>
          </ul>
        </div>
        ${searchboxHtml}
      </nav>
    `;
  }

  handleSlotchange(e: Event) {
    const slotElement = (e.target as HTMLSlotElement);
    const assignedElements = slotElement.assignedElements();
    const container = slotElement.parentNode as HTMLElement;
    for (const element of assignedElements) {
      //if (element.slot === "rightMenuItems") {
      //  const divider = document.createElement('li');
      //  divider.className = "divider";
      //  container.appendChild(divider);
      //}
      for (const link of element.querySelectorAll('jio-navbar-link')) {
        const wrapper = document.createElement('li');
        wrapper.className = "nav-item";
        wrapper.appendChild(link);
        container.appendChild(wrapper);
      }
    }
  }

  renderNavItemDropdown(menuItem: NavbarItemLink, idx: number, visible: Boolean) {
    if (!Array.isArray(menuItem.link)) {
      return this.renderNavItemLink(menuItem);
    }
    const linksHtml = menuItem.link.map(menuItem => this.renderNavItemLink(menuItem, ['dropdown-item feature']));
    return html`
      <li class="nav-item dropdown">
        <button
          @click=${this._toggleDropdown}
          @mouseover = ${this._toggleDropdownHover}
          data-idx=${idx}
          aria-expanded=${visible ? "true" : "false"}
          aria-haspopup="true"
          class="nav-link dropdown-toggle ${visible ? "show" : ""}"
        >${menuItem.label}</button>
        <div class="dropdown-menu ${visible ? "show" : ""}">
          ${linksHtml}
        </div>
      </li>
    `;
  }

  renderNavItemLink(menuItem: NavbarItemLink, extraClasses: Array<string> = []) {
    if (Array.isArray(menuItem.link)) {
      throw new Error('dropdown passed into render item');
    }

    // TODO - header navbar links should never be active
    return html`<jio-navbar-link
      .class=${ifDefined(extraClasses.join(" "))}
      .locationPathname=${ifDefined(this.locationPathname)}
      .property=${this.property}
      ?header=${menuItem.header}
      href=${menuItem.link}
      title=${ifDefined(menuItem.title)}
      >${menuItem.header ? html`<strong>${menuItem.label}</strong>` : menuItem.label}</jio-navbar-link>`;
  }

  private _clickCollapseButton(e: Event) {
    e.preventDefault();
    this.menuToggled = !this.menuToggled;
  }

  private _handleSearchboxClick() {
    if (this.menuToggled) {
      this.menuToggled = false;
    }
  }

  private _toggleDropdown(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    const dataset = (e.currentTarget as HTMLElement).dataset;
    if (this.visibleMenu === parseInt(dataset.idx || "-2", 10)) {
      this.visibleMenu = -1;
    } else {
      this.visibleMenu = parseInt(dataset.idx || "-1", 10);
    }
  }

  private _toggleDropdownHover(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    if (window.innerWidth > 1024) {
      const dataset = (e.currentTarget as HTMLElement).dataset;
      this.visibleMenu = parseInt(dataset.idx || "-1", 10);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'jio-navbar': Navbar;
  }
}


