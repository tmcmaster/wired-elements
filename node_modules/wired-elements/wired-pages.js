var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { WiredBase, property, customElement, html, query } from './wired-base';
import '@polymer/iron-pages';
import './wired-card';
let WiredPages = class WiredPages extends WiredBase {
    constructor() {
        super();
        this.page = '';
    }
    connectedCallback() {
        super.connectedCallback();
    }
    render() {
        return html `
            <style>
                :host { 
                    box-sizing: border-box;
                    display: block;
                    /*width:300px;*/
                    /*height:300px;*/
                    padding: 10px;
                    box-sizing: border-box;
                }
                
                :host([hidden]) { display: none; }
            </style>
            
            <iron-pages attr-for-selected="name" selected="${this.page}">
                <slot id="pages" @slotchange="${this.pagesHaveChanged()}"></slot>
            </iron-pages>
        `;
    }
    refreshElement() {
    }
    // TODO: pages that are not visible required the resize event. ???ß
    pagesHaveChanged() {
        console.log('-------- PAGES HAVE CHANGED.');
        if (!this.slotElement && this.shadowRoot) {
            // this.slotElement = this.shadowRoot.getElementById('pages') as HTMLSlotElement;
            //
            // const pages = this.slotElement.assignedNodes();
            // pages.forEach((page) => {
            //     console.log('------ found page: ' + page);
            // });
        }
    }
    updated(changed) {
        if (changed.has('page')) {
            console.log('Page has changed.');
            this.pageChanged();
        }
    }
    pageChanged() {
        window.dispatchEvent(new Event('resize'));
    }
};
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], WiredPages.prototype, "page", void 0);
__decorate([
    query('slot'),
    __metadata("design:type", HTMLSlotElement)
], WiredPages.prototype, "slotElement", void 0);
WiredPages = __decorate([
    customElement('wired-pages'),
    __metadata("design:paramtypes", [])
], WiredPages);
export { WiredPages };
let WiredPage = class WiredPage extends WiredBase {
    constructor() {
        super();
    }
    connectedCallback() {
        super.connectedCallback();
    }
    render() {
        return html `
            <style>
                :host { 
                    display: block;
                    box-sizing: border-box;
                    //border: solid blue 1px;
                }
                
                div.body {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    width: 100%;
                    height: 100%;
                    box-sizing: border-box;
                    //border: solid red 1px;
                    padding: 5px;
                }
                
                div.top {
                    display:inline-block;
                    width: 100%;
                    //height:80px;
                    box-sizing: border-box;
                    //border: solid green 2px;
                }
                div.middle {    
                    flex-grow: 1;
                    box-sizing: border-box;
                    //border: solid purple 1px;
                }
                div.bottom {
                    width: 100%;
                    //height: 50px;
                    display:inline-block;
                    box-sizing: border-box;
                    //border: solid blue 1px;
                }
                
                :host([hidden]) { 
                    display: none; 
                }
            </style>
    
            <div class="body">
                <div class="top">
                    <slot name="top"></slot>
                </div>
                <div class="middle">
                    <slot name="middle"></slot>
                </div>
                <div class="bottom">
                     <slot name="bottom"></slot>
                </div>            
            </div>
            
            <slot name="drawer"></slot>
        `;
    }
    refreshElement() {
    }
};
WiredPage = __decorate([
    customElement('wired-page'),
    __metadata("design:paramtypes", [])
], WiredPage);
export { WiredPage };
