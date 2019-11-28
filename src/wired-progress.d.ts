import { WiredBase, TemplateResult } from './wired-base';
export declare class WiredProgress extends WiredBase {
    value: number;
    min: number;
    max: number;
    percentage: boolean;
    private box?;
    render(): TemplateResult;
    private getProgressLabel;
    updated(): void;
    refreshElement(): void;
}
