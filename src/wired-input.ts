import {WiredBase, customElement, property, TemplateResult, html, PropertyValues} from './wired-base';
import {rectangle} from './wired-lib';

@customElement('wired-input')
export class WiredInput extends WiredBase {
    @property({type: String}) placeholder = '';
    @property({type: String}) name?: string;
    @property({type: String}) min?: string;
    @property({type: String}) max?: string;
    @property({type: String}) step?: string;
    @property({type: String}) type = 'text';
    @property({type: String}) autocomplete = '';
    @property({type: String}) autocapitalize = '';
    @property({type: String}) autocorrect = '';
    @property({type: Boolean, reflect: true}) disabled = false;
    @property({type: Boolean}) required = false;
    @property({type: Boolean}) autofocus = false;
    @property({type: Boolean}) readonly = false;
    @property({type: Number}) minlength?: number;
    @property({type: Number}) maxlength?: number;
    @property({type: Number}) size?: number;

    private pendingValue?: string;
    private resizeHandler?: EventListenerOrEventListenerObject;

    connectedCallback() {
        super.connectedCallback();
        if (!this.resizeHandler) {
            this.resizeHandler = this.debounce(this.refreshElement.bind(this), 200, false, this);
            window.addEventListener('resize', this.resizeHandler);
        }
        setTimeout(() => this.refreshElement());
    }

    disconnectedCallback() {
        if (super.disconnectedCallback) super.disconnectedCallback();
        if (this.resizeHandler) {
            window.removeEventListener('resize', this.resizeHandler);
            delete this.resizeHandler;
        }
    }

    private debounce(func: Function, wait: number, immediate: boolean, context: HTMLElement): EventListenerOrEventListenerObject {
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

    render(): TemplateResult {
        return html`
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
        return this.attachShadow({mode: 'open', delegatesFocus: true});
    }

    get input(): HTMLInputElement | null {
        if (this.shadowRoot) {
            return this.shadowRoot.getElementById('txt') as HTMLInputElement;
        }
        return null;
    }

    get value(): string {
        const input = this.input;
        return (input && input.value) || '';
    }

    set value(v: string) {
        if (this.shadowRoot) {
            const input = this.input;
            if (input) {
                input.value = v;
            }
        } else {
            this.pendingValue = v;
        }
    }

    firstUpdated() {
        this.value = this.value || this.getAttribute('value') || '';
    }

    updated(changed: PropertyValues) {
        if (changed.has('disabled')) {
            this.refreshDisabledState();
        }
        this.refreshElement();
    }

    refreshElement(): void {
        const svg = (this.shadowRoot!.getElementById('svg') as any) as SVGSVGElement;
        while (svg.hasChildNodes()) {
            svg.removeChild(svg.lastChild!);
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
            this.input!.value = this.pendingValue;
            delete this.pendingValue;
        }
        this.classList.add('wired-rendered');
    }

    private refreshDisabledState() {
        if (this.disabled) {
            this.classList.add('wired-disabled');
        } else {
            this.classList.remove('wired-disabled');
        }
    }

    private onChange(event: Event) {
        event.stopPropagation();
        this.fireEvent(event.type, {sourceEvent: event});
    }

}