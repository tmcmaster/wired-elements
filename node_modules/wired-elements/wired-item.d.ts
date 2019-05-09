import { WiredBase, TemplateResult } from './wired-base';
export declare class WiredItem extends WiredBase {
    value: string;
    name: string;
    selected: boolean;
    private svg?;
    render(): TemplateResult;
    firstUpdated(): void;
    updated(): void;
    refreshElement(): void;
}
