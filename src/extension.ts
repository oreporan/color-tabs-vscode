'use strict';
import * as vscode from 'vscode';
import getMapping from './getMapping';
import changeColors from './changeColors';
import changeLabel from './changeLabel';
import addFolderCommand from './commands/addFolder';
import removeFolderCommand from './commands/removeFolder';

export function activate(context: vscode.ExtensionContext) {
    
    const disposable = vscode.window.onDidChangeActiveTextEditor(async (e: vscode.TextEditor | undefined) => {

        if (!e) return null;
        const currentlyOpenTabfilePath = vscode.workspace.asRelativePath(e.document.fileName);
        
        const mapping = getMapping(currentlyOpenTabfilePath);
        try {
            await Promise.all([
                changeColors(mapping && mapping.color),
                changeLabel(mapping && mapping.label)
            ]);
        } catch (error) {
            console.log("ERROR", error);
        }

    })
    registerCommands(context)
    context.subscriptions.push(disposable);
}

const registerCommands = (context: vscode.ExtensionContext) => {
    context.subscriptions.push(vscode.commands.registerCommand('colorTabs.addFolder', addFolderCommand));
    context.subscriptions.push(vscode.commands.registerCommand('colorTabs.removeFolder', removeFolderCommand));
}

// this method is called when your extension is deactivated
export function deactivate() {
    changeColors();
}