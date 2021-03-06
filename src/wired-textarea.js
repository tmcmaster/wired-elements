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
import { rectangle } from './wired-lib';
let WiredTextarea = class WiredTextarea extends WiredBase {
    constructor() {
        super(...arguments);
        this.rows = 1;
        this.maxrows = 0;
        this.autocomplete = '';
        this.autofocus = false;
        this.disabled = false;
        this.inputmode = '';
        this.placeholder = '';
        this.required = false;
        this.readonly = false;
        this.tokens = [];
        this.prevHeight = 0;
    }
    static get styles() {
        return css `
    :host {
      display: inline-block;
      position: relative;
      font-family: sans-serif;
      width: 400px;
      outline: none;
      opacity: 0;
    }

    :host(.wired-rendered) {
      opacity: 1;
    }
  
    :host(.wired-disabled) {
      opacity: 0.6 !important;
      cursor: default;
      pointer-events: none;
    }
  
    :host(.wired-disabled) svg {
      background: rgba(0, 0, 0, 0.07);
    }
  
    .fit {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  
    .overlay {
      pointer-events: none;
    }
  
    svg {
      display: block;
    }
  
    path {
      stroke: currentColor;
      stroke-width: 0.7;
      fill: transparent;
    }
  
    .mirror-text {
      visibility: hidden;
      word-wrap: break-word;
    }

    #mirror {
      padding: 10px;
    }
  
    textarea {
      position: relative;
      outline: none;
      border: none;
      resize: none;
      background: inherit;
      color: inherit;
      width: 100%;
      height: 100%;
      font-size: inherit;
      font-family: inherit;
      line-height: inherit;
      text-align: inherit;
      padding: 10px;
      box-sizing: border-box;
    }
    `;
    }
    render() {
        return html `
    <div id="mirror" class="mirror-text">&#160;</div>
    <div class="fit">
      <textarea id="textarea" autocomplete="${this.autocomplete}" ?autofocus="${this.autofocus}" inputmode="${this.inputmode}"
        placeholder="${this.placeholder}" ?readonly="${this.readonly}" ?required="${this.required}" ?disabled="${this.disabled}"
        rows="${this.rows}" minlength="${this.minlength}" maxlength="${this.maxlength}" @input="${this.onInput}"></textarea>
    </div>
    <div class="fit overlay">
      <svg id="svg"></svg>
    </div>
    `;
    }
    createRenderRoot() {
        return this.attachShadow({ mode: 'open', delegatesFocus: true });
    }
    get textarea() {
        if (this.shadowRoot) {
            return this.shadowRoot.getElementById('textarea');
        }
        return null;
    }
    get mirror() {
        return this.shadowRoot.getElementById('mirror');
    }
    get value() {
        const input = this.textarea;
        return (input && input.value) || '';
    }
    set value(v) {
        const textarea = this.textarea;
        if (!textarea) {
            return;
        }
        if (textarea.value !== v) {
            textarea.value = v || '';
        }
        this.mirror.innerHTML = this.valueForMirror();
        this.requestUpdate();
    }
    valueForMirror() {
        const input = this.textarea;
        if (!input) {
            return '';
        }
        this.tokens = (input && input.value) ? input.value.replace(/&/gm, '&amp;').replace(/"/gm, '&quot;').replace(/'/gm, '&#39;').replace(/</gm, '&lt;').replace(/>/gm, '&gt;').split('\n') : [''];
        return this.constrain(this.tokens);
    }
    constrain(tokens) {
        let _tokens;
        tokens = tokens || [''];
        if (this.maxrows > 0 && tokens.length > this.maxrows) {
            _tokens = tokens.slice(0, this.maxrows);
        }
        else {
            _tokens = tokens.slice(0);
        }
        while (this.rows > 0 && _tokens.length < this.rows) {
            _tokens.push('');
        }
        return _tokens.join('<br/>') + '&#160;';
    }
    refreshDisabledState() {
        if (this.disabled) {
            this.classList.add('wired-disabled');
        }
        else {
            this.classList.remove('wired-disabled');
        }
    }
    firstUpdated() {
        this.value = this.value || this.getAttribute('value') || '';
    }
    updated(changed) {
        if (changed.has('disabled')) {
            this.refreshDisabledState();
        }
        this.refreshElement();
    }
    updateCached() {
        this.mirror.innerHTML = this.constrain(this.tokens);
    }
    onInput() {
        this.value = this.textarea.value;
    }
    refreshElement() {
        const svg = this.shadowRoot.getElementById('svg');
        const s = this.getBoundingClientRect();
        if (this.prevHeight !== s.height) {
            while (svg.hasChildNodes()) {
                svg.removeChild(svg.lastChild);
            }
            svg.setAttribute('width', `${s.width}`);
            svg.setAttribute('height', `${s.height}`);
            rectangle(svg, 2, 2, s.width - 2, s.height - 2);
            this.prevHeight = s.height;
            this.classList.add('wired-rendered');
            this.updateCached();
        }
    }
};
__decorate([
    property({ type: Number }),
    __metadata("design:type", Object)
], WiredTextarea.prototype, "rows", void 0);
__decorate([
    property({ type: Number }),
    __metadata("design:type", Object)
], WiredTextarea.prototype, "maxrows", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], WiredTextarea.prototype, "autocomplete", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], WiredTextarea.prototype, "autofocus", void 0);
__decorate([
    property({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], WiredTextarea.prototype, "disabled", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], WiredTextarea.prototype, "inputmode", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], WiredTextarea.prototype, "placeholder", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], WiredTextarea.prototype, "required", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], WiredTextarea.prototype, "readonly", void 0);
__decorate([
    property({ type: Number }),
    __metadata("design:type", Number)
], WiredTextarea.prototype, "minlength", void 0);
__decorate([
    property({ type: Number }),
    __metadata("design:type", Number)
], WiredTextarea.prototype, "maxlength", void 0);
WiredTextarea = __decorate([
    customElement('wired-textarea')
], WiredTextarea);
export { WiredTextarea };
