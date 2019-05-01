import { WiredBase, customElement, html } from './wired-base';

@customElement('wired-app')
export class WiredApp extends WiredBase {

    render() {
        return html `
            <style>
                :host { 
                    box-sizing: border-box;
                    display: inline-block;
                    width:100%;
                    height:100%;
                    //border: solid blue 2px;
                    box-sizing: border-box;
                    overflow: auto;
                }
                :host([hidden]) { display: none; }
              
                h1 {
                    font-family: 'Shadows Into Light', cursive;
                    text-align: center;
                    font-size: 50px;
                    text-transform: uppercase;
                }
            </style>

            <slot></slot>
        `;
    }
}