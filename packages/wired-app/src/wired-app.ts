import { WiredBase, customElement, html } from 'wired-lib/lib/wired-base';

// import 'wired-button';
// import 'wired-card';
// import 'wired-checkbox';
// import 'wired-combo';
// import 'wired-drawer';
// import 'wired-fab';
// import 'wired-icon-button';
// import 'wired-input';
// import 'wired-item';
// import 'wired-lib';
// import 'wired-listbox';
// import 'wired-progress';
// import 'wired-radio';
// import 'wired-radio-group';
// import 'wired-slider';
// import 'wired-spinner';
// import 'wired-tabs';
// import 'wired-textarea';
// import 'wired-title';
// import 'wired-toggle';
// import 'wired-tooltip';


@customElement('wired-app')
export class WiredApp extends WiredBase {

    render() {
        return html `
            <style>
                :host { 
                    box-sizing: border-box;
                    display: block;
                }
                :host([hidden]) { display: none; }
              
                h1 {
                    font-family: 'Shadows Into Light', cursive;
                    text-align: center;
                    font-size: 50px;
                    text-transform: uppercase;
                }
            </style>
            <h1>This is a Application  :-)</h1>
            <slot></slot>
        `;
    }
}