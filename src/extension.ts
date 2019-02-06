'use strict';
import * as vscode from 'vscode';
import getColorForPath from './getColor';
import changeColorInTabBar from './changeColors';

export function activate(context: vscode.ExtensionContext) {
    
    const disposable = vscode.window.onDidChangeActiveTextEditor(async (e: vscode.TextEditor | undefined) => {
        
        if (!e) return null;
        const currentlyOpenTabfilePath = e.document.fileName;
        
        const color = getColorForPath(currentlyOpenTabfilePath);
        try {
            await changeColorInTabBar(color)
        } catch (error) {
            console.log("ERROR", error)
        }

    })
    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
    changeColorInTabBar()
}