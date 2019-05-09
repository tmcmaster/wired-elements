import { WiredBase, TemplateResult } from './wired-base';
import './wired-item';
interface ListboxValue {
    value: string;
    text: string;
}
export declare class WiredListbox extends WiredBase {
    value?: ListboxValue;
    selected?: string;
    horizontal: boolean;
    private itemNodes;
    private lastSelectedItem?;
    private itemClickHandler;
    render(): TemplateResult;
    firstUpdated(): void;
    updated(): void;
    private addNodes;
    private onItemClick;
    private refreshSelection;
    private fireSelected;
    private selectPrevious;
    private selectNext;
    refreshElement(): void;
}
export {};
