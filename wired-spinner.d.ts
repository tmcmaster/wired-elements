import { WiredBase, TemplateResult, CSSResult } from './wired-base';
export declare class WiredSpinner extends WiredBase {
    spinning: boolean;
    duration: number;
    private svg?;
    private knob?;
    private value;
    private timerstart;
    private frame;
    static readonly styles: CSSResult;
    render(): TemplateResult;
    firstUpdated(): void;
    updated(): void;
    private startSpinner;
    private stopSpinner;
    private nextTick;
    private tick;
    private updateCursor;
    refreshElement(): void;
}
