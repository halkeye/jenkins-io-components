import {LitElement} from 'lit';
import {customElement} from 'lit/decorators.js';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    docsearch: any;
  }
}

@customElement('jio-searchbox')
export class Searchbox extends LitElement {
  get isReady() {
    return this._isReady;
  }

  private _isReady = false;

  addDocsearchCSS(root: HTMLElement | ShadowRoot) {
    // Add CSS to document body so popup works
    const linkFileEl = document.createElement('link');
    linkFileEl.setAttribute('rel', 'stylesheet');
    linkFileEl.setAttribute('type', 'text/css');
    linkFileEl.setAttribute('href', `https://cdn.jsdelivr.net/npm/@docsearch/css@3`);
    linkFileEl.setAttribute('media', 'all');
    root.appendChild(linkFileEl);

    const style = document.createElement('style');
    style.setAttribute('type', 'text/css');
    // make sure the search box is just below the navbar
    // default is top = 0
    style.appendChild(document.createTextNode(`.DocSearch-Container { top: 56px; }`));
    root.appendChild(style);
  }
  override connectedCallback() {
    super.connectedCallback();

    [document.head, this.renderRoot].forEach(root => this.addDocsearchCSS(root));

    // Load the behavior
    const scriptFileEl = document.createElement('script');
    scriptFileEl.setAttribute('defer', '');
    scriptFileEl.setAttribute('src', `https://cdn.jsdelivr.net/npm/@docsearch/js@3`);
    document.head.appendChild(scriptFileEl);
    scriptFileEl.addEventListener('load', () => {
      const div = document.createElement('div');
      this.renderRoot.appendChild(div);

      // enable docsearch
      window.docsearch({
        // point it at the renderroot
        container: div,
        indexName: 'jenkins',
        appId: "M6L7Q4Z8HS",
        apiKey: "52f8dfbff76ffd9106f1c68fee16154b",
        searchParameters: {
          facetFilters: ["lang:en"],
        },
      });
      this._isReady = true;
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'jio-searchbox': Searchbox;
  }
}


