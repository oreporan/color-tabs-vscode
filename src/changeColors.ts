import * as vscode from 'vscode';
import getSettings from './getSettings';

type ColorCustomization = { [key: string]: string | undefined } | undefined;

const COLOR_CUSTOMIZATIONS = 'colorCustomizations'

const invertHex = (hex?: string) => {
    if (!hex) {
        return;
    }

    return Number(hex.replace('#', '0x')) > 0xffffff / 2 ? '#000000' : '#ffffff';
}

export default async (color?: string) => {
    const colorInverted = invertHex(color);
    const settings = vscode.workspace.getConfiguration('workbench');
    const currentColorCustomization: ColorCustomization = settings.get(COLOR_CUSTOMIZATIONS) || {};
    const {
        tabBorder,
        titleBackground,
        activityBarBackground,
        statusBarBackground,
    } = getSettings();

    const tabBarBorderColor = (tabBorder !== false) ? color : undefined;

    const titleBarBackgroundColor = titleBackground ? color : undefined;
    const titleBarForegroundColor = titleBackground ? colorInverted : undefined;
    
    const activityBarBackgroundColor = activityBarBackground ? color : undefined;
    const activityBarForegroundColor = activityBarBackground ? colorInverted : undefined;
    
    const statusBarBackgroundColor = statusBarBackground ? color : undefined;
    const statusBarForegroundColor = statusBarBackground ? colorInverted : undefined;

    const colorCustomization: ColorCustomization = {
        ...currentColorCustomization,
        'tab.activeBorder': tabBarBorderColor,
        'titleBar.activeBackground': titleBarBackgroundColor,
        'titleBar.activeForeground': titleBarForegroundColor,
        'activityBar.background': activityBarBackgroundColor,
        'activityBar.foreground': activityBarForegroundColor,
        'statusBar.background': statusBarBackgroundColor,
        'statusBar.foreground': statusBarForegroundColor,
    };

    const hasItems = Object.keys(colorCustomization).filter(x => !!colorCustomization[x]).length
    settings.update(COLOR_CUSTOMIZATIONS, hasItems ? colorCustomization : undefined, vscode.ConfigurationTarget.Workspace);
}