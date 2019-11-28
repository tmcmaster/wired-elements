import { LitElement, TemplateResult } from 'lit-element';
import './wired-button';
export declare class WiredHelper extends LitElement {
    debug: boolean;
    private resizeListener?;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private dispatchRefreshEvent;
    render(): TemplateResult;
    refresh(): void;
    refreshElement(): void;
}
