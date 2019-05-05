import { WiredBase, TemplateResult, customElement, html } from './wired-base';

import './wired-button';

@customElement('wired-helper')
export class WiredHelper extends WiredBase {

    render(): TemplateResult {
        return html `
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

    setupOnloadRefresh() {
        window.onload = () => {
            setTimeout(() => {
                this.refresh();
            }, 5000);
        };
    }

    refresh() {
        console.log('refreshing element render');
        window.dispatchEvent(new Event('resize'));
    }

    refreshElement(): void {
    }
}