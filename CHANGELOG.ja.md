# 変更履歴

[English version](./CHANGELOG.md)

「paste-as-markdown-codeblock」拡張機能のすべての重要な変更はこのファイルに記録されます。

このフォーマットは [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) に基づいており、
このプロジェクトは [Semantic Versioning](https://semver.org/spec/v2.0.0.html) に準拠しています。

## [1.1.0] - 2025-11-25

### 追加

- **クリップボードの内容からの自動言語検出** (Issue #1)
  - キーワードとパターンマッチングを使用してプログラミング言語をインテリジェントに検出
  - Python、JavaScript、TypeScript、Java、C++、Go、Rust、Ruby、PHP、Bash、HTML、CSS、JSON、SQL、YAML、XML など、15種類以上の人気言語をサポート
  - 貼り付け時に自動検出された言語が事前選択されます
  - 検出が不確実な場合は、設定されたデフォルト言語にフォールバック
  - 既存のユーザー設定との完全な後方互換性を維持

### 技術的な変更

- 拡張可能な言語検出ロジックを含む `src/utils/languageDetector.ts` を追加
- 自動言語検出を利用するように貼り付けコマンドを更新
- 言語検出のための包括的なテストスイートを追加

## [1.0.2] - 2025-06-11

### 修正

- package.json の設定タイトルを拡張機能の表示名と一致するように修正しました。

### ドキュメント

- README.md を更新して、実際の機能をより正確に反映しました。

## [1.0.1] - 2025-06-08

### 変更

- `package.json` の表示名を「Paste as Markdown Code Block」に更新しました。

## [1.0.0] - 2025-06-08

### 追加

- 初回リリース
- `Ctrl+Alt+V` を使用して選択したテキストを Markdown コードブロックとして貼り付け
- `Ctrl+Space` で言語指定子を挿入（例：JavaScript、Python、TypeScript）
- エディタのコンテキストメニューに「Paste as Markdown Code Block」を追加
