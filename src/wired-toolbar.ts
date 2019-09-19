import {WiredBase, customElement, html} from './wired-base';

import './wired-card';

@customElement('wired-toolbar')
export class WiredToolbar extends WiredBase {

    render() {
        return html`
            <style>
                :host { 
                    display: inline-block;
                    box-sizing: border-box;
                    width:100%;
                    height:60px;
                    border: solid orange 2px;
                }
                :host([hidden]) { display: none; }
              
                wired-card::slotted(body) {
                    box-sizing: border-box;
                    width:100%;
                    height:60px;
                    padding: 5px;
                    border: solid green 1px;
                }
            </style>
            <wired-card>
                <slot></slot>
            </wired-card>
        `;
    }

    refreshElement(): void {
    }
}