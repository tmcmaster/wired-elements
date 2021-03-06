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

import { WiredBase, customElement, property, html } from "./wired-base.js";
import { rectangle, hachureFill } from "./wired-lib.js";
let WiredProgress = class WiredProgress extends WiredBase {
  constructor() {
    super(...arguments);
    this.value = 0;
    this.min = 0;
    this.max = 100;
    this.percentage = false;
  }

  render() {
    return html`
            <style>
                :host {
                    display: inline-block;
                    position: relative;
                    width: 400px;
                    height: 42px;
                    font-family: sans-serif;
                    opacity: 0;
                }
            
                :host(.wired-rendered) {
                    opacity: 1;
                }
              
                svg {
                    display: block;
                }
              
                path {
                    stroke: currentColor;
                    stroke-width: 0.7;
                    fill: transparent;
                }
              
                .overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    pointer-events: none;
                }
              
                .labelContainer {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
              
                .progressLabel {
                    color: var(--wired-progress-label-color, #000);
                    font-size: var(--wired-progress-font-size, 14px);
                    background: var(--wired-progress-label-background, rgba(255,255,255,0.9));
                    padding: 2px 6px;
                    border-radius: 4px;
                    letter-spacing: 1.25px;
                }
              
                .progbox path {
                    stroke: var(--wired-progress-color, rgba(0, 0, 200, 0.8));
                    stroke-width: 2.75;
                    fill: none;
                }    
            </style>
            <div class="overlay">
                <svg id="svg"></svg>
            </div>
            <div class="overlay labelContainer">
                <div class="progressLabel">${this.getProgressLabel()}</div>
            </div>
        `;
  }

  getProgressLabel() {
    if (this.percentage) {
      if (this.max === this.min) {
        return '%';
      } else {
        const pct = Math.floor((this.value - this.min) / (this.max - this.min) * 100);
        return pct + '%';
      }
    } else {
      return '' + this.value;
    }
  }

  updated() {
    this.refreshElement();
  }

  refreshElement() {
    const svg = this.shadowRoot.getElementById('svg');

    while (svg.hasChildNodes()) {
      svg.removeChild(svg.lastChild);
    }

    const s = this.getBoundingClientRect();
    svg.setAttribute('width', `${s.width}`);
    svg.setAttribute('height', `${s.height}`);

    if (!this.box) {
      this.box = rectangle(svg, 0, 0, s.width, s.height);
    } else {
      svg.appendChild(this.box);
    }

    let pct = 0;

    if (this.max > this.min) {
      pct = (this.value - this.min) / (this.max - this.min);
      const progWidth = s.width * Math.max(0, Math.min(pct, 100));
      const progBox = hachureFill([[0, 0], [progWidth, 0], [progWidth, s.height], [0, s.height]]);
      svg.appendChild(progBox);
      progBox.classList.add('progbox');
    }

    this.classList.add('wired-rendered');
  }

};

__decorate([property({
  type: Number
}), __metadata("design:type", Object)], WiredProgress.prototype, "value", void 0);

__decorate([property({
  type: Number
}), __metadata("design:type", Object)], WiredProgress.prototype, "min", void 0);

__decorate([property({
  type: Number
}), __metadata("design:type", Object)], WiredProgress.prototype, "max", void 0);

__decorate([property({
  type: Boolean
}), __metadata("design:type", Object)], WiredProgress.prototype, "percentage", void 0);

WiredProgress = __decorate([customElement('wired-progress')], WiredProgress);
export { WiredProgress };