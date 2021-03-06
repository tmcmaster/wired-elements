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
import { line, svgNode, ellipse } from './wired-lib';
import { addListener } from '@polymer/polymer/lib/utils/gestures.js';
let WiredSlider = class WiredSlider extends WiredBase {
    constructor() {
        super(...arguments);
        this._value = 0;
        this.min = 0;
        this.max = 100;
        this.knobradius = 10;
        this.disabled = false;
        this.step = 1;
        this.barWidth = 0;
        this.intermediateValue = this.min;
        this.pct = 0;
        this.startx = 0;
        this.dragging = false;
    }
    static get styles() {
        return css `
    :host {
      display: inline-block;
      position: relative;
      width: 300px;
      height: 40px;
      outline: none;
      box-sizing: border-box;
      opacity: 0;
    }

    :host(.wired-rendered) {
      opacity: 1;
    }
  
    :host(.wired-disabled) {
      opacity: 0.45 !important;
      cursor: default;
      pointer-events: none;
      background: rgba(0, 0, 0, 0.07);
      border-radius: 5px;
    }
  
    :host(.wired-disabled) .knob {
      pointer-events: none !important;
    }
  
    :host(:focus) .knob {
      cursor: move;
      stroke: var(--wired-slider-knob-outline-color, #000);
      fill-opacity: 0.8;
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
      stroke-width: 0.7;
      fill: transparent;
    }
  
    .knob {
      pointer-events: auto;
      fill: var(--wired-slider-knob-zero-color, gray);
      stroke: var(--wired-slider-knob-zero-color, gray);
      transition: transform 0.15s ease;
      cursor: pointer;
    }
  
    .hasValue {
      fill: var(--wired-slider-knob-color, rgb(51, 103, 214));
      stroke: var(--wired-slider-knob-color, rgb(51, 103, 214));
    }
  
    .bar {
      stroke: var(--wired-slider-bar-color, rgb(0, 0, 0));
    }
    `;
    }
    render() {
        return html `
    <div class="overlay">
      <svg id="svg"></svg>
    </div>
    `;
    }
    get value() {
        return this._value;
    }
    set value(v) {
        this.setValue(v, true);
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
    firstUpdated() {
        this.refreshElement();
    }
    updated(changed) {
        if (changed.has('disabled')) {
            this.refreshDisabledState();
        }
    }
    setAriaValue() {
        this.setAttribute('aria-valuenow', `${this.value}`);
    }
    setValue(v, skipEvent = false) {
        this._value = v;
        this.setAriaValue();
        this.onValueChange();
        if (!skipEvent) {
            this.fireEvent('change', { value: this.intermediateValue });
        }
    }
    incremenent() {
        const newValue = Math.min(this.max, Math.round(this.value + this.step));
        if (newValue !== this.value) {
            this.setValue(newValue);
        }
    }
    decrement() {
        const newValue = Math.max(this.min, Math.round(this.value - this.step));
        if (newValue !== this.value) {
            this.setValue(newValue);
        }
    }
    onValueChange() {
        if (!this.knob) {
            return;
        }
        let pct = 0;
        if (this.max > this.min) {
            pct = Math.min(1, Math.max((this.value - this.min) / (this.max - this.min), 0));
        }
        this.pct = pct;
        if (pct) {
            this.knob.classList.add('hasValue');
        }
        else {
            this.knob.classList.remove('hasValue');
        }
        const knobOffset = pct * this.barWidth;
        this.knobGroup.style.transform = `translateX(${Math.round(knobOffset)}px)`;
    }
    knobdown(event) {
        this.knobExpand(true);
        event.preventDefault();
        this.focus();
    }
    resetKnob() {
        this.knobExpand(false);
    }
    knobExpand(value) {
        if (this.knob) {
            if (value) {
                this.knob.classList.add('expanded');
            }
            else {
                this.knob.classList.remove('expanded');
            }
        }
    }
    onTrack(event) {
        event.stopPropagation();
        switch (event.detail.state) {
            case 'start':
                this.trackStart();
                break;
            case 'track':
                this.trackX(event);
                break;
            case 'end':
                this.trackEnd();
                break;
        }
    }
    trackStart() {
        this.intermediateValue = this.value;
        this.startx = this.pct * this.barWidth;
        this.dragging = true;
    }
    trackX(event) {
        if (!this.dragging) {
            this.trackStart();
        }
        const dx = event.detail.dx || 0;
        const newX = Math.max(Math.min(this.startx + dx, this.barWidth), 0);
        this.knobGroup.style.transform = `translateX(${Math.round(newX)}px)`;
        const newPct = newX / this.barWidth;
        this.intermediateValue = this.min + newPct * (this.max - this.min);
    }
    trackEnd() {
        this.dragging = false;
        this.resetKnob();
        this.setValue(this.intermediateValue);
        this.pct = (this.value - this.min) / (this.max - this.min);
    }
    refreshElement() {
        const svg = this.shadowRoot.getElementById('svg');
        while (svg.hasChildNodes()) {
            svg.removeChild(svg.lastChild);
        }
        const s = this.getBoundingClientRect();
        svg.setAttribute('width', `${s.width}`);
        svg.setAttribute('height', `${s.height}`);
        const radius = this.knobradius || 10;
        this.barWidth = s.width - (2 * radius);
        this.bar = line(svg, radius, s.height / 2, s.width - radius, s.height / 2);
        this.bar.classList.add('bar');
        this.knobGroup = svgNode('g');
        svg.appendChild(this.knobGroup);
        this.knob = ellipse(this.knobGroup, radius, s.height / 2, radius * 2, radius * 2);
        this.knob.classList.add('knob');
        this.onValueChange();
        this.classList.add('wired-rendered');
        // aria
        this.setAttribute('role', 'slider');
        this.setAttribute('aria-valuemax', `${this.max}`);
        this.setAttribute('aria-valuemin', `${this.min}`);
        this.setAriaValue();
        // attach events
        addListener(this.knob, 'down', (event) => {
            if (!this.disabled) {
                this.knobdown(event);
            }
        });
        addListener(this.knob, 'up', () => {
            if (!this.disabled) {
                this.resetKnob();
            }
        });
        addListener(this.knob, 'track', (event) => {
            if (!this.disabled) {
                this.onTrack(event);
            }
        });
        this.addEventListener('keydown', (event) => {
            switch (event.keyCode) {
                case 38:
                case 39:
                    this.incremenent();
                    break;
                case 37:
                case 40:
                    this.decrement();
                    break;
                case 36:
                    this.setValue(this.min);
                    break;
                case 35:
                    this.setValue(this.max);
                    break;
            }
        });
    }
};
__decorate([
    property({ type: Number }),
    __metadata("design:type", Object)
], WiredSlider.prototype, "_value", void 0);
__decorate([
    property({ type: Number }),
    __metadata("design:type", Object)
], WiredSlider.prototype, "min", void 0);
__decorate([
    property({ type: Number }),
    __metadata("design:type", Object)
], WiredSlider.prototype, "max", void 0);
__decorate([
    property({ type: Number }),
    __metadata("design:type", Object)
], WiredSlider.prototype, "knobradius", void 0);
__decorate([
    property({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], WiredSlider.prototype, "disabled", void 0);
WiredSlider = __decorate([
    customElement('wired-slider')
], WiredSlider);
export { WiredSlider };
