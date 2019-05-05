import { LitElement, property } from 'lit-element';
export * from 'lit-element';

export abstract class WiredBase extends LitElement {
  @property({ type: Boolean }) debug = false;

  private resizeListener?: EventListenerOrEventListenerObject;

  fireEvent(name: string, detail?: any, bubbles: boolean = true, composed: boolean = true) {
    if (name) {
      const init: any = {
        bubbles: (typeof bubbles === 'boolean') ? bubbles : true,
        composed: (typeof composed === 'boolean') ? composed : true
      };
      if (detail) {
        init.detail = detail;
      }
      const CE = ((window as any).SlickCustomEvent || CustomEvent);
      this.dispatchEvent(new CE(name, init));
    }
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    if (!this.resizeListener) {
      this.resizeListener = this.delayCall(this.refreshAfterResize.bind(this), 200, false, this);
      window.addEventListener('resize', this.resizeListener);
    }
    setTimeout(() => this.refreshAfterResize(), 10);
  }

  disconnectedCallback() {
    if (super.disconnectedCallback) super.disconnectedCallback();
    if (this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
      delete this.resizeListener;
    }
  }

  private delayCall(func: Function, wait: number, immediate: boolean, context: HTMLElement): EventListenerOrEventListenerObject {
    let timeout = 0;
    return () => {
      const args = arguments;
      const later = () => {
        timeout = 0;
        if (!immediate) {
          func.apply(context, args);
        }
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = window.setTimeout(later, wait);
      if (callNow) {
        func.apply(context, args);
      }
    };
  }

  private refreshAfterResize() {
      if (this.refreshElement) {
        if (this.debug) console.log('Refreshing wired-element: ', this);
        this.refreshElement();
      }
  }

  abstract refreshElement(): void;
}