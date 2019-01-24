
import * as vscode from 'vscode';

export default async (color?: string) => {
    const settings = vscode.workspace.getConfiguration('workbench');
    settings.update('colorCustomizations', {'tab.activeBackground': color || undefined}, vscode.ConfigurationTarget.Workspace)
}