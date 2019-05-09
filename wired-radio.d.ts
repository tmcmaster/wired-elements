import { WiredBase, TemplateResult, CSSResult, PropertyValues } from './wired-base';
export declare class WiredRadio extends WiredBase {
    checked: boolean;
    disabled: boolean;
    name?: string;
    iconsize: number;
    private dot?;
    static readonly styles: CSSResult;
    render(): TemplateResult;
    private refreshDisabledState;
    toggleCheck(): void;
    firstUpdated(): void;
    updated(changed: PropertyValues): void;
    refreshElement(): void;
}
