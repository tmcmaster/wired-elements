import { WiredBase } from './wired-base';
import './wired-card';
export declare class WiredMenu extends WiredBase {
    constructor();
    render(): any;
    private menuItemAdded;
    hide(): void;
    show(): void;
    refreshElement(): void;
}
