import {WiredBase, customElement, property, html} from './wired-base';

import '@polymer/app-layout';
import './wired-card';

import {AppDrawerElement} from '@polymer/app-layout/app-drawer/app-drawer';

@customElement('wired-drawer')
export class WiredDrawer extends WiredBase {

    private drawer?: AppDrawerElement;

    @property({type: String}) align = 'left';

    constructor() {
        super();
        if (this.debug) console.log('Constructing the drawer.');
        // if (this.shadowRoot) {
        //     this.drawer = this.shadowRoot.getElementById('drawer') as AppDrawerElement;
        //     if (!this.drawer) {
        //         console.log('Could not find the drawer.');
        //     }
        // } else {
        //     console.log('There is no shadow root.');
        // }
    }

    connectedCallback() {
        super.connectedCallback();
        setTimeout(() => {
            if (this.shadowRoot) {
                this.drawer = this.shadowRoot.getElementById('drawer') as AppDrawerElement;
                if (this.debug) console.log('DRAWER: ', this.drawer);
                if (!this.drawer) {
                    console.log('Could not find the drawer.');
                }
            } else {
                console.log('There is no shadow root.');
            }
        }, 2000);


    }

    open() {
        if (this.drawer) {
            this.drawer.open();
        } else {
            console.log('There is no drawer.');
        }
    }

    render() {
        return html`
            <style>
                :host { 
                    box-sizing: border-box;
                    display: block;
                }
                :host([hidden]) { display: none; }
              
                wired-card {
                    padding: 5px;
                    box-sizing: border-box; 
                    width: 100%;
                    height: 100%;
                    display: inline-block;
                }
                wired-card > slot {
                    display: block;
                    padding: 20px;
                }
                app-drawer {
                    z-index: 1000;
                }
            </style>
            <app-drawer id="drawer" swipe-open align="${this.align}">
                <wired-card>
                    <slot></slot>
                </wired-card>
            </app-drawer>
        `;
    }

    refreshElement(): void {
    }
}