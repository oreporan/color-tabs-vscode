import * as vscode from 'vscode';
import getSettings from './getSettings';

type ColorCustomization = { [key: string]: string | undefined };

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
    const activityBarBackgroundColor = activityBarBackground ? color : undefined;
    const statusBarBackgroundColor = statusBarBackground ? color : undefined;

    let colorCustomization: ColorCustomization = {
        ...currentColorCustomization,
        'tab.activeBorder': tabBarBorderColor,
        'tab.unfocusedActiveBorder': '#fff0', // Transparent
        'titleBar.activeBackground': titleBarBackgroundColor,
        'activityBar.background': activityBarBackgroundColor,
        'statusBar.background': statusBarBackgroundColor,
    };

    settings.update('colorCustomizations', colorCustomization, vscode.ConfigurationTarget.Workspace);
}