import { WiredBase, customElement, property, TemplateResult, html } from './wired-base';
import { rectangle, line } from './wired-lib';

@customElement('wired-card')
export class WiredCard extends WiredBase {
  @property({ type: Number }) elevation = 1;

  private resizeHandler?: EventListenerOrEventListenerObject;

  render(): TemplateResult {
      return html`
            <style>
                :host {
                    display: inline-block;
                    box-sizing: border-box;
                    position: relative;
                    padding: 10px;
                    opacity: 0;
                    /*height: 200px;*/
                    /*width: 300px;*/
                }
                
                :host(.wired-rendered) {
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
                    stroke: currentColor;
                    stroke-width: 0.7;
                    fill: transparent;
                }
                
                div.body, #body {
                    display: inline-block;
                    box-sizing: border-box;
                    width: 100%;
                    height: 100%;
                }
            </style>
            <div class="body">
                <slot id="body" @slotchange="${() => this.requestUpdate()}"></slot>
            </div>
            <div class="overlay">
                <svg id="svg"></svg>
            </div>
        `;
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.resizeHandler) {
      this.resizeHandler = this.debounce(this.updated.bind(this), 200, false, this);
      window.addEventListener('resize', this.resizeHandler);
    }
    setTimeout(() => this.updated());
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

  updated() {
    const svg = (this.shadowRoot!.getElementById('svg') as any) as SVGSVGElement;
    while (svg.hasChildNodes()) {
      svg.removeChild(svg.lastChild!);
    }
    // margin enables the lines to wobble, and not try to write outside the SVG element. (happens with large cards)
    const margin = 6;
    const margins = 2 * margin;
    const elevInc = margin;
    const s = this.getBoundingClientRect();
    const elev = Math.min(Math.max(1, this.elevation), 5);
    const w = s.width + ((elev - 1) * elevInc) + margin;
    const h = s.height + ((elev - 1) * elevInc) + margin;
    svg.setAttribute('width', `${w}`);
    svg.setAttribute('height', `${h}`);

    rectangle(svg, margin, margin, s.width - margins, s.height - margins);
    for (let i = 1; i < elev; i++) {
      (line(svg, (i * elevInc), s.height - margins + (i * elevInc), s.width - margins + (i * elevInc), s.height - margins + (i * elevInc))).style.opacity = `${(85 - (i * 10)) / 100}`;
      (line(svg, s.width - margins + (i * elevInc), s.height - margins + (i * elevInc), s.width - margins + (i * elevInc), i * elevInc)).style.opacity = `${(85 - (i * 10)) / 100}`;
      (line(svg, (i * elevInc), s.height - margins + (i * elevInc), s.width - margins + (i * elevInc), s.height - margins + (i * elevInc))).style.opacity = `${(85 - (i * 10)) / 100}`;
      (line(svg, s.width - margins + (i * elevInc), s.height - margins + (i * elevInc), s.width - margins + (i * elevInc), i * elevInc)).style.opacity = `${(85 - (i * 10)) / 100}`;
    }
    this.classList.add('wired-rendered');
  }
}