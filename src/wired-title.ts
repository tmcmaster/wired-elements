import { WiredBase, customElement, html } from './wired-base';

@customElement('wired-title')
export class WiredTitle extends WiredBase {

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
            <h1><slot></slot></h1>
        `;
    }
}