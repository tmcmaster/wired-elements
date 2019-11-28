import {WiredBase, customElement, html} from './wired-base';

import './wired-card';
import {WiredItem} from './wired-item';

@customElement('wired-menu')
export class WiredMenu extends WiredBase {
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

    private menuItemAdded() {
        // TODO: review if listeners need to be removed from previous elements.
        console.log('Menu items changed.');
        setTimeout(() => {
            if (this.shadowRoot) {
                const slot = this.shadowRoot.getElementById('menu-items') as HTMLSlotElement;
                if (slot) {
                    const assigned = slot.assignedNodes();
                    assigned.forEach((wi) => {
                        wi.addEventListener('click', () => {
                            const item = wi as WiredItem;
                            console.log('selected: ', item.value);
                            this.fireEvent('selected', {selected: item.value});
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

    public hide() {
        console.log('hiding menu');
        this.style.display = 'none';
    }

    public show() {
        console.log('showing menu');
        this.style.display = 'block';
    }

    refreshElement(): void {
    }
}