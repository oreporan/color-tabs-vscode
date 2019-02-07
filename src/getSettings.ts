import * as vscode from 'vscode';

type ColorRegex = {
    regex: string;
    color: string;
}

type AllSettings = {
    config?: ColorRegex[];
    tabBorder?: boolean;
    titleBackground?: boolean;
}

export default () => vscode.workspace.getConfiguration('colorTabs') as unknown as AllSettings