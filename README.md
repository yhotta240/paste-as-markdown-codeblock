# Paste as Markdown Codeblock

`paste-as-markdown-codeblock` is a Visual Studio Code extension that allows you to paste selected code or text as a Markdown code block.

## Features

- Convert selected text into a Markdown code block (```language)
and paste it using `Ctrl+Alt+V`

- Use `Ctrl+Space` to insert a language identifier (e.g., JavaScript, Python, TypeScript)

- Right-click in the editor and select "Paste as Markdown CodeBlock" to execute easily

<br>
<img src="https://lh3.googleusercontent.com/d/146nlX5-7UHnvCKRrJeIbUoIePaCgSC9I" width="600" >

<br>
⚠️ Note: This extension does not implement automatic language detection. You need to specify the language manually after pasting.

## Requirements

No special requirements or dependencies are needed.

- Visual Studio Code version 1.xx or higher

## Extension Settings

Currently, this extension does not provide any customizable settings.

Configuration options may be added in future updates.

## Known Issues

- Some languages may not be correctly identified, causing the inserted language name to be missing or inaccurate.

- The command requires selected text. If nothing is selected, no output will be generated.

## Release Notes

### 1.0.0

- Initial release
- Added functionality to paste selected text as a Markdown code block

## Following extension guidelines

This extension follows the official VS Code extension development guidelines.

- [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## License

This extension is licensed under the [MIT License](./LICENSE).

Thanks for using this extension! Feel free to report bugs or request features via the Issues page.
