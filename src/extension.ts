'use strict';
import * as vscode from 'vscode';
import getMapping from './getMapping';
import changeColors from './changeColors';
import changeLabel from './changeLabel';

export function activate(context: vscode.ExtensionContext) {
    
    const disposable = vscode.window.onDidChangeActiveTextEditor(async (e: vscode.TextEditor | undefined) => {

        if (!e) return null;
        const currentlyOpenTabfilePath = e.document.fileName;
        
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
    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
    changeColors();
}