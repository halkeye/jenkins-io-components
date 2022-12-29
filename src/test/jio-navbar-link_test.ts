import {NavbarLink} from '../jio-navbar-link.js';

import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('jio-navbar-link', () => {
  suite('default variables', async () => {
    test('renders properly by default', async () => {
      const el = (await fixture(html`<jio-navbar-link>Link Title</jio-navbar-link>`)) as NavbarLink;
      assert.instanceOf(el, NavbarLink);
      assert.shadowDom.equal(el, `<a class="active nav-link" href="/"><slot></slot></a>`);
      assert.lightDom.equal(el, `Link Title`);
    });
    test('is accessible', async () => {
      const el = (await fixture(html`<jio-navbar-link>Link Title</jio-navbar-link>`)) as NavbarLink;
      assert.instanceOf(el, NavbarLink);
      return assert.isAccessible(el);
    });
  });
  suite('populated variables', async () => {
    test('is accessible', async () => {
      const property = "https://webcomponents.jenkins.io";

      const el = (await fixture(html`<jio-navbar-link href="/path/to" .property=${property}>someLabel</jio-navbar-link>`)) as NavbarLink;
      assert.instanceOf(el, NavbarLink);
      return assert.isAccessible(el);
    });
    test('relative link with non matching property should render full url', async () => {
      const property = "https://webcomponents.jenkins.io";

      const el = (await fixture(html`<jio-navbar-link href="/path/to" .property=${property}>someLabel</jio-navbar-link>`)) as NavbarLink;
      assert.instanceOf(el, NavbarLink);
      assert.shadowDom.equal(el, `<a class="nav-link" href="https://www.jenkins.io/path/to"><slot></slot></a>`);
      assert.lightDom.equal(el, `someLabel`);
    });

    test('relative link with matching property should render full url', async () => {
      const property = "https://www.jenkins.io";

      const el = (await fixture(html`<jio-navbar-link href="/path/to" .property=${property}>someLabel</jio-navbar-link>`)) as NavbarLink;
      assert.instanceOf(el, NavbarLink);
      assert.shadowDom.equal(el, `<a class="nav-link" href="/path/to"><slot></slot></a>`);
      assert.lightDom.equal(el, `someLabel`);
    });
    test('absolute link with non matching property should render full url', async () => {
      const property = "https://webcomponents.jenkins.io";

      const el = (await fixture(html`<jio-navbar-link
                                href="https://plugins.jenkins.io/path/to"
                                .property=${property}>someLabel</jio-navbar-link>`)) as NavbarLink;
      assert.instanceOf(el, NavbarLink);
      assert.shadowDom.equal(el, `<a class="nav-link" href="https://plugins.jenkins.io/path/to"><slot></slot></a>`);
      assert.lightDom.equal(el, `someLabel`);
    });
    test('absolute link with matching property should render full url', async () => {
      const property = "https://plugins.jenkins.io";

      const el = (await fixture(html`<jio-navbar-link
                                href="https://plugins.jenkins.io/path/to"
                                .property=${property}>someLabel</jio-navbar-link>`)) as NavbarLink;
      assert.instanceOf(el, NavbarLink);
      assert.shadowDom.equal(el, `<a class="nav-link" href="/path/to"><slot></slot></a>`);
      assert.lightDom.equal(el, `someLabel`);
    });
  });
});
