import { WiredBase, property, customElement, html, query, PropertyValues } from './wired-base';

import '@polymer/iron-pages';
import './wired-card';

@customElement('wired-pages')
export class WiredPages extends WiredBase {

    @property({ type: String }) page = '';

    @query('slot')
    private slotElement?: HTMLSlotElement;

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
    refreshElement(): void {
    }

    // TODO: pages that are not visible required the resize event. ???ß
    private pagesHaveChanged() {
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

    updated(changed: PropertyValues) {
        if (changed.has('page')) {
            console.log('Page has changed.');
            this.pageChanged();
        }
    }

    pageChanged() {
        window.dispatchEvent(new Event('resize'));
    }
}

@customElement('wired-page')
export class WiredPage extends WiredBase {

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

    refreshElement(): void {
    }
}