import * as vscode from "vscode";

const clearConfig = () => {
  const editor = vscode.window.activeTextEditor;
  if (!editor) return;
  const settings = vscode.workspace.getConfiguration("colorTabs");
  settings.update(
    'config',
    [],
    vscode.ConfigurationTarget.Workspace
  );
};

export default clearConfig;
