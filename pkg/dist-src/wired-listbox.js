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

import { WiredBase, customElement, property, html } from "./wired-base.js";
import { rectangle } from "./wired-lib.js";
import "./wired-item.js";
let WiredListbox = class WiredListbox extends WiredBase {
  constructor() {
    super(...arguments);
    this.horizontal = false;
    this.itemNodes = [];
    this.itemClickHandler = this.onItemClick.bind(this);
  }

  render() {
    return html`
            <style>
                :host {
                    display: inline-block;
                    font-family: inherit;
                    position: relative;
                    padding: 5px;
                    outline: none;
                    opacity: 0;
                }
            
                :host(.wired-rendered) {
                    opacity: 1;
                }
            
                :host(:focus) path {
                    stroke-width: 1.5;
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
            
                ::slotted(wired-item) {
                    display: block;
                }
            
                :host(.wired-horizontal) ::slotted(wired-item) {
                    display: inline-block;
                }
            </style>
            <slot id="slot" @slotchange="${() => this.requestUpdate()}"></slot>
            <div class="overlay">
              <svg id="svg"></svg>
            </div>
        `;
  }

  firstUpdated() {
    this.setAttribute('role', 'listbox');
    this.tabIndex = +(this.getAttribute('tabindex') || 0);
    this.refreshSelection();
    this.addEventListener('click', this.itemClickHandler);
    this.addEventListener('keydown', event => {
      switch (event.keyCode) {
        case 37:
        case 38:
          event.preventDefault();
          this.selectPrevious();
          break;

        case 39:
        case 40:
          event.preventDefault();
          this.selectNext();
          break;
      }
    });
  }

  updated() {
    this.refreshElement();
  }

  addNodes(nodes) {
    if (nodes && nodes.length) {
      for (let i = 0; i < nodes.length; i++) {
        const element = nodes[i];

        if (element.tagName === 'WIRED-ITEM') {
          element.setAttribute('role', 'option');
          this.itemNodes.push(element);
          if (this.debug) console.log('Added WiredItem: ', element);
        } else if (element.tagName === 'SLOT') {
          console.log('found slot: ', element);
          const nodes = element.assignedNodes();
          this.addNodes(nodes);
        }
      }
    }
  }

  onItemClick(event) {
    event.stopPropagation();
    this.selected = event.target.value;
    this.refreshSelection();
    this.fireSelected();
  }

  refreshSelection() {
    if (this.lastSelectedItem) {
      this.lastSelectedItem.selected = false;
      this.lastSelectedItem.removeAttribute('aria-selected');
    }

    const slot = this.shadowRoot.getElementById('slot');
    const nodes = slot.assignedNodes();

    if (nodes) {
      let selectedItem = null;

      for (let i = 0; i < nodes.length; i++) {
        const element = nodes[i];

        if (element.tagName === 'WIRED-ITEM') {
          const value = element.value || '';

          if (this.selected && value === this.selected) {
            selectedItem = element;
            break;
          }
        }
      }

      this.lastSelectedItem = selectedItem || undefined;

      if (this.lastSelectedItem) {
        this.lastSelectedItem.selected = true;
        this.lastSelectedItem.setAttribute('aria-selected', 'true');
      }

      if (selectedItem) {
        this.value = {
          value: selectedItem.value || '',
          text: selectedItem.textContent || ''
        };
      } else {
        this.value = undefined;
      }
    }
  }

  fireSelected() {
    this.fireEvent('selected', {
      selected: this.selected
    });
  }

  selectPrevious() {
    const list = this.itemNodes;

    if (list.length) {
      let index = -1;

      for (let i = 0; i < list.length; i++) {
        if (list[i] === this.lastSelectedItem) {
          index = i;
          break;
        }
      }

      if (index < 0) {
        index = 0;
      } else if (index === 0) {
        index = list.length - 1;
      } else {
        index--;
      }

      this.selected = list[index].value || '';
      this.refreshSelection();
      this.fireSelected();
    }
  }

  selectNext() {
    const list = this.itemNodes;

    if (list.length) {
      let index = -1;

      for (let i = 0; i < list.length; i++) {
        if (list[i] === this.lastSelectedItem) {
          index = i;
          break;
        }
      }

      if (index < 0) {
        index = 0;
      } else if (index >= list.length - 1) {
        index = 0;
      } else {
        index++;
      }

      this.selected = list[index].value || '';
      this.refreshSelection();
      this.fireSelected();
    }
  }

  refreshElement() {
    const svg = this.shadowRoot.getElementById('svg');

    while (svg.hasChildNodes()) {
      svg.removeChild(svg.lastChild);
    }

    const s = this.getBoundingClientRect();
    svg.setAttribute('width', `${s.width}`);
    svg.setAttribute('height', `${s.height}`);
    rectangle(svg, 0, 0, s.width, s.height);
    this.classList.add('wired-rendered');

    if (this.horizontal) {
      this.classList.add('wired-horizontal');
    } else {
      this.classList.remove('wired-horizontal');
    }

    if (!this.itemNodes.length) {
      this.itemNodes = [];
      const nodes = this.shadowRoot.getElementById('slot').assignedNodes();
      this.addNodes(nodes);
    }
  }

};

__decorate([property({
  type: Object
}), __metadata("design:type", Object)], WiredListbox.prototype, "value", void 0);

__decorate([property({
  type: String
}), __metadata("design:type", String)], WiredListbox.prototype, "selected", void 0);

__decorate([property({
  type: Boolean
}), __metadata("design:type", Object)], WiredListbox.prototype, "horizontal", void 0);

WiredListbox = __decorate([customElement('wired-listbox')], WiredListbox);
export { WiredListbox };