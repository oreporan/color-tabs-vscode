import * as vscode from 'vscode';
import getSettings from './getSettings';

const addOrReplaceLabel = (label, originalString): string => {
    const regex = new RegExp('(~\[.*\]~)(.*)', 'g');
    const hasLabel = regex.test(originalString);

    if (hasLabel) {
        originalString.replace(regex, `~[${label}]~\$\{\separator}$3`);
    } else {
        return `~[${label}]~\$\{\separator}${originalString}`;
    }
}

export default async (label?: string) => {
    const settings = vscode.workspace.getConfiguration('window');
    const currentTitleSetting = settings.get('title') || {};
    const extensionSettings = getSettings();

    const shouldAppendLabel = extensionSettings.titleLabel;

    if (shouldAppendLabel && label) {
        const newTitle = addOrReplaceLabel(label, currentTitleSetting);
        console.log("WOOHOOO TITLE", newTitle)
        settings.update('title', newTitle, vscode.ConfigurationTarget.Workspace);
    } else {
        settings.update('title', {}, vscode.ConfigurationTarget.Workspace);
    }
}