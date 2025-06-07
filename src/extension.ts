import * as vscode from 'vscode';
import { registerPasteCommand } from './commands';
import { registerCompletionProvider } from './provider';

export function activate(context: vscode.ExtensionContext) {
	registerPasteCommand(context);
	registerCompletionProvider(context);
}

export function deactivate() { }