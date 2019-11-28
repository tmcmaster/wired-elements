import { WiredBase, PropertyValues } from './wired-base';
import '@polymer/iron-pages';
import './wired-card';
export declare class WiredPages extends WiredBase {
    page: string;
    private slotElement?;
    constructor();
    connectedCallback(): void;
    render(): import("lit-html/lib/template-result").TemplateResult;
    refreshElement(): void;
    private pagesHaveChanged;
    updated(changed: PropertyValues): void;
    pageChanged(): void;
}
export declare class WiredPage extends WiredBase {
    constructor();
    connectedCallback(): void;
    render(): import("lit-html/lib/template-result").TemplateResult;
    refreshElement(): void;
}
