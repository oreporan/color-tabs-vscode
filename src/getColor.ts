import * as vscode from 'vscode';

type Config = {
    regex: string;
    color: string;
}

export const getSetting = (value: string) => {
    const settings = vscode.workspace.getConfiguration('colorTabs');
    return  settings.get<Config[]>(value);
}

export default (path: string) => {
    const config = getSetting('config')
    if (!config) return undefined;
    
    const map = config.find(mapping => new RegExp(mapping.regex, 'g').test(path))
    if (!map) return undefined;
    return map.color
}