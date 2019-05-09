import { WiredBase, TemplateResult, CSSResult, PropertyValues } from './wired-base';
import './wired-card';
import './wired-item';
interface ComboValue {
    value: string;
    text: string;
}
export declare class WiredCombo extends WiredBase {
    value?: ComboValue;
    selected?: string;
    disabled: boolean;
    private cardShowing;
    private itemNodes;
    private lastSelectedItem?;
    static readonly styles: CSSResult;
    render(): TemplateResult;
    private refreshDisabledState;
    firstUpdated(): void;
    updated(changed: PropertyValues): void;
    private refreshSelection;
    private setCardShowing;
    private onItemClick;
    private fireSelected;
    private selectPrevious;
    private selectNext;
    private onCombo;
    refreshElement(): void;
}
export {};
