var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { WiredBase, customElement, property, html } from './wired-base';
import { rectangle } from './wired-lib';
let WiredInput = class WiredInput extends WiredBase {
    constructor() {
        super(...arguments);
        this.placeholder = '';
        this.type = 'text';
        this.autocomplete = '';
        this.autocapitalize = '';
        this.autocorrect = '';
        this.disabled = false;
        this.required = false;
        this.autofocus = false;
        this.readonly = false;
    }
    connectedCallback() {
        super.connectedCallback();
        if (!this.resizeHandler) {
            this.resizeHandler = this.debounce(this.refreshElement.bind(this), 200, false, this);
            window.addEventListener('resize', this.resizeHandler);
        }
        setTimeout(() => this.refreshElement());
    }
    disconnectedCallback() {
        if (super.disconnectedCallback)
            super.disconnectedCallback();
        if (this.resizeHandler) {
            window.removeEventListener('resize', this.resizeHandler);
            delete this.resizeHandler;
        }
    }
    debounce(func, wait, immediate, context) {
        let timeout = 0;
        return () => {
            const args = arguments;
            const later = () => {
                timeout = 0;
                if (!immediate) {
                    func.apply(context, args);
                }
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = window.setTimeout(later, wait);
            if (callNow) {
                func.apply(context, args);
            }
        };
    }
    render() {
        return html `
            <style>
                :host {
                    display: inline-block;
                    position: relative;
                    padding: 5px;
                    font-family: sans-serif;
                    width: 150px;
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
                }
                
                input {
                    display: block;
                    width: 100%;
                    box-sizing: border-box;
                    outline: none;
                    border: none;
                    font-family: inherit;
                    font-size: inherit;
                    font-weight: inherit;
                    color: inherit;
                    padding: 6px;
                }            
            </style>
            <input id="txt" name="${this.name}" type="${this.type}" placeholder="${this.placeholder}" ?disabled="${this.disabled}"
                ?required="${this.required}" autocomplete="${this.autocomplete}" ?autofocus="${this.autofocus}" minlength="${this.minlength}"
                maxlength="${this.maxlength}" min="${this.min}" max="${this.max}" step="${this.step}" ?readonly="${this.readonly}"
                size="${this.size}" autocapitalize="${this.autocapitalize}" autocorrect="${this.autocorrect}" @change="${this.onChange}">
            <div class="overlay">
                <svg id="svg"></svg>
            </div>
        `;
    }
    createRenderRoot() {
        return this.attachShadow({ mode: 'open', delegatesFocus: true });
    }
    get input() {
        if (this.shadowRoot) {
            return this.shadowRoot.getElementById('txt');
        }
        return null;
    }
    get value() {
        const input = this.input;
        return (input && input.value) || '';
    }
    set value(v) {
        if (this.shadowRoot) {
            const input = this.input;
            if (input) {
                input.value = v;
            }
        }
        else {
            this.pendingValue = v;
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
    refreshElement() {
        const svg = this.shadowRoot.getElementById('svg');
        while (svg.hasChildNodes()) {
            svg.removeChild(svg.lastChild);
        }
        const s = this.getBoundingClientRect();
        const elev = 1;
        const margin = 2;
        const margins = margin * 2;
        const height = s.height - margins - elev;
        const width = s.width - margins - elev;
        svg.setAttribute('width', `${s.width + margins}`);
        svg.setAttribute('height', `${s.height + margins}`);
        rectangle(svg, margin, margin, width, height);
        if (typeof this.pendingValue !== 'undefined') {
            this.input.value = this.pendingValue;
            delete this.pendingValue;
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
    }
    onChange(event) {
        event.stopPropagation();
        this.fireEvent(event.type, { sourceEvent: event });
    }
};
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], WiredInput.prototype, "placeholder", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], WiredInput.prototype, "name", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], WiredInput.prototype, "min", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], WiredInput.prototype, "max", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], WiredInput.prototype, "step", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], WiredInput.prototype, "type", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], WiredInput.prototype, "autocomplete", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], WiredInput.prototype, "autocapitalize", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], WiredInput.prototype, "autocorrect", void 0);
__decorate([
    property({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], WiredInput.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], WiredInput.prototype, "required", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], WiredInput.prototype, "autofocus", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], WiredInput.prototype, "readonly", void 0);
__decorate([
    property({ type: Number }),
    __metadata("design:type", Number)
], WiredInput.prototype, "minlength", void 0);
__decorate([
    property({ type: Number }),
    __metadata("design:type", Number)
], WiredInput.prototype, "maxlength", void 0);
__decorate([
    property({ type: Number }),
    __metadata("design:type", Number)
], WiredInput.prototype, "size", void 0);
WiredInput = __decorate([
    customElement('wired-input')
], WiredInput);
export { WiredInput };
