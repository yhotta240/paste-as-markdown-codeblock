import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	const config = vscode.workspace.getConfiguration('pasteAsMarkdownCodeblock');
	const languages: string[] = config.get('languages') || [];
	const disposable = vscode.commands.registerCommand('paste-as-markdown-codeblock.paste', async () => {
		const clipboardText = await vscode.env.clipboard.readText();
		if (!clipboardText) {
			vscode.window.showWarningMessage('クリップボードが空です．');
			return;
		}

		const snippet = new vscode.SnippetString(
			'```${1|' + languages.join(',') + '|}\n' +
			clipboardText +
			'\n```'
		);

		const editor = vscode.window.activeTextEditor;
		if (editor) {
			console.log('アクティブなファイルが見つかりました．', editor.document.fileName, editor.document.languageId);
			const selection = editor.selection;
			console.log('Current Selection:', selection);
			editor.insertSnippet(snippet);
			vscode.window.showInformationMessage('クリップボードの内容をMarkdownコードブロックとして挿入しました．');
		} else {
			vscode.window.showErrorMessage('アクティブなファイルが見つかりませんでした．');
		}
	});

	context.subscriptions.push(disposable);

	const provider = vscode.languages.registerCompletionItemProvider(
		{ scheme: 'file', language: 'markdown' },
		{
			provideCompletionItems(document, position) {
				const lineText = document.lineAt(position).text;
				console.log('Completion requested at:', lineText);

				// 行全体に ``` が含まれていれば補完を出す
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

// This method is called when your extension is deactivated
export function deactivate() { }
