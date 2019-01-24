import * as vscode from 'vscode';

export default async (color?: string) => {
    const settings = vscode.workspace.getConfiguration('workbench');
    const currentColorCustomization = settings.get('colorCustomizations');
    settings.update('colorCustomizations', {...currentColorCustomization, 'tab.activeBorder': color || undefined, 'tab.activeBackground': undefined}, vscode.ConfigurationTarget.Workspace)
}