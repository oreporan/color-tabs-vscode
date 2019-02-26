import * as vscode from 'vscode';

export type ColorRegex = {
    regex: string;
    color: string;
    label?: string;
};

type AllSettings = {
    config?: ColorRegex[];
    tabBorder?: boolean;
    titleBackground?: boolean;
    titleLabel?: boolean;
}

export default () => vscode.workspace.getConfiguration('colorTabs') as AllSettings;