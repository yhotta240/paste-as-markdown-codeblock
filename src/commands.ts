import * as vscode from 'vscode';
import localeEn from "../package.nls.json";
import localeJa from "../package.nls.ja.json";
import { languages, defaultLanguages } from './utils/config';

const locale = vscode.env.language;
const localeObj: { [key: string]: typeof localeEn } = { en: localeEn, ja: localeJa };
const messages = (localeObj[locale] ?? localeEn) as Record<string, string>;

export function registerPasteCommand(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand('paste-as-markdown-codeblock.paste', async () => {
        const clipboardText = await vscode.env.clipboard.readText();

        if (!clipboardText) {
            vscode.window.showWarningMessage(messages["message.clipboardEmpty"]);
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
            vscode.window.showInformationMessage(messages["message.pasteSuccess"]);
        } else {
            vscode.window.showErrorMessage(messages["message.noActiveEditor"]);
        }
    });
    context.subscriptions.push(disposable);
}