import * as vscode from 'vscode';
import { getSetting } from './getColor';

type ColorCustomization = { [key: string]: string | undefined }

export default async (color?: string) => {
    const settings = vscode.workspace.getConfiguration('workbench');
    const currentColorCustomization: ColorCustomization = settings.get('colorCustomizations') || {};
    const tabBarBorderColor = (getSetting('tabBorder') || true) ? color: undefined
    const titleBarBackgroundColor = getSetting('titleBackground') ? color : undefined

    let colorCustomization: ColorCustomization = {...currentColorCustomization, 'tab.activeBorder': tabBarBorderColor, 'titleBar.activeBackground': titleBarBackgroundColor}

    settings.update('colorCustomizations', colorCustomization, vscode.ConfigurationTarget.Workspace)
}