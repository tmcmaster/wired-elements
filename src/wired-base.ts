import {LitElement, property} from 'lit-element';

import {fireEventTo} from './wired-lib';

export * from 'lit-element';

export abstract class WiredBase extends LitElement {
    @property({type: Boolean}) debug = false;

    private refreshListener?: EventListenerOrEventListenerObject;

    fireEvent(name: string, detail?: any, bubbles: boolean = true, composed: boolean = true) {
        fireEventTo(this, name, detail, bubbles, composed);
    }

    connectedCallback() {
        if (super.connectedCallback) super.connectedCallback();
        if (!this.refreshListener) {
            this.refreshListener = this.refreshAfterResize.bind(this);
            window.addEventListener('refresh-element', this.refreshListener);
        }
        setTimeout(() => this.refreshAfterResize(), 10);
    }

    disconnectedCallback() {
        if (super.disconnectedCallback) super.disconnectedCallback();
        if (this.refreshListener) {
            window.removeEventListener('refresh-element', this.refreshListener);
            delete this.refreshListener;
        }
    }

    private refreshAfterResize() {
        if (this.refreshElement) {
            if (this.debug) console.log('Refreshing wired-element: ', this.tagName);
            this.refreshElement();
        }
    }

    abstract refreshElement(): void;
}