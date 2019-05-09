import { WiredBase, TemplateResult, CSSResult, PropertyValues } from './wired-base';
export declare class WiredCheckbox extends WiredBase {
    checked: boolean;
    disabled: boolean;
    static readonly styles: CSSResult;
    render(): TemplateResult;
    private refreshDisabledState;
    private toggleCheck;
    firstUpdated(): void;
    updated(changed: PropertyValues): void;
    refreshElement(): void;
}
