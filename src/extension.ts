import * as vscode from 'vscode';
import { registerPasteCommand } from './commands';
import { registerMarkdownCompletionProvider } from './provider';

export function activate(context: vscode.ExtensionContext) {
	registerPasteCommand(context);
	registerMarkdownCompletionProvider(context);
}

export function deactivate() { }