var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { WiredBase, customElement, property, html, css } from './wired-base';
import { rectangle, line } from './wired-lib';
let WiredButton = class WiredButton extends WiredBase {
    constructor() {
        super(...arguments);
        this.elevation = 1;
        this.disabled = false;
    }
    static get styles() {
        return css `

    `;
    }
    render() {
        return html `
    <style>
      :host {
        display: inline-block;
        font-family: inherit;
        cursor: pointer;
        padding: 8px 10px;
        position: relative;
        text-align: center;
        -moz-user-select: none;
        -ms-user-select: none;
        -webkit-user-select: none;
        user-select: none;
        justify-content: center;
        flex-direction: column;
        text-align: center;
        display: inline-flex;
        outline: none;
        letter-spacing: 1.25px;
        font-size: 14px;
        text-transform: uppercase;
        opacity: 0;
      }
  
      :host(.wired-rendered) {
        opacity: 1;
      }
  
      :host(:active) path {
        transform: scale(0.97) translate(1.5%, 1.5%);
      }
  
      :host(.wired-disabled) {
        opacity: 0.6 !important;
        background: rgba(0, 0, 0, 0.07);
        cursor: default;
        pointer-events: none;
      }
  
      :host(:focus) path {
        stroke-width: 1.5;
      }
  
      .overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
      }
  
      svg {
        display: block;
      }
  
      path {
        stroke: currentColor;
        stroke-width: 0.7;
        fill: transparent;
        transition: transform 0.05s ease;
      }
    </style>
    <slot></slot>
    <div class="overlay">
      <svg id="svg"></svg>
    </div>
    `;
    }
    firstUpdated() {
        this.addEventListener('keydown', (event) => {
            if ((event.keyCode === 13) || (event.keyCode === 32)) {
                event.preventDefault();
                this.click();
            }
        });
        this.setAttribute('role', 'button');
        this.setAttribute('aria-label', this.textContent || this.innerText);
        setTimeout(() => this.requestUpdate());
    }
    updated(changed) {
        if (changed.has('disabled')) {
            this.refreshDisabledState();
        }
        const svg = this.shadowRoot.getElementById('svg');
        while (svg.hasChildNodes()) {
            svg.removeChild(svg.lastChild);
        }
        const s = this.getBoundingClientRect();
        const elev = Math.min(Math.max(1, this.elevation), 5);
        const w = s.width + ((elev - 1) * 2);
        const h = s.height + ((elev - 1) * 2);
        svg.setAttribute('width', `${w}`);
        svg.setAttribute('height', `${h}`);
        rectangle(svg, 0, 0, s.width, s.height);
        for (let i = 1; i < elev; i++) {
            (line(svg, (i * 2), s.height + (i * 2), s.width + (i * 2), s.height + (i * 2))).style.opacity = `${(75 - (i * 10)) / 100}`;
            (line(svg, s.width + (i * 2), s.height + (i * 2), s.width + (i * 2), i * 2)).style.opacity = `${(75 - (i * 10)) / 100}`;
            (line(svg, (i * 2), s.height + (i * 2), s.width + (i * 2), s.height + (i * 2))).style.opacity = `${(75 - (i * 10)) / 100}`;
            (line(svg, s.width + (i * 2), s.height + (i * 2), s.width + (i * 2), i * 2)).style.opacity = `${(75 - (i * 10)) / 100}`;
        }
        this.classList.add('wired-rendered');
    }
    refreshDisabledState() {
        if (this.disabled) {
            this.classList.add('wired-disabled');
        }
        else {
            this.classList.remove('wired-disabled');
        }
        this.tabIndex = this.disabled ? -1 : +(this.getAttribute('tabindex') || 0);
    }
    refreshElement() {
        this.requestUpdate();
    }
};
__decorate([
    property({ type: Number }),
    __metadata("design:type", Object)
], WiredButton.prototype, "elevation", void 0);
__decorate([
    property({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], WiredButton.prototype, "disabled", void 0);
WiredButton = __decorate([
    customElement('wired-button')
], WiredButton);
export { WiredButton };
