import * as vscode from "vscode";
import getSettings from '../getSettings';

const addFile = () => {
  const editor = vscode.window.activeTextEditor;
  if (!editor) return;
  
  const settings = vscode.workspace.getConfiguration("colorTabs");
  const currentConfig = getSettings().config || []
  const path = vscode.workspace.asRelativePath(editor.document.uri.fsPath);

  settings.update(
    'config',
    [...currentConfig, {regex: path}],
    vscode.ConfigurationTarget.Workspace
  );
};

export default addFile;
