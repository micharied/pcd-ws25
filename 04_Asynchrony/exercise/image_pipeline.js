import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { cpus } from 'node:os';
import sharp from 'sharp';
import { runBenchmarked } from './benchmarking.js';

const OUTPUT_DIR = 'tmp';

await mkdir(OUTPUT_DIR, { recursive: true });

async function readUrls(filename) {
    return (await readFile(filename, 'utf8')).trim().split('\n');
}

async function downloadImage(url) {
    try {
        const response = await fetch(url);
        const buffer = Buffer.from(await response.arrayBuffer());
        return buffer;
    } catch (e) {
        console.error('Failed to download:', url, e.message);
        return null;
    }
}

async function toGrayscale(imageBuffer) {
    return await sharp(imageBuffer).grayscale().toBuffer();
}

async function saveImage(buffer, filename) {
    await writeFile(filename, buffer);
}

function outputPath(index) {
    const padded = String(index + 1).padStart(3, '0');
    return join(OUTPUT_DIR, `image_${padded}.png`);
}

async function processSingleImage(url, index) {
    const original = await downloadImage(url);
    if (!original) return null;
    const gray = await toGrayscale(original);
    const filePath = outputPath(index);
    await saveImage(gray, filePath);
    return filePath;
}

async function runWithConcurrency(urls, concurrency = cpus().length) {
    const clamped = Math.max(1, Math.min(concurrency, urls.length));
    const results = new Array(urls.length).fill(null);
    let nextIndex = 0;

    async function worker() {
        while (nextIndex < urls.length) {
            const current = nextIndex;
            nextIndex += 1;
            results[current] = await processSingleImage(urls[current], current);
        }
    }

    await Promise.all(Array.from({ length: clamped }, worker));
    return results.filter(Boolean);
}

async function imagePipeline() {
    const urls = await readUrls('images.csv');
    return runWithConcurrency(urls, cpus().length * 2);
}

function sameOutputs(a, b) {
    if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) return false;
    return a.every((value, idx) => value === b[idx]);
}

const processedFiles = await runBenchmarked({
    name: 'image_pipeline',
    runs: 2,
    run: imagePipeline,
    equals: sameOutputs
});

console.log(processedFiles);
