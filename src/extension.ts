import * as vscode from 'vscode';
export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand('paste-as-markdown-codeblock.paste', async () => {
		const clipboardText = await vscode.env.clipboard.readText();
		if (!clipboardText) {
			vscode.window.showWarningMessage('クリップボードが空です．');
			return;
		}
		const language = 'plaintext';
		console.log('Clipboard Text:', clipboardText);

		// Markdownコードブロック形式に整形
		const formatted = `\`\`\`${language}\n${clipboardText}\n\`\`\``;
		console.log('Formatted Markdown Code Block:');
		console.log(formatted);

		// アクティブエディタに挿入
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			console.log('アクティブなファイルが見つかりました．', editor.document.fileName, editor.document.languageId);
			const selection = editor.selection;
			console.log('Current Selection:', selection);
			editor.edit(editBuilder => {
				editBuilder.replace(selection, formatted);
			});
			vscode.window.showInformationMessage('クリップボードの内容をMarkdownコードブロックとして挿入しました．');
		} else {
			vscode.window.showErrorMessage('アクティブなファイルが見つかりませんでした．');
		}
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
