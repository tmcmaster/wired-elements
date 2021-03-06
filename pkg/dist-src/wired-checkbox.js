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
import { rectangle, line } from "./wired-lib.js";
let WiredCheckbox = class WiredCheckbox extends WiredBase {
  constructor() {
    super(...arguments);
    this.checked = false;
    this.disabled = false;
  }

  static get styles() {
    return css`
    :host {
      display: block;
      font-family: inherit;
      outline: none;
      opacity: 0;
    }
  
    :host(.wired-disabled) {
      opacity: 0.6 !important;
      cursor: default;
      pointer-events: none;
    }
  
    :host(.wired-disabled) svg {
      background: rgba(0, 0, 0, 0.07);
    }

    :host(.wired-rendered) {
      opacity: 1;
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
      stroke: var(--wired-checkbox-icon-color, currentColor);
      stroke-width: 0.7;
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

    const s = {
      width: 24,
      height: 24
    };
    svg.setAttribute('width', `${s.width}`);
    svg.setAttribute('height', `${s.height}`);
    rectangle(svg, 0, 0, s.width, s.height);
    const checkpaths = [];
    checkpaths.push(line(svg, s.width * 0.3, s.height * 0.4, s.width * 0.5, s.height * 0.7));
    checkpaths.push(line(svg, s.width * 0.5, s.height * 0.7, s.width + 5, -5));
    checkpaths.forEach(d => {
      d.style.strokeWidth = `${2.5}`;
    });

    if (this.checked) {
      checkpaths.forEach(d => {
        d.style.display = '';
      });
    } else {
      checkpaths.forEach(d => {
        d.style.display = 'none';
      });
    }

    this.classList.add('wired-rendered');
  }

  refreshElement() {}

};

__decorate([property({
  type: Boolean
}), __metadata("design:type", Object)], WiredCheckbox.prototype, "checked", void 0);

__decorate([property({
  type: Boolean,
  reflect: true
}), __metadata("design:type", Object)], WiredCheckbox.prototype, "disabled", void 0);

WiredCheckbox = __decorate([customElement('wired-checkbox')], WiredCheckbox);
export { WiredCheckbox };