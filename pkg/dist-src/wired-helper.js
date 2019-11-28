var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata = this && this.__metadata || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

import { LitElement, html, customElement, property } from 'lit-element';
import "./wired-button.js";
import { fireWindowEvent } from "./wired-lib.js";
let WiredHelper = class WiredHelper extends LitElement {
  constructor() {
    super(...arguments);
    this.debug = false;
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();

    if (!this.resizeListener) {
      this.resizeListener = this.dispatchRefreshEvent.bind(this);
      window.addEventListener('resize', this.resizeListener);
    }

    setTimeout(() => this.dispatchRefreshEvent(), 10);
  }

  disconnectedCallback() {
    if (super.disconnectedCallback) super.disconnectedCallback();

    if (this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
      delete this.resizeListener;
    }
  }

  dispatchRefreshEvent() {
    if (this.debug) console.log('Resize has occurred, and element refresh is required.');
    fireWindowEvent('refresh-element');
  }

  render() {
    return html`
            <style>
                :host {
                    box-sizing: border-box;
                    display: block;
                    padding: 15px;
                }
                :host([hidden]) { display: none; }
                
                button {
                    clear: both;
                    float: left;
                    border: solid lightgrey 1px;
                }
            </style>
            ${this.debug ? html`<button @click="${() => this.refresh()}">Refresh</button>` : ''}
        `;
  }

  refresh() {
    if (this.debug) console.log('refreshing element render');
    fireWindowEvent('refresh-element');
  }

  refreshElement() {}

};

__decorate([property({
  type: Boolean
}), __metadata("design:type", Object)], WiredHelper.prototype, "debug", void 0);

WiredHelper = __decorate([customElement('wired-helper')], WiredHelper);
export { WiredHelper };