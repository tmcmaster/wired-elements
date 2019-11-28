import {WiredBase, customElement, property, TemplateResult, html, query} from './wired-base';
import {hachureFill} from './wired-lib';

@customElement('wired-item')
export class WiredItem extends WiredBase {
    @property() value = '';
    @property() name = '';
    @property({type: Boolean}) selected = false;

    @query('svg')
    private svg?: SVGSVGElement;


    render(): TemplateResult {
        return html`
            <style>
                :host {
                    display: inline-block;
                    font-size: 14px;
                    text-align: left;
                }
                button {
                    cursor: pointer;
                    outline: none;
                    overflow: hidden;
                    color: inherit;
                    user-select: none;
                    position: relative;
                    font-family: inherit;
                    text-align: inherit;
                    font-size: inherit;
                    letter-spacing: 1.25px;
                    padding: 1px 10px;
                    min-height: 36px;
                    text-transform: inherit;
                    background: none;
                    border: none;
                    transition: background-color 0.3s ease, color 0.3s ease;
                    width: 100%;
                    box-sizing: border-box;
                    white-space: nowrap;
                }
                button.selected {
                    color: var(--wired-item-selected-color, #fff);
                }
                button::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: currentColor;
                    opacity: 0;
                }
                button span {
                    display: inline-block;
                    transition: transform 0.2s ease;
                    position: relative;
                }
                button:active span {
                    transform: scale(1.02);
                }
                .overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    pointer-events: none;
                    display: none;
                }
                button.selected .overlay {
                    display: block;
                }
                svg {
                    display: block;
                }
                path {
                    stroke: var(--wired-item-selected-bg, #000);
                    stroke-width: 2.75;
                    fill: transparent;
                    transition: transform 0.05s ease;
                }
                @media (hover: hover) {
                    button:hover::before {
                        opacity: 0.05;
                    }
                }
            </style>
            <button class="${this.selected ? 'selected' : ''}">
                <div class="overlay">
                    <svg></svg>
                </div>
                <span>
                    <slot></slot>
                </span>
            </button>
        `;
    }

    firstUpdated() {
        if (this.selected) {
            setTimeout(() => this.requestUpdate());
        }
    }

    updated() {
        this.refreshElement();
    }


    refreshElement(): void {
        if (this.svg) {
            while (this.svg.hasChildNodes()) {
                this.svg.removeChild(this.svg.lastChild!);
            }
            const s = this.getBoundingClientRect();
            this.svg.setAttribute('width', `${s.width}`);
            this.svg.setAttribute('height', `${s.height}`);
            const g = hachureFill([
                [0, 0],
                [s.width, 0],
                [s.width, s.height],
                [0, s.height]
            ]);
            this.svg.appendChild(g);
        }
    }
}