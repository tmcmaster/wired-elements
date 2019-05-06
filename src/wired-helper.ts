import {LitElement, html, customElement, TemplateResult, property} from 'lit-element';

import './wired-button';

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
        fireEvent('refresh-element');
    }

    render(): TemplateResult {
        return html`
            <style>
                :host {
                    box-sizing: border-box;
                    display: block;
                }
                :host([hidden]) { display: none; }

            </style>
            ${this.debug ? html`<wired-button @click="${() => this.refresh()}">Refresh</wired-button>` : ''}
        `;
    }

    refresh() {
        if (this.debug) console.log('refreshing element render');
        fireEvent('refresh-element');
    }

    refreshElement(): void {
    }
}


export function fireEvent(name: string, detail?: any, bubbles: boolean = true, composed: boolean = true) {
    if (name) {
        const init: any = {
            bubbles: (typeof bubbles === 'boolean') ? bubbles : true,
            composed: (typeof composed === 'boolean') ? composed : true
        };
        if (detail) {
            init.detail = detail;
        }
        const CE = ((window as any).SlickCustomEvent || CustomEvent);
        window.dispatchEvent(new CE(name, init));
    }
}

export function delayCall(func: Function, wait: number, immediate: boolean, context: HTMLElement): EventListenerOrEventListenerObject {
    let timeout = 0;
    return () => {
        const args = arguments;
        const later = () => {
            timeout = 0;
            if (!immediate) {
                func.apply(context, args);
            }
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = window.setTimeout(later, wait);
        if (callNow) {
            func.apply(context, args);
        }
    };
}