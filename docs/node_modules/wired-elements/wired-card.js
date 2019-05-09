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
import { rectangle, line } from './wired-lib';
let WiredCard = class WiredCard extends WiredBase {
    constructor() {
        super(...arguments);
        this.elevation = 1;
        this.padding = 10;
        this.mode = 'shrink';
    }
    render() {
        return html `
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
        if (this.debug)
            console.log('slot changed');
        super.requestUpdate();
    }
    updated() {
        this.refreshElement();
    }
    refreshElement() {
        const svg = this.shadowRoot.getElementById('svg');
        while (svg.hasChildNodes()) {
            svg.removeChild(svg.lastChild);
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
};
__decorate([
    property({ type: Number }),
    __metadata("design:type", Object)
], WiredCard.prototype, "elevation", void 0);
__decorate([
    property({ type: Number }),
    __metadata("design:type", Object)
], WiredCard.prototype, "padding", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], WiredCard.prototype, "mode", void 0);
WiredCard = __decorate([
    customElement('wired-card')
], WiredCard);
export { WiredCard };
