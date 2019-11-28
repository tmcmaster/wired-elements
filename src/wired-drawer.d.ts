import { WiredBase } from './wired-base';
import '@polymer/app-layout';
import './wired-card';
export declare class WiredDrawer extends WiredBase {
    private drawer?;
    align: string;
    constructor();
    connectedCallback(): void;
    open(): void;
    render(): import("lit-html/lib/template-result").TemplateResult;
    refreshElement(): void;
}
