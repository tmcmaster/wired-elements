var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata = this && this.__metadata || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

import { WiredBase, customElement, html } from "./wired-base.js";
import "./wired-card.js";
let WiredMenu = class WiredMenu extends WiredBase {
  constructor() {
    super();
    this.hide();
  }

  render() {
    return html`
            <style>
                :host { 
                    box-sizing: border-box;
                    display: block;
                    position: absolute;
                }
                
                :host([hidden]) { display: none; }
                
                ::slotted(wired-item) {
                    clear:both;
                    float: left;
                    width: 100%;
                    text-align: center;
                    --wired-item-selected-bg; black;
                }
            </style>
              <wired-card>
                <slot id="menu-items" @slotchange="${this.menuItemAdded()}"></slot>
              </wired-card>
        `;
  }

  menuItemAdded() {
    // TODO: review if listeners need to be removed from previous elements.
    console.log('Menu items changed.');
    setTimeout(() => {
      if (this.shadowRoot) {
        const slot = this.shadowRoot.getElementById('menu-items');

        if (slot) {
          const assigned = slot.assignedNodes();
          assigned.forEach(wi => {
            wi.addEventListener('click', () => {
              const item = wi;
              console.log('selected: ', item.value);
              this.fireEvent('selected', {
                selected: item.value
              });
              item.selected = true;
              setTimeout(() => {
                item.selected = false;
                this.hide();
              }, 300);
            });
          });
        }
      }
    }, 1000);
  }

  hide() {
    console.log('hiding menu');
    this.style.display = 'none';
  }

  show() {
    console.log('showing menu');
    this.style.display = 'block';
  }

  refreshElement() {}

};
WiredMenu = __decorate([customElement('wired-menu'), __metadata("design:paramtypes", [])], WiredMenu);
export { WiredMenu };