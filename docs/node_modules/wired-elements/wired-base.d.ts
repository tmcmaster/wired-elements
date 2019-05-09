import { LitElement } from 'lit-element';
export * from 'lit-element';
export declare abstract class WiredBase extends LitElement {
    debug: boolean;
    private refreshListener?;
    fireEvent(name: string, detail?: any, bubbles?: boolean, composed?: boolean): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private refreshAfterResize;
    abstract refreshElement(): void;
}
