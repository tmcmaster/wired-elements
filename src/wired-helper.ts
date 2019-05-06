import {LitElement, html, customElement, TemplateResult, property} from 'lit-element';

import './wired-button';

import {fireWindowEvent} from './wired-lib';

@customElement('wired-helper')
export class WiredHelper extends LitElement {
    @property({type: Boolean}) debug = false;

    private resizeListener?: EventListenerOrEventListenerObject;

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

    private dispatchRefreshEvent() {
        if (this.debug) console.log('Resize has occurred, and element refresh is required.');
        fireWindowEvent('refresh-element');
    }

    render(): TemplateResult {
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

    refreshElement(): void {
    }
}


