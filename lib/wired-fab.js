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
import { hachureEllipseFill } from './wired-lib';
import '@material/mwc-icon';
let WiredFab = class WiredFab extends WiredBase {
    constructor() {
        super(...arguments);
        this.disabled = false;
    }
    static get styles() {
        return css `
    :host {
      display: -ms-inline-flexbox;
      display: -webkit-inline-flex;
      display: inline-flex;
      -ms-flex-align: center;
      -webkit-align-items: center;
      align-items: center;
      -ms-flex-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      position: relative;
      vertical-align: middle;
      padding: 16px;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      cursor: pointer;
      z-index: 0;
      line-height: 1;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      -webkit-tap-highlight-color: transparent;
      box-sizing: border-box !important;
      outline: none;
      color: #fff;
      opacity: 0;
    }

    :host(.wired-rendered) {
      opacity: 1;
    }
  
    :host(.wired-disabled) {
      opacity: 0.45 !important;
      cursor: default;
      background: rgba(0, 0, 0, 0.07);
      border-radius: 50%;
      pointer-events: none;
    }
  
    :host(:active) mwc-icon {
      opacity: 1;
      transform: scale(1.15);
    }

    :host(:focus) mwc-icon {
      opacity: 1;
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
      stroke: var(--wired-fab-bg-color, #018786);
      stroke-width: 3;
      fill: transparent;
    }
  
    mwc-icon {
      position: relative;
      font-size: var(--wired-icon-size, 24px);
      transition: transform 0.2s ease, opacity 0.2s ease;
      opacity: 0.85;
    }
    `;
    }
    render() {
        return html `
    <div class="overlay">
      <svg id="svg"></svg>
    </div>
    <mwc-icon>
      <slot></slot>
    </mwc-icon>
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
        this.refreshElement();
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
        const svg = this.shadowRoot.getElementById('svg');
        while (svg.hasChildNodes()) {
            svg.removeChild(svg.lastChild);
        }
        const s = this.getBoundingClientRect();
        const min = Math.min(s.width, s.height);
        svg.setAttribute('width', `${min}`);
        svg.setAttribute('height', `${min}`);
        const g = hachureEllipseFill(min / 2, min / 2, min, min);
        svg.appendChild(g);
        this.classList.add('wired-rendered');
    }
};
__decorate([
    property({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], WiredFab.prototype, "disabled", void 0);
WiredFab = __decorate([
    customElement('wired-fab')
], WiredFab);
export { WiredFab };
