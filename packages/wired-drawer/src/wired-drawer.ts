import { WiredBase, customElement, html } from 'wired-lib/lib/wired-base';

import '@polymer/app-layout';
import 'wired-card';

@customElement('wired-drawer')
export class WiredDrawer extends WiredBase {

    render() {
        return html `
            <style>
                :host { 
                    box-sizing: border-box;
                    display: block;
                    /*padding: 10px; */
                    /*height: 100%;*/
                }
                :host([hidden]) { display: none; }
              
                app-drawer > div {
                    display: inline-block;
                    padding: 5px;
                    height: 100%; 
                    box-sizing: border-box; 
                    width: 100%; 
                    overflow: auto; 
                }
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
            </style>
            <app-drawer swipe-open>
<!--                <div>-->
                    <wired-card>
                        <slot></slot>
                    </wired-card>
<!--                </div>-->
            </app-drawer>
        `;
    }
}