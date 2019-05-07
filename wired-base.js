var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { LitElement, property } from 'lit-element';
import { fireEventTo } from './wired-lib';
export * from 'lit-element';
export class WiredBase extends LitElement {
    constructor() {
        super(...arguments);
        this.debug = false;
    }
    fireEvent(name, detail, bubbles = true, composed = true) {
        fireEventTo(this, name, detail, bubbles, composed);
    }
    connectedCallback() {
        if (super.connectedCallback)
            super.connectedCallback();
        if (!this.refreshListener) {
            this.refreshListener = this.refreshAfterResize.bind(this);
            window.addEventListener('refresh-element', this.refreshListener);
        }
        setTimeout(() => this.refreshAfterResize(), 10);
    }
    disconnectedCallback() {
        if (super.disconnectedCallback)
            super.disconnectedCallback();
        if (this.refreshListener) {
            window.removeEventListener('refresh-element', this.refreshListener);
            delete this.refreshListener;
        }
    }
    refreshAfterResize() {
        if (this.refreshElement) {
            if (this.debug)
                console.log('Refreshing wired-element: ', this.tagName);
            this.refreshElement();
        }
    }
}
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], WiredBase.prototype, "debug", void 0);
