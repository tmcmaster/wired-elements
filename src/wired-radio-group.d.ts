import { WiredBase, TemplateResult, CSSResult } from './wired-base';
export declare class WiredRadioGroup extends WiredBase {
    selected?: string;
    private radioNodes;
    private checkListener;
    static readonly styles: CSSResult;
    render(): TemplateResult;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private handleChecked;
    private fireSelected;
    slotChange(): void;
    firstUpdated(): void;
    updated(): void;
    private selectPrevious;
    private selectNext;
    refreshElement(): void;
}
