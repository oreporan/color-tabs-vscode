import * as vscode from "vscode";
import getSettings from "../getSettings";
import * as path from "path";

const addFile = async () => {
  const editor = vscode.window.activeTextEditor;
  if (!editor) return;

  const settings = vscode.workspace.getConfiguration("colorTabs");
  const relativePath = vscode.workspace.asRelativePath(
    editor.document.uri.fsPath
  );
  const currentConfig = getSettings().config || [];
  const dir = `${path.parse(relativePath).dir}${path.sep}.*`;

  const value = await vscode.window.showInputBox({
    value: dir,
    prompt: "Edit the folder regex",
  });

  settings.update(
    "config",
    [...currentConfig, { regex: value }],
    vscode.ConfigurationTarget.Workspace
  );
};

export default addFile;
