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

import { WiredBase, customElement, property, html, css } from "./wired-base.js";
import { ellipse } from "./wired-lib.js";
let WiredRadio = class WiredRadio extends WiredBase {
  constructor() {
    super(...arguments);
    this.checked = false;
    this.disabled = false;
    this.iconsize = 24;
  }

  static get styles() {
    return css`
    :host {
      display: inline-block;
      position: relative;
      padding: 5px;
      font-family: inherit;
      width: 150px;
      outline: none;
      opacity: 0;
    }

    :host(.wired-rendered) {
      opacity: 1;
    }
  
    :host(.wired-disabled) {
      opacity: 0.45 !important;
      cursor: default;
      pointer-events: none;
    }

    :host(:focus) path {
      stroke-width: 1.5;
    }
  
    #container {
      display: inline-block;
      white-space: nowrap;
    }
  
    .inline {
      display: inline-block;
      vertical-align: middle;
      -moz-user-select: none;
      user-select: none;
    }
  
    #checkPanel {
      cursor: pointer;
    }
  
    svg {
      display: block;
    }
  
    path {
      stroke: var(--wired-radio-icon-color, currentColor);
      stroke-width: 0.7;
      fill: transparent;
    }
  
    .filledPath {
      fill: var(--wired-radio-icon-color, currentColor);
    }
    `;
  }

  render() {
    return html`
    <div id="container" @click="${this.toggleCheck}">
      <div id="checkPanel" class="inline">
        <svg id="svg" width="0" height="0"></svg>
      </div>
      <div class="inline">
        <slot></slot>
      </div>
    </div>
    `;
  }

  refreshDisabledState() {
    if (this.disabled) {
      this.classList.add('wired-disabled');
    } else {
      this.classList.remove('wired-disabled');
    }

    this.tabIndex = this.disabled ? -1 : +(this.getAttribute('tabindex') || 0);
  }

  toggleCheck() {
    this.checked = !(this.checked || false);
    this.fireEvent('change', {
      checked: this.checked
    });
  }

  firstUpdated() {
    this.setAttribute('role', 'checkbox');
    this.addEventListener('keydown', event => {
      if (event.keyCode === 13 || event.keyCode === 32) {
        event.preventDefault();
        this.toggleCheck();
      }
    });
  }

  updated(changed) {
    if (changed.has('disabled')) {
      this.refreshDisabledState();
    }

    const svg = this.shadowRoot.getElementById('svg');

    while (svg.hasChildNodes()) {
      svg.removeChild(svg.lastChild);
    }

    this.dot = undefined;
    const s = {
      width: this.iconsize || 24,
      height: this.iconsize || 24
    };
    svg.setAttribute('width', `${s.width}`);
    svg.setAttribute('height', `${s.height}`);
    ellipse(svg, s.width / 2, s.height / 2, s.width, s.height);
    const iw = Math.max(s.width * 0.6, 5);
    const ih = Math.max(s.height * 0.6, 5);
    this.dot = ellipse(svg, s.width / 2, s.height / 2, iw, ih);
    this.dot.classList.add('filledPath');
    this.dot.style.display = this.checked ? '' : 'none';
    this.classList.add('wired-rendered');
  }

  refreshElement() {}

};

__decorate([property({
  type: Boolean
}), __metadata("design:type", Object)], WiredRadio.prototype, "checked", void 0);

__decorate([property({
  type: Boolean,
  reflect: true
}), __metadata("design:type", Object)], WiredRadio.prototype, "disabled", void 0);

__decorate([property({
  type: String
}), __metadata("design:type", String)], WiredRadio.prototype, "name", void 0);

__decorate([property({
  type: Number
}), __metadata("design:type", Object)], WiredRadio.prototype, "iconsize", void 0);

WiredRadio = __decorate([customElement('wired-radio')], WiredRadio);
export { WiredRadio };