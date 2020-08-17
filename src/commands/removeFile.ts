import * as vscode from "vscode";
import getSettings from '../getSettings';

const removeFile = () => {
  const editor = vscode.window.activeTextEditor;
  if (!editor) return;
  
  const settings = vscode.workspace.getConfiguration("colorTabs");
  const currentConfig = getSettings().config || []
  const path = vscode.workspace.asRelativePath(editor.document.uri.fsPath);

  const filteredConfig = currentConfig.filter(x => x.regex !== path)

  settings.update(
    'config',
    filteredConfig,
    vscode.ConfigurationTarget.Workspace
  );
};

export default removeFile;
