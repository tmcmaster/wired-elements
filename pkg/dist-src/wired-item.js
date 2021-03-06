var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata = this && this.__metadata || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

import { WiredBase, customElement, property, html, query } from "./wired-base.js";
import { hachureFill } from "./wired-lib.js";
let WiredItem = class WiredItem extends WiredBase {
  constructor() {
    super(...arguments);
    this.value = '';
    this.name = '';
    this.selected = false;
  }

  render() {
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

  refreshElement() {
    if (this.svg) {
      while (this.svg.hasChildNodes()) {
        this.svg.removeChild(this.svg.lastChild);
      }

      const s = this.getBoundingClientRect();
      this.svg.setAttribute('width', `${s.width}`);
      this.svg.setAttribute('height', `${s.height}`);
      const g = hachureFill([[0, 0], [s.width, 0], [s.width, s.height], [0, s.height]]);
      this.svg.appendChild(g);
    }
  }

};

__decorate([property(), __metadata("design:type", Object)], WiredItem.prototype, "value", void 0);

__decorate([property(), __metadata("design:type", Object)], WiredItem.prototype, "name", void 0);

__decorate([property({
  type: Boolean
}), __metadata("design:type", Object)], WiredItem.prototype, "selected", void 0);

__decorate([query('svg'), __metadata("design:type", SVGSVGElement)], WiredItem.prototype, "svg", void 0);

WiredItem = __decorate([customElement('wired-item')], WiredItem);
export { WiredItem };