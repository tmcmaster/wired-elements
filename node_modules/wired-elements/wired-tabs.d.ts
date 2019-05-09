import { WiredBase, TemplateResult, CSSResult } from './wired-base';
import './wired-item';
import './wired-card';
export declare class WiredTab extends WiredBase {
    name: string;
    label: string;
    private card?;
    static readonly styles: CSSResult;
    render(): TemplateResult;
    relayout(): void;
    refreshElement(): void;
}
export declare class WizardTabs extends WiredBase {
    selected?: string;
    private slotElement?;
    private pages;
    private pageMap;
    private current?;
    static readonly styles: CSSResult;
    render(): TemplateResult;
    private mapPages;
    firstUpdated(): void;
    updated(): void;
    private getElement;
    private selectPrevious;
    private selectNext;
    refreshElement(): void;
}
