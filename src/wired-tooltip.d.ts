import { WiredBase, TemplateResult, CSSResult, PropertyValues } from './wired-base';
export declare type WiredTooltipPosition = 'bottom' | 'top' | 'left' | 'right';
export declare class WiredTooltip extends WiredBase {
    for?: string;
    text?: string;
    offset: number;
    position: WiredTooltipPosition;
    private dirty;
    private showing;
    private _target;
    private showHandler;
    private hideHandler;
    static readonly styles: CSSResult;
    render(): TemplateResult;
    private readonly target;
    private detachListeners;
    private attachListeners;
    private refreshTarget;
    private layout;
    firstUpdated(): void;
    updated(changedProps: PropertyValues): void;
    show(): void;
    hide(): void;
    updatePosition(): void;
    refreshElement(): void;
}
