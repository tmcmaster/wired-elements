import { WiredBase, TemplateResult, CSSResult, PropertyValues } from './wired-base';
export declare class WiredTextarea extends WiredBase {
    rows: number;
    maxrows: number;
    autocomplete: string;
    autofocus: boolean;
    disabled: boolean;
    inputmode: string;
    placeholder: string;
    required: boolean;
    readonly: boolean;
    minlength?: number;
    maxlength?: number;
    private tokens;
    private prevHeight;
    static readonly styles: CSSResult;
    render(): TemplateResult;
    createRenderRoot(): ShadowRoot;
    readonly textarea: HTMLTextAreaElement | null;
    private readonly mirror;
    value: string;
    private valueForMirror;
    private constrain;
    private refreshDisabledState;
    firstUpdated(): void;
    updated(changed: PropertyValues): void;
    private updateCached;
    private onInput;
    refreshElement(): void;
}