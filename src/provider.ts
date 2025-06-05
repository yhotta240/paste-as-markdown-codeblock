import * as vscode from 'vscode';
import languages from './utils/config';

export function registerMarkdownCompletionProvider(context: vscode.ExtensionContext) {
    const provider = vscode.languages.registerCompletionItemProvider(
        { scheme: 'file', language: 'markdown' },
        {
            provideCompletionItems(document, position) {
                const lineText = document.lineAt(position).text;
                console.log('Completion requested at:', lineText);

                if (!lineText.includes('```')) {
                    return undefined;
                }

                return languages.map(lang => {
                    const item = new vscode.CompletionItem(lang, vscode.CompletionItemKind.Value);
                    item.insertText = lang;
                    return item;
                });
            }
        },
        '`', ...'abcdefghijklmnopqrstuvwxyz',
        ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    );
    context.subscriptions.push(provider);
}