import * as vscode from 'vscode';

const config = vscode.workspace.getConfiguration('pasteAsMarkdownCodeblock');
// console.log('設定の取得:', config);
const languages: string[] = config.get('languages') || [];
const defaultLanguages: string = config.defaultLanguage || 'javascript';
const isAutoDetect : boolean = config.enableAutoDetection ?? true;

export { languages, defaultLanguages, isAutoDetect };