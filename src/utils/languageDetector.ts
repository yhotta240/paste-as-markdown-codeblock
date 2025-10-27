/**
 * Language detection utility for automatic programming language identification
 * from clipboard content.
 */

interface LanguagePattern {
    keywords: string[];
    patterns: RegExp[];
    weight: number;
}

/**
 * Language detection patterns
 * Each language has:
 * - keywords: Unique keywords that indicate the language
 * - patterns: Regular expressions for language-specific syntax
 * - weight: Base confidence weight for the language
 */
const languagePatterns: Record<string, LanguagePattern> = {
    python: {
        keywords: ['def ', 'import ', 'from ', 'class ', 'self', '__init__', 'elif', 'None', 'True', 'False', 'async def', 'await '],
        patterns: [
            /^\s*def\s+\w+\s*\(/m,
            /^\s*class\s+\w+.*:/m,
            /^\s*import\s+\w+/m,
            /^\s*from\s+\w+\s+import/m,
            /^\s*@\w+/m, // decorators
            /\bself\.\w+/,
        ],
        weight: 1.0,
    },
    javascript: {
        keywords: ['function', 'const ', 'let ', 'var ', 'console.log', '=>', 'require(', 'module.exports'],
        patterns: [
            /\bfunction\s+\w+\s*\(/,
            /\b(const|let|var)\s+\w+\s*=/,
            /=>\s*{/,
            /console\.(log|error|warn)/,
            /require\(['"]/,
            /module\.exports/,
        ],
        weight: 1.0,
    },
    typescript: {
        keywords: ['interface ', 'type ', ': string', ': number', ': boolean', 'enum ', 'namespace ', 'implements '],
        patterns: [
            /\binterface\s+\w+/,
            /\btype\s+\w+\s*=/,
            /:\s*(string|number|boolean|any|void|never)/,
            /\benum\s+\w+/,
            /<\w+>/,
            /\bnamespace\s+\w+/,
        ],
        weight: 1.2, // Higher weight as it's more specific
    },
    java: {
        keywords: ['public class', 'private ', 'protected ', 'public static void main', 'extends ', 'implements ', '@Override'],
        patterns: [
            /\bpublic\s+class\s+\w+/,
            /\b(public|private|protected)\s+(static\s+)?\w+\s+\w+\s*\(/,
            /\bpublic\s+static\s+void\s+main/,
            /\bextends\s+\w+/,
            /\bimplements\s+\w+/,
            /@\w+/,
        ],
        weight: 1.0,
    },
    cpp: {
        keywords: ['#include', 'std::', 'cout', 'cin', 'namespace ', 'template<', 'nullptr'],
        patterns: [
            /^#include\s*[<"]/m,
            /\bstd::/,
            /\bnamespace\s+\w+/,
            /\btemplate\s*</,
            /\bcout\s*<</,
            /\bcin\s*>>/,
        ],
        weight: 1.0,
    },
    go: {
        keywords: ['package ', 'func ', 'import ', 'go ', 'defer ', 'chan ', ':='],
        patterns: [
            /^\s*package\s+\w+/m,
            /^\s*func\s+(\w+\s*)?\(/m,
            /^\s*import\s+\(/m,
            /\s*:=\s*/,
            /\bgo\s+\w+\(/,
            /\bdefer\s+/,
            /\bchan\s+/,
        ],
        weight: 1.0,
    },
    rust: {
        keywords: ['fn ', 'let mut', 'impl ', 'trait ', 'pub ', 'use ', 'match ', '&mut ', 'Some(', 'None'],
        patterns: [
            /\bfn\s+\w+\s*\(/,
            /\blet\s+(mut\s+)?\w+/,
            /\bimpl\s+/,
            /\btrait\s+\w+/,
            /\bpub\s+(fn|struct|enum)/,
            /\bmatch\s+\w+/,
        ],
        weight: 1.0,
    },
    ruby: {
        keywords: ['def ', 'end', 'require ', 'class ', 'module ', 'puts ', 'attr_accessor'],
        patterns: [
            /^\s*def\s+\w+/m,
            /^\s*class\s+\w+/m,
            /^\s*module\s+\w+/m,
            /\battr_(accessor|reader|writer)/,
            /\b(puts|print|p)\s+/,
            /\bdo\s*\|/,
        ],
        weight: 1.0,
    },
    php: {
        keywords: ['<?php', 'function ', 'class ', '$_GET', '$_POST', 'echo ', 'namespace '],
        patterns: [
            /^<\?php/m,
            /\$\w+/,
            /\bfunction\s+\w+\s*\(/,
            /\bclass\s+\w+/,
            /\becho\s+/,
            /\bnamespace\s+/,
        ],
        weight: 1.0,
    },
    bash: {
        keywords: ['#!/bin/bash', '#!/bin/sh', 'echo ', 'if [', 'then', 'fi', 'export '],
        patterns: [
            /^#!\/bin\/(bash|sh)/m,
            /\bif\s+\[/,
            /\bthen\b/,
            /\bfi\b/,
            /\bexport\s+\w+=/,
            /\$\{?\w+\}?/,
        ],
        weight: 1.0,
    },
    html: {
        keywords: ['<!DOCTYPE', '<html', '<head', '<body', '<div', '<span', '<script'],
        patterns: [
            /^<!DOCTYPE\s+html>/mi,
            /<html[^>]*>/i,
            /<(head|body|div|span|p|a|script|style)[^>]*>/i,
            /<\/\w+>/,
        ],
        weight: 1.0,
    },
    css: {
        keywords: ['{', '}', ':', ';', 'display:', 'color:', 'background:', 'margin:', 'padding:'],
        patterns: [
            /[\w-]+\s*\{[^}]*\}/,
            /[\w-]+\s*:\s*[^;]+;/,
            /@media\s/,
            /\.([\w-]+)\s*\{/,
            /#[\w-]+\s*\{/,
        ],
        weight: 0.8, // Lower weight as CSS patterns are common
    },
    json: {
        keywords: [],
        patterns: [
            /^\s*\{/m,
            /^\s*\[/m,
            /"\w+"\s*:\s*/,
            /:\s*(true|false|null)\b/,
            /:\s*\d+(\.\d+)?/,
        ],
        weight: 0.7, // Lower weight as JSON is simple
    },
    sql: {
        keywords: ['SELECT ', 'FROM ', 'WHERE ', 'INSERT INTO', 'UPDATE ', 'DELETE FROM', 'CREATE TABLE', 'ALTER TABLE'],
        patterns: [
            /\bSELECT\s+.*\s+FROM\s+/i,
            /\bINSERT\s+INTO\s+/i,
            /\bUPDATE\s+\w+\s+SET\s+/i,
            /\bDELETE\s+FROM\s+/i,
            /\bCREATE\s+TABLE\s+/i,
        ],
        weight: 1.0,
    },
    yaml: {
        keywords: ['---', 'apiVersion:', 'kind:', 'metadata:', 'spec:'],
        patterns: [
            /^---$/m,
            /^\w+:\s*$/m,
            /^\s+-\s+\w+/m,
            /^\w+:\s+\w+$/m,
        ],
        weight: 0.8,
    },
    xml: {
        keywords: ['<?xml', '</', '/>'],
        patterns: [
            /^<\?xml\s/m,
            /<\w+[^>]*>/,
            /<\/\w+>/,
            /\/>/,
        ],
        weight: 0.9,
    },
};

/**
 * Detects the programming language from the given code snippet
 * @param code The code snippet to analyze
 * @returns The detected language identifier, or null if no language could be confidently detected
 */
export function detectLanguage(code: string): string | null {
    if (!code || code.trim().length === 0) {
        return null;
    }

    const scores: Record<string, number> = {};
    const normalizedCode = code.toLowerCase();

    // Calculate scores for each language
    for (const [language, pattern] of Object.entries(languagePatterns)) {
        let score = 0;

        // Check keywords
        for (const keyword of pattern.keywords) {
            if (normalizedCode.includes(keyword.toLowerCase())) {
                score += pattern.weight;
            }
        }

        // Check patterns (use original code for case-sensitive matching)
        for (const regex of pattern.patterns) {
            if (regex.test(code)) {
                score += pattern.weight * 1.5; // Patterns are more reliable than keywords
            }
        }

        if (score > 0) {
            scores[language] = score;
        }
    }

    // Find the language with the highest score
    const entries = Object.entries(scores);
    if (entries.length === 0) {
        return null;
    }

    entries.sort((a, b) => b[1] - a[1]);
    const [topLanguage, topScore] = entries[0];

    // Require a minimum confidence threshold
    const CONFIDENCE_THRESHOLD = 1.0;
    if (topScore < CONFIDENCE_THRESHOLD) {
        return null;
    }

    // If the top two scores are very close, be conservative and return null
    if (entries.length > 1) {
        const [, secondScore] = entries[1];
        if (topScore - secondScore < 0.5) {
            return null;
        }
    }

    return topLanguage;
}
