import * as vscode from 'vscode';

export type ColorRegex = {
    regex: string;
    color?: string;
    label?: string;
};

type AllSettings = {
    config?: ColorRegex[];
    tabBorder?: boolean;
    ignoreCase?: boolean;
    titleBackground?: boolean;
    activityBarBackground?: boolean;
    statusBarBackground?: boolean;
    titleLabel?: boolean;
}

export default () => vscode.workspace.getConfiguration('colorTabs') as AllSettings;