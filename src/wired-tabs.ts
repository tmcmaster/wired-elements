import { WiredBase, customElement, property, TemplateResult, html, css, CSSResult, query } from './wired-base';
import { repeat } from 'lit-html/directives/repeat';
import { WiredCard } from './wired-card';
import 'wired-item';
import 'wired-card';

@customElement('wired-tab')
export class WiredTab extends WiredBase {
  @property({ type: String }) name = '';
  @property({ type: String }) label = '';

  @query('wired-card')
  private card?: WiredCard;

  static get styles(): CSSResult {
    return css`
    :host {
      display: block;
    }
    wired-card > slot {
      display: block;
      padding: 10px;
    }
    `;
  }

  render(): TemplateResult {
    return html`
    <wired-card>
      <slot part="body"></slot>
    </wired-card>
    `;
  }

  relayout() {
    setTimeout(() => {
      if (this.card) {
        this.card.requestUpdate();
      }
    });
  }
}

@customElement('wired-tabs')
export class WizardTabs extends WiredBase {
  @property({ type: String }) selected?: string;
  @query('slot')
  private slotElement?: HTMLSlotElement;

  private pages: WiredTab[] = [];
  private pageMap = new Map<string, WiredTab>();
  private current?: WiredTab;

  static get styles(): CSSResult {
    return css`
    :host {
      display: block;
    }

    .hidden {
      display: none !important;
    }
  
    ::slotted(.hidden) {
      display: none !important;
    }

    :host ::slotted(.hidden) {
      display: none !important;
    }

    #bar {
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      -ms-flex-direction: row;
      -webkit-flex-direction: row;
      flex-direction: row;
    }
    `;
  }

  render(): TemplateResult {
    return html`
    <div id="bar">
      ${repeat(this.pages, (p) => p.name, (p) => html`
      <wired-item role="tab" .value="${p.name}" .selected="${p.name === this.selected}" ?aria-selected="${p.name === this.selected}"
        @click="${() => this.selected = p.name}">${p.label || p.name}</wired-item>
      `)}
    </div>
    <div>
      <slot id="slot" @slotchange="${this.mapPages}"></slot>
    </div>
    `;
  }

  private mapPages() {
    this.pages = [];
    this.pageMap.clear();
    if (this.slotElement) {
      const assigned = this.slotElement.assignedNodes();
      if (assigned && assigned.length) {
        for (let i = 0; i < assigned.length; i++) {
          const n = assigned[i];
          if (n.nodeType === Node.ELEMENT_NODE && (n as HTMLElement).tagName.toLowerCase() === 'wired-tab') {
            const e = n as WiredTab;
            this.pages.push(e);
            const name = e.getAttribute('name') || '';
            if (name) {
              name.trim().split(' ').forEach((nameSegment) => {
                if (nameSegment) {
                  this.pageMap.set(nameSegment, e);
                }
              });
            }
          }
        }
        if (!this.selected) {
          if (this.pages.length) {
            this.selected = this.pages[0].name;
          }
        }
        this.requestUpdate();
      }
    }
  }

  firstUpdated() {
    this.mapPages();
    this.tabIndex = +((this.getAttribute('tabindex') || 0));
    this.addEventListener('keydown', (event) => {
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
    const newPage = this.getElement();
    for (let i = 0; i < this.pages.length; i++) {
      const p = this.pages[i];
      if (p === newPage as any) {
        p.classList.remove('hidden');
      } else {
        p.classList.add('hidden');
      }
    }
    this.current = newPage || undefined;
    if (this.current) {
      this.current.relayout();
    }
  }

  private getElement(): WiredTab | null {
    let e: WiredTab | undefined = undefined;
    if (this.selected) {
      e = this.pageMap.get(this.selected);
    }
    if (!e) {
      e = this.pages[0];
    }
    return e || null;
  }

  private selectPrevious() {
    const list = this.pages;
    if (list.length) {
      let index = -1;
      for (let i = 0; i < list.length; i++) {
        if (list[i] === this.current) {
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
      this.selected = list[index].name || '';
    }
  }

  private selectNext() {
    const list = this.pages;
    if (list.length) {
      let index = -1;
      for (let i = 0; i < list.length; i++) {
        if (list[i] === this.current) {
          index = i;
          break;
        }
      }
      if (index < 0) {
        index = 0;
      } else if (index >= (list.length - 1)) {
        index = 0;
      } else {
        index++;
      }
      this.selected = list[index].name || '';
    }
  }
}