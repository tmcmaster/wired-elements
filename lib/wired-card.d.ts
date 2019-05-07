import { WiredBase, TemplateResult } from './wired-base';
export declare class WiredCard extends WiredBase {
    elevation: number;
    padding: number;
    render(): TemplateResult;
    slotChanged(): void;
    updated(): void;
    refreshElement(): void;
}
