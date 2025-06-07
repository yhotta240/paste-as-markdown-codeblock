import * as vscode from 'vscode';
import { languages, defaultLanguages } from './utils/config';

export function registerPasteCommand(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand('paste-as-markdown-codeblock.paste', async () => {
        const clipboardText = await vscode.env.clipboard.readText();

        if (!clipboardText) {
            vscode.window.showWarningMessage('クリップボードが空です．');
            return;
        }
        if (!languages.length) { languages.push(defaultLanguages); }
        if (languages.includes(defaultLanguages)) {
            languages.splice(languages.indexOf(defaultLanguages), 1);
            languages.unshift(defaultLanguages);
        } else {
            languages.unshift(defaultLanguages);
        }

        const snippet = new vscode.SnippetString(
            '```${1|' + languages.join(',') + '|}\n' +
            clipboardText +
            '\n```'
        );

        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(snippet);
            vscode.window.showInformationMessage('クリップボードの内容をMarkdownコードブロックとして挿入しました．');
        } else {
            vscode.window.showErrorMessage('アクティブなファイルが見つかりませんでした．');
        }
    });
    context.subscriptions.push(disposable);
}