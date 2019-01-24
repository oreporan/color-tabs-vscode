import * as vscode from 'vscode';

type Config = {
    regex: string;
    color: string
}

const getConfig = () => {
    const settings = vscode.workspace.getConfiguration('colorTabs');
    return settings.get<Config[]>('config');
}

export default (path: string) => {
    const config = getConfig()
    if (!config) return undefined;
    
    const map = config.find(mapping => new RegExp(mapping.regex, 'g').test(path))
    if (!map) return undefined;
    return map.color
}