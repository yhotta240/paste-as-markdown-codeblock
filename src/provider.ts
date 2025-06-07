import * as vscode from 'vscode';
import { languages } from './utils/config';

export function registerCompletionProvider(context: vscode.ExtensionContext) {
    const provider = vscode.languages.registerCompletionItemProvider(
        { scheme: 'file', language: 'markdown' },
        {
            provideCompletionItems(document, position) {
                const lineText = document.lineAt(position).text;
                if (!lineText.startsWith('```')) {
                    return undefined;
                }
                return languages.map(lang => {
                    const item = new vscode.CompletionItem(lang, vscode.CompletionItemKind.Value);
                    item.insertText = lang;
                    return item;
                });
            }
        },
        '`', ...'abcdefghijklmnopqrstuvwxyz'.split('')
    );
    context.subscriptions.push(provider);
}