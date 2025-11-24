import { readFile } from 'node:fs/promises';
import { runBenchmarked } from './benchmarking.js';

const urls = (await readFile('books.csv', 'utf8')).trim().split('\n');


async function downloadBook(url) {
    return fetch(url).then(res => res.text());
}

async function tokenizenString(string) {
    const lower = string.toLowerCase();
    const tokens = [];
    let wordStart = 0;
    let inWord = false;

    for (let i = 0, len = lower.length; i <= len; i += 1) {
        const code = i < len ? lower.charCodeAt(i) : 32;
        const isAlphaNum = (code >= 48 && code <= 57) || (code >= 97 && code <= 122);
        if (isAlphaNum) {
            if (!inWord) {
                wordStart = i;
                inWord = true;
            }
            continue;
        }

        if (inWord) {
            tokens.push(lower.slice(wordStart, i));
            inWord = false;
        }
    }

    return tokens;
}

async function countWords(tokens) {
    const wordCount = new Map();
    for (const token of tokens) {
        const count = wordCount.get(token) || 0;
        wordCount.set(token, count + 1);
    }

    return wordCount;
}

async function* downloadBooks(urlList) {
    for (const url of urlList) {
        yield { url, text: await downloadBook(url) };
    }
}

async function* tokenizeBooks(books) {
    for await (const { url, text } of books) {
        yield { url, tokens: await tokenizenString(text) };
    }
}

function mergeWordCounts(countA, countB) {
    for (const [word, count] of countB) {
        const existingCount = countA.get(word) || 0;
        countA.set(word, existingCount + count);
    }
    return countA;
}

async function wordCount() {
    let results = new Map();
    for await (const { url, tokens } of tokenizeBooks(downloadBooks(urls))) {
        const wordCount = await countWords(tokens);
        results = mergeWordCounts(results, wordCount);
    }
    results = new Map([...results.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10));
    return results;
}


function wordCountsEqual(countA, countB) {
    if (countA.size !== countB.size) return false;
    for (const [word, value] of countA) {
        if (countB.get(word) !== value) {
            return false;
        }
    }
    return true;
}

const result = await runBenchmarked({
    name: 'word_count',
    runs: 2,
    run: wordCount,
    equals: wordCountsEqual
});
console.log(result);
