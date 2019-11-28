import {WiredBase, customElement, html} from './wired-base';

@customElement('wired-layout')
export class WiredLayout extends WiredBase {

    render() {
        // noinspection CssUnresolvedCustomProperty
        return html`
            <style>
                :host { 
                    box-sizing: border-box;
                    display: flex;
                    flex-direction: var(--wired-layout-flex-direction, row);
                    width: 100%;
                    justify-content: var(--wired-layout-justify-content, space-between);
                }
                :host([hidden]) { display: none; }
            </style>
            <slot></slot>
            <slot name="left"></slot>
            <slot name="center"></slot>
            <slot name="right"></slot>
        `;
    }

    refreshElement(): void {
    }
}