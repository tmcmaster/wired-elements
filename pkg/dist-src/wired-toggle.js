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
import { rectangle, ellipse, hachureEllipseFill, svgNode } from "./wired-lib.js";
let WiredToggle = class WiredToggle extends WiredBase {
  constructor() {
    super(...arguments);
    this.checked = false;
    this.disabled = false;
  }

  static get styles() {
    return css`
    :host {
      display: inline-block;
      cursor: pointer;
      position: relative;
      outline: none;
      opacity: 0;
    }

    :host(.wired-rendered) {
      opacity: 1;
    }
  
    :host(.wired-disabled) {
      opacity: 0.4 !important;
      cursor: default;
      pointer-events: none;
    }
  
    :host(.wired-disabled) svg {
      background: rgba(0, 0, 0, 0.07);
    }

    :host(:focus) path {
      stroke-width: 1.2;
    }

    svg {
      display: block;
    }
  
    path {
      stroke: currentColor;
      stroke-width: 0.7;
      fill: transparent;
    }

    .knob {
      transition: transform 0.3s ease;
    }
    .knob path {
      stroke-width: 0.7;
    }
    .knob.checked {
      transform: translateX(48px);
    }
    .knobfill path {
      stroke-width: 3 !important;
      fill: transparent;
    }
    .knob.unchecked .knobfill path {
      stroke: var(--wired-toggle-off-color, gray);
    }
    .knob.checked .knobfill path {
      stroke: var(--wired-toggle-on-color, rgb(63, 81, 181));
    }
    `;
  }

  render() {
    return html`
    <div @click="${this.toggleCheck}">
      <svg id="svg"></svg>
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
    this.setAttribute('role', 'switch');
    this.addEventListener('keydown', event => {
      if (event.keyCode === 13 || event.keyCode === 32) {
        event.preventDefault();
        this.toggleCheck();
      }
    });
    const svg = this.shadowRoot.getElementById('svg');

    while (svg.hasChildNodes()) {
      svg.removeChild(svg.lastChild);
    }

    const s = {
      width: 80,
      height: 34
    };
    svg.setAttribute('width', `${s.width}`);
    svg.setAttribute('height', `${s.height}`);
    rectangle(svg, 16, 8, s.width - 32, 18);
    this.knob = svgNode('g');
    this.knob.classList.add('knob');
    svg.appendChild(this.knob);
    const knobFill = hachureEllipseFill(16, 16, 32, 32);
    knobFill.classList.add('knobfill');
    this.knob.appendChild(knobFill);
    ellipse(this.knob, 16, 16, 32, 32);
    this.classList.add('wired-rendered');
  }

  updated(changed) {
    if (changed.has('disabled')) {
      this.refreshDisabledState();
    }

    if (this.knob) {
      const cl = this.knob.classList;

      if (this.checked) {
        cl.remove('unchecked');
        cl.add('checked');
      } else {
        cl.remove('checked');
        cl.add('unchecked');
      }
    }

    this.setAttribute('aria-checked', `${this.checked}`);
  }

  refreshElement() {}

};

__decorate([property({
  type: Boolean
}), __metadata("design:type", Object)], WiredToggle.prototype, "checked", void 0);

__decorate([property({
  type: Boolean,
  reflect: true
}), __metadata("design:type", Object)], WiredToggle.prototype, "disabled", void 0);

WiredToggle = __decorate([customElement('wired-toggle')], WiredToggle);
export { WiredToggle };