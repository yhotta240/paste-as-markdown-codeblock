import * as vscode from 'vscode';

const config = vscode.workspace.getConfiguration('pasteAsMarkdownCodeblock');
const languages: string[] = config.get('languages') || [];

export default languages;