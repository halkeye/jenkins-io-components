import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import './jio-datetime-box.js';

@customElement('jio-eventbox')
export class EventBox extends LitElement {
  static override styles = css`
    :host {
      border: 10px solid green;
    }
  `;

  @property()
  date: string | number | undefined;

  @property({ attribute: 'end-date' })
  endDate: string | number | undefined;

  @property({type: String})
  link = "";

  @property({type: String})
  location = "";

  override render() {
    if (!this.date) {return;}

    return html`
      <a class="body" href=${this.link} rel="noreferrer noopener" target="_blank">
        <div class="header time">
          <!-- jio-datetime START -->
          <jio-datetime-box .date=${this.date} .endDate=${this.endDate}></jio-datetime-box>
          <h5 class="title">${this.title}</h5>
          ${this.location}
        </div>
        <div class="teaser">
          <slot name="teaser"></slot>
          <div class="more"></div>
        </div>
      </a>
      <div class="attrs"></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'jio-event': EventBox;
  }
}
