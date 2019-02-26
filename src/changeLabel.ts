import * as vscode from 'vscode';
import getSettings from './getSettings';

const addOrReplaceLabel = (label: string, originalString: string): string => {
    const regex = new RegExp(/(~\[.*\]~)(.*)/, 'g');
    const hasLabel = regex.test(originalString);

    
    if (hasLabel) {
        return originalString.replace(regex, `~[${label}]~\$\{\separator}$2`);
    } else {
        return `~[${label}]~\$\{\separator}${originalString}`;
    }
}

const isFeatureEnabled = (): boolean => {
    const extensionSettings = getSettings();
    const shouldAppendLabel = extensionSettings.titleLabel;
    return !!shouldAppendLabel;
} 

export default async (label?: string) => {
    if (!isFeatureEnabled()) return;
    
    const settings = vscode.workspace.getConfiguration('window');
    const currentTitleSetting = settings.get<string>('title') || '';
    if (label) {
        const newTitle = addOrReplaceLabel(label, currentTitleSetting);
        settings.update('title', newTitle, vscode.ConfigurationTarget.Workspace);
    } else {
        settings.update('title', undefined, vscode.ConfigurationTarget.Workspace);
    }
}