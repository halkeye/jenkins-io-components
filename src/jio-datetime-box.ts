import {LitElement, html, nothing, css, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';

const SHORT_MONTH_NAMES = Object.freeze([
  'Jan', 'Feb', 'March', 'April', 'May', 'Jun',
  'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec',
]);

//const DAYS_OF_WEEK = Object.freeze([
//  null,
//  'Monday',
//  'Tuesday',
//  'Wednesday',
//  'Thursday',
//  'Friday',
//  'Saturday',
//  'Sunday',
//]);

const dateConverter = (value: string | number | undefined): Date | undefined => {
  if (!value) {return undefined;}
  if (/^\d+$/.test(value.toString())) {
    return new Date(parseInt(value.toString(), 10));
  } else {
    return new Date(Date.parse(value.toString()));
  }
};


@customElement('jio-datetime-box')
export class DatetimeBox extends LitElement {
  static override styles = css`
  .date-time {
    background: #157ea7;
    border-radius:.5em;
    color: #fff;
    display: inline-block;
    font-size: 1rem;
    font-size: .75rem;
    height: 4.75em;
    overflow: hidden;
    padding: 0.5em;
    position: relative;
    text-align: center;
    width: 4.75em;
  }

  .date {
    background: rgba(180,40,40,.85);
    border: 1px solid rgba(180,40,40,.85);
    border-top-left-radius: 0.5em;
    border-top-right-radius: 0.5em;
    box-shadow: 0 1px 5px rgb(0 0 0 / 15%);
    font-size: .75em;
    font-weight: normal;
    height: 2em;
    line-height: 2em;
    margin-left: -0.75em;
    margin-right: -0.75em;
    margin-top: -0.75em;
    text-align: center;
  }

  .time{
    font-size: 1.1em;
    white-space: nowrap;
    line-height: 3em;
    height: 3em;
  }
  `;

  /**
   * Whats the start time of this date
  */
  @property()
  date: string | number | undefined;

  /**
   * Whats the end time of this date
   * @optional
  */
  @property({ attribute: 'end-date' })
  endDate: string | number | undefined;  

  override render() {
    const date = dateConverter(this.date) || new Date();
    const endDate = dateConverter(this.endDate);

    let endDateHtml: symbol | TemplateResult = nothing;
    if (endDate) {
      endDateHtml = html`
      -
        <time datetime=${endDate.toISOString()} title="End Time">
          <span class="month">${SHORT_MONTH_NAMES[endDate.getUTCMonth()]}</span>
          <span class="day">${endDate.getUTCDate().toString().padStart(2, '0')}</span>
        </time>
      `;
    }
    return html`
        <div class="date-time">
          <div class="date">
            <time datetime=${date.toISOString()} title="Start Time">
              <span class="month">${SHORT_MONTH_NAMES[date.getUTCMonth()]}</span>
              <span class="day">${date.getUTCDate().toString().padStart(2, '0')}</span>
            </time>
            ${endDateHtml}
          </div>
          <div class="time">
            ${`${(date.getUTCHours() + 1).toString().padStart(2, '0')}:${(date.getUTCMinutes()).toString().padStart(2, '0')} ${date.getUTCHours() + 1 <= 12 ? 'AM' : 'PM'}`}
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'jio-datetime-box': DatetimeBox;
  }
}

