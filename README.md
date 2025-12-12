# Paste as Markdown Codeblock

[日本語版はこちら (Japanese version)](./README.ja.md)

`paste-as-markdown-codeblock` is a Visual Studio Code extension that lets you paste code or text from the clipboard as a Markdown code block.

## Features

- **Automatic Language Detection**: The extension automatically detects the programming language from your clipboard content and suggests it as the default language for the code block.

- Paste the copied code as a Markdown code block using `Ctrl+Alt+V`

- Press `Ctrl+Space` to enter a language identifier (e.g., `JavaScript`, `Python`, `TypeScript`) or select from detected/configured languages.

- Right-click in the editor and select "Paste as Markdown CodeBlock" to use the command from the context menu.

<br>
<img src="https://lh3.googleusercontent.com/d/146nlX5-7UHnvCKRrJeIbUoIePaCgSC9I" width="600" >

<br>

### How Language Detection Works

When you paste code, the extension analyzes the clipboard content using keyword and pattern matching to identify the programming language. Supported languages include:
- Python, JavaScript, TypeScript, Java, C++, Go, Rust, Ruby, PHP
- Bash, HTML, CSS, JSON, SQL, YAML, XML
- And more...

If a language is confidently detected, it will be pre-selected in the code block. If detection is uncertain, the extension falls back to your configured default language.

Note: Automatic language detection is disabled by default. To enable it, turn on `pasteAsMarkdownCodeblock.enableAutoDetection` in your settings.

## Requirements

No special requirements or dependencies are needed.

- Visual Studio Code version 1.xx or later

## Extension Settings

This extension provides the following settings:

- `pasteAsMarkdownCodeblock.defaultLanguage`<br>
Specifies the default language identifier used when pasting a code block if automatic detection fails or is uncertain.<br>
Default: `"plaintext"`

- `pasteAsMarkdownCodeblock.languages`<br>
Defines a list of language identifiers available for selection.
You can customize this list to include only the languages you frequently use.
The auto-detected language (if any) will be added to this list automatically when pasting.

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

### 1.1.0

- **New Feature**: Automatic programming language detection from clipboard content
  - Detects languages using keyword and pattern matching
  - Supports 15+ popular programming languages
  - Falls back to default language when detection is uncertain
  - Maintains backward compatibility with existing configurations

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
