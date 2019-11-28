import { WiredBase } from './wired-base';
import './wired-card';
export declare class WiredMenu extends WiredBase {
    constructor();
    render(): import("lit-html/lib/template-result").TemplateResult;
    private menuItemAdded;
    hide(): void;
    show(): void;
    refreshElement(): void;
}
