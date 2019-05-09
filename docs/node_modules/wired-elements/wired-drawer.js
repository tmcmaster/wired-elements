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
import '@polymer/app-layout';
import './wired-card';
let WiredDrawer = class WiredDrawer extends WiredBase {
    constructor() {
        super();
        this.align = 'left';
        if (this.debug)
            console.log('Constructing the drawer.');
        // if (this.shadowRoot) {
        //     this.drawer = this.shadowRoot.getElementById('drawer') as AppDrawerElement;
        //     if (!this.drawer) {
        //         console.log('Could not find the drawer.');
        //     }
        // } else {
        //     console.log('There is no shadow root.');
        // }
    }
    connectedCallback() {
        super.connectedCallback();
        setTimeout(() => {
            if (this.shadowRoot) {
                this.drawer = this.shadowRoot.getElementById('drawer');
                if (this.debug)
                    console.log('DRAWER: ', this.drawer);
                if (!this.drawer) {
                    console.log('Could not find the drawer.');
                }
            }
            else {
                console.log('There is no shadow root.');
            }
        }, 2000);
    }
    open() {
        if (this.drawer) {
            this.drawer.open();
        }
        else {
            console.log('There is no drawer.');
        }
    }
    render() {
        return html `
            <style>
                :host { 
                    box-sizing: border-box;
                    display: block;
                }
                :host([hidden]) { display: none; }
              
                wired-card {
                    padding: 5px;
                    box-sizing: border-box; 
                    width: 100%;
                    height: 100%;
                    display: inline-block;
                }
                wired-card > slot {
                    display: block;
                    padding: 20px;
                }
                app-drawer {
                    z-index: 1000;
                }
            </style>
            <app-drawer id="drawer" swipe-open align="${this.align}">
                <wired-card>
                    <slot></slot>
                </wired-card>
            </app-drawer>
        `;
    }
    refreshElement() {
    }
};
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], WiredDrawer.prototype, "align", void 0);
WiredDrawer = __decorate([
    customElement('wired-drawer'),
    __metadata("design:paramtypes", [])
], WiredDrawer);
export { WiredDrawer };
