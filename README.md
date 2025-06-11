# Paste as Markdown Codeblock

`paste-as-markdown-codeblock` is a Visual Studio Code extension that allows you to paste selected code or text as a Markdown code block.

## Features

- Paste the copied code as a Markdown code block using `Ctrl+Alt+V`

- Press `Ctrl+Space` to enter a language identifier (e.g., `JavaScript`, `Python`, `TypeScript`).

- Right-click in the editor and select "Paste as Markdown CodeBlock" to use the command from the context menu.

<br>
<img src="https://lh3.googleusercontent.com/d/146nlX5-7UHnvCKRrJeIbUoIePaCgSC9I" width="600" >

<br>
⚠️ Note: This extension does not support automatic language detection. You must specify the language manually after pasting.

## Requirements

No special requirements or dependencies are needed.

- Visual Studio Code version 1.xx or later

## Extension Settings

This extension provides the following settings:

- `pasteAsMarkdownCodeblock.defaultLanguage`<br>
Specifies the default language identifier used when pasting a code block.<br>
Default: `"plaintext"`

- `pasteAsMarkdownCodeblock.languages`<br>
Defines a list of language identifiers available for selection.
You can customize this list to include only the languages you frequently use.

Default:

```json
[
  "plaintext",
  "javascript",
  "typescript",
  "python",
  "cpp",
  "java",
  "bash",
  "html",
  "css",
  "json"
]
```

These settings can be configured from the Settings UI or by editing your `settings.json` file directly.

### Keyboard Shortcut
Press `Ctrl+Alt+V` to paste the copied code as a Markdown code block (only when the editor is focused).

## Known Issues

- The language name may not always be correctly inserted, depending on the input.

- The command requires selected or copied text. If nothing is provided, no output will be generated.

## Release Notes

### 1.0.0

- Initial release
- Added functionality to paste selected text as a Markdown code block

## Following extension guidelines

This extension follows the official VS Code extension development guidelines.

- [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## License

This extension is licensed under the [MIT License](./LICENSE).

Thanks for using this extension! <br>
Feel free to report bugs or request features via the Issues page.
