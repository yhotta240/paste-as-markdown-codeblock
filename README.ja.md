# Paste as Markdown Codeblock

[English version](./README.md)

`paste-as-markdown-codeblock` は、クリップボードからコードやテキストを Markdown コードブロックとして貼り付けることができる Visual Studio Code 拡張機能です。

## 機能

- **自動言語検出**: 拡張機能はクリップボードの内容から自動的にプログラミング言語を検出し、コードブロックのデフォルト言語として提案します。

- `Ctrl+Alt+V` でコピーしたコードを Markdown コードブロックとして貼り付けます

- `Ctrl+Space` を押して言語識別子（例：`JavaScript`、`Python`、`TypeScript`）を入力するか、検出された言語や設定された言語から選択します。

- エディタで右クリックして「Paste as Markdown CodeBlock」を選択すると、コンテキストメニューからコマンドを使用できます。

<br>
<img src="https://lh3.googleusercontent.com/d/146nlX5-7UHnvCKRrJeIbUoIePaCgSC9I" width="600" >

<br>

### 言語検出の仕組み

コードを貼り付けると、拡張機能はキーワードとパターンマッチングを使用してクリップボードの内容を分析し、プログラミング言語を識別します。サポートされている言語には以下が含まれます：
- Python、JavaScript、TypeScript、Java、C++、Go、Rust、Ruby、PHP
- Bash、HTML、CSS、JSON、SQL、YAML、XML
- その他多数...

言語が確実に検出された場合、コードブロックで事前選択されます。検出が不確実な場合、拡張機能は設定されたデフォルト言語にフォールバックします。

注意：自動言語検出はデフォルトで無効になっています。有効にするには、設定で `pasteAsMarkdownCodeblock.enableAutoDetection` をオンにしてください。

## 必要要件

特別な要件や依存関係は必要ありません。

- Visual Studio Code バージョン 1.xx 以降

## 拡張機能の設定

この拡張機能は以下の設定を提供します：

- `pasteAsMarkdownCodeblock.defaultLanguage`<br>
自動検出が失敗または不確実な場合にコードブロックを貼り付けるときに使用されるデフォルトの言語識別子を指定します。<br>
デフォルト: `"plaintext"`

- `pasteAsMarkdownCodeblock.languages`<br>
選択可能な言語識別子のリストを定義します。
このリストをカスタマイズして、頻繁に使用する言語のみを含めることができます。
自動検出された言語（存在する場合）は、貼り付け時に自動的にこのリストに追加されます。

デフォルト:

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

これらの設定は、設定 UI から、または `settings.json` ファイルを直接編集することで設定できます。

### キーボードショートカット
`Ctrl+Alt+V` を押すと、コピーしたコードを Markdown コードブロックとして貼り付けます（エディタがフォーカスされている場合のみ）。

## 既知の問題

- 入力によっては、言語名が正しく挿入されない場合があります。

- このコマンドには選択またはコピーされたテキストが必要です。何も提供されない場合、出力は生成されません。

## リリースノート

### 1.1.0

- **新機能**: クリップボードの内容から自動的にプログラミング言語を検出
  - キーワードとパターンマッチングを使用して言語を検出
  - 15種類以上の人気プログラミング言語をサポート
  - 検出が不確実な場合はデフォルト言語にフォールバック
  - 既存の設定との後方互換性を維持

### 1.0.0

- 初回リリース
- 選択したテキストを Markdown コードブロックとして貼り付ける機能を追加

## 拡張機能ガイドラインに従う

この拡張機能は、公式の VS Code 拡張機能開発ガイドラインに従っています。

- [拡張機能ガイドライン](https://code.visualstudio.com/api/references/extension-guidelines)

## ライセンス

この拡張機能は [MIT ライセンス](./LICENSE) の下でライセンスされています。

この拡張機能をご利用いただきありがとうございます！<br>
バグ報告や機能リクエストは、Issues ページからお気軽にお寄せください。
