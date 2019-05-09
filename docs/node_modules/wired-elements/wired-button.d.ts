import { WiredBase, TemplateResult, CSSResult, PropertyValues } from './wired-base';
export declare class WiredButton extends WiredBase {
    elevation: number;
    disabled: boolean;
    static readonly styles: CSSResult;
    render(): TemplateResult;
    firstUpdated(): void;
    updated(changed: PropertyValues): void;
    private refreshDisabledState;
    refreshElement(): void;
}
