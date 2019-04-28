import * as vscode from 'vscode';
import getSettings from './getSettings';

type ColorCustomization = { [key: string]: string | undefined };

const invertHex = (hex) => {
    if (!hex) {
        return;
    }

    return hex.replace('#', '0x') > 0xffffff / 2 ? '#000000' : '#ffffff';
}

export default async (color?: string) => {
    const settings = vscode.workspace.getConfiguration('workbench');
    const currentColorCustomization: ColorCustomization = settings.get('colorCustomizations') || {};
    const {
        tabBorder,
        titleBackground,
        activityBarBackground,
        statusBarBackground,
    } = getSettings()

    const tabBarBorderColor = (tabBorder !== false) ? color : undefined;
    const titleBarBackgroundColor = titleBackground ? color : undefined;
    const titleBarForegroundColor = titleBackground ? invertHex(color) : undefined;
    const activityBarBackgroundColor = activityBarBackground ? color : undefined;
    const statusBarBackgroundColor = statusBarBackground ? color : undefined;

    let colorCustomization: ColorCustomization = {
        ...currentColorCustomization,
        'tab.activeBorder': tabBarBorderColor,
        'tab.unfocusedActiveBorder': '#fff0', // Transparent
        'titleBar.activeBackground': titleBarBackgroundColor,
        'titleBar.activeForeground': titleBarForegroundColor,
        'activityBar.background': activityBarBackgroundColor,
        'statusBar.background': statusBarBackgroundColor,
    };

    settings.update('colorCustomizations', colorCustomization, vscode.ConfigurationTarget.Workspace);
}