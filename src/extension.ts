'use strict';
import * as vscode from 'vscode';
import getMapping from './getMapping';
import changeColors from './changeColors';
import changeLabel from './changeLabel';
import addFileCommand from './commands/addFile';
import removeFileCommand from './commands/removeFile';

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
    context.subscriptions.push(vscode.commands.registerCommand('colorTabs.addFile', addFileCommand));
    context.subscriptions.push(vscode.commands.registerCommand('colorTabs.removeFile', removeFileCommand));
}

// this method is called when your extension is deactivated
export function deactivate() {
    changeColors();
}