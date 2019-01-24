import * as vscode from 'vscode';

const getPaths = () => {
    const settings = vscode.workspace.getConfiguration('colorTabs');
    return settings.get<string[]>('paths');
}
const getColors = () => {
    const settings = vscode.workspace.getConfiguration('colorTabs');
    return settings.get<string[]>('colors');
}

export default (path: string) => {
    const paths = getPaths()
    const colors = getColors()
    if (!paths || !colors) return undefined;

    if(colors.length !== paths.length) {
        console.log("Problem, colors array must match paths array")
    }
    
    const index = paths.findIndex(regex => new RegExp(regex, 'g').test(path))
    if (index == -1) return undefined;
    return colors[index]
}