import * as vscode from 'vscode';
import localeEn from "../package.nls.json";
import localeJa from "../package.nls.ja.json";
import { languages, defaultLanguages } from './utils/config';
import { detectLanguage } from './utils/languageDetector';

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

        // Auto-detect language from clipboard content
        const detectedLanguage = detectLanguage(clipboardText);
        
        // Prepare language list for snippet
        if (!languages.length) { languages.push(defaultLanguages); }
        
        // Create a copy of languages array to avoid modifying the original
        const snippetLanguages = [...languages];
        
        // If a language was detected, put it first in the list
        if (detectedLanguage) {
            // Remove detected language from list if it exists
            const detectedIndex = snippetLanguages.indexOf(detectedLanguage);
            if (detectedIndex !== -1) {
                snippetLanguages.splice(detectedIndex, 1);
            }
            // Add detected language at the beginning
            snippetLanguages.unshift(detectedLanguage);
        } else {
            // No detection: use default language as first option
            if (snippetLanguages.includes(defaultLanguages)) {
                snippetLanguages.splice(snippetLanguages.indexOf(defaultLanguages), 1);
                snippetLanguages.unshift(defaultLanguages);
            } else {
                snippetLanguages.unshift(defaultLanguages);
            }
        }

        const snippet = new vscode.SnippetString(
            '```${1|' + snippetLanguages.join(',') + '|}\n' +
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