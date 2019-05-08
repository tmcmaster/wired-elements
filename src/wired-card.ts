import {WiredBase, customElement, property, TemplateResult, html} from './wired-base';
import {rectangle, line} from './wired-lib';

@customElement('wired-card')
export class WiredCard extends WiredBase {
    @property({type: Number}) elevation = 1;
    @property({type: Number}) padding = 10;
    @property({type: String}) mode = 'shrink';

    render(): TemplateResult {
        return html`
            <style>
                :host {
                    display: inline-block;
                    box-sizing: border-box;
                    position: relative;
                    padding: ${this.padding}px;
                    opacity: 0;
                    /*height: 200px;*/
                    /*width: 100px;*/
                    //border: solid blue 2px;
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
                    width: 100%;
                    height: 100%;
                }
                
                path {
                    stroke: currentColor;
                    stroke-width: 0.7;
                    fill: transparent;
                }
                
                #body {
                    display: inline-block;
                    box-sizing: border-box;
                    width: 100%;
                    max-height: 100%;
                }
                div.body {
                    display: inline-block;
                    //border: solid orange 2px;
                    padding: 5px;
                }
                div.overlay {
                    //border: solid green 2px;
                }
                
                slot {
                    box-sizing: border-box;
                    //border: solid purple 2px;
                    width: 100%;
                    height: 100%;
                }
                #aaa {
                    display: inline-block;
                    box-sizing: border-box;
                    //border: solid red 1px;
                }
                #aaa.shrink {
                    width: 100%;
                    max-height: 100%;
                }
                #aaa.stretch {
                    width: 100%;
                    height: 100%;
                }
                
            </style>
            
            <div id="aaa" class="body ${this.mode}">
                <slot id="body" @slotchange="${() => this.slotChanged()}"></slot>
            </div>
            <div id="overlay" class="overlay">
                <svg id="svg"></svg>
            </div>
        `;
    }

    slotChanged() {
        if (this.debug) console.log('slot changed');
        super.requestUpdate();
    }


    updated() {
        this.refreshElement();
    }

    refreshElement(): void {
        const svg = (this.shadowRoot!.getElementById('svg') as any) as SVGSVGElement;
        while (svg.hasChildNodes()) {
            svg.removeChild(svg.lastChild!);
        }

        // margin enables the lines to wobble, and not try to write outside the SVG element. (happens with large cards)
        const s = this.getBoundingClientRect();
        //console.log('CARD RESIZE: ', s);
        this.padding = (s.width + s.height) / 100;
        const margin = this.padding;
        const margins = 2 * margin;
        const elevInc = margin;
        const width = s.width - margins;
        const height = s.height - margins;

        const elev = Math.min(Math.max(1, this.elevation), 5);
        const w = width + ((elev - 1) * elevInc) + margins;
        const h = height + ((elev - 1) * elevInc) + margins;
        svg.setAttribute('width', `${w}`);
        svg.setAttribute('height', `${h}`);

        rectangle(svg, margin, margin, width, height);
        for (let i = 1; i < elev; i++) {
            (line(svg, (i * elevInc), height + (i * elevInc), width + (i * elevInc), height + (i * elevInc))).style.opacity = `${(85 - (i * 10)) / 100}`;
            (line(svg, width + (i * elevInc), height + (i * elevInc), width + (i * elevInc), i * elevInc)).style.opacity = `${(85 - (i * 10)) / 100}`;
            (line(svg, (i * elevInc), height + (i * elevInc), width + (i * elevInc), height + (i * elevInc))).style.opacity = `${(85 - (i * 10)) / 100}`;
            (line(svg, width + (i * elevInc), height + (i * elevInc), width + (i * elevInc), i * elevInc)).style.opacity = `${(85 - (i * 10)) / 100}`;
        }
        this.classList.add('wired-rendered');
    }
}