import { WiredBase, TemplateResult, CSSResult, PropertyValues } from './wired-base';
import '@material/mwc-icon';
export declare class WiredIconButton extends WiredBase {
    disabled: boolean;
    static readonly styles: CSSResult;
    render(): TemplateResult;
    firstUpdated(): void;
    updated(changed: PropertyValues): void;
    private refreshDisabledState;
    refreshElement(): void;
}
