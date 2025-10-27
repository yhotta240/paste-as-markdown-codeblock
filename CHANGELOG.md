# Change Log

All notable changes to the "paste-as-markdown-codeblock" extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-10-27

### Added

- **Automatic language detection** from clipboard content (Issue #1)
  - Intelligently detects programming languages using keyword and pattern matching
  - Supports 15+ popular languages: Python, JavaScript, TypeScript, Java, C++, Go, Rust, Ruby, PHP, Bash, HTML, CSS, JSON, SQL, YAML, XML, and more
  - Auto-detected language is pre-selected when pasting
  - Falls back to configured default language when detection is uncertain
  - Maintains full backward compatibility with existing user configurations

### Technical

- Added `src/utils/languageDetector.ts` with extensible language detection logic
- Updated paste command to utilize automatic language detection
- Added comprehensive test suite for language detection

## [1.0.2] - 2025-06-11

### Fixed

- Corrected the configuration title in package.json to match the extension display name.

### Docs

- Updated README.md to reflect actual functionality more accurately.

## [1.0.1] - 2025-06-08

### Changed

- Updated display name in `package.json` to "Paste as Markdown Code Block"

## [1.0.0] - 2025-06-08

### Added

- Initial release
- Paste selected text as a Markdown code block using `Ctrl+Alt+V`
- Insert language specifier with `Ctrl+Space` (e.g., JavaScript, Python, TypeScript)
- Added "Paste as Markdown Code Block" to editor context menu
