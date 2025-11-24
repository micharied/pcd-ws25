export async function runBenchmarked({ name = 'program', runs = 2, run, equals } = {}) {
    if (typeof run !== 'function') {
        throw new Error('runBenchmarked expects a run function');
    }

    const results = [];
    for (let i = 0; i < runs; i += 1) {
        const start = process.hrtime.bigint();
        const value = await run();
        const durationMs = Number(process.hrtime.bigint() - start) / 1e6;
        results.push({ value, durationMs });
    }

    let fastestIndex = 0;
    let slowestIndex = 0;
    for (let i = 1; i < results.length; i += 1) {
        if (results[i].durationMs < results[fastestIndex].durationMs) {
            fastestIndex = i;
        }
        if (results[i].durationMs > results[slowestIndex].durationMs) {
            slowestIndex = i;
        }
    }

    const sameResult =
        typeof equals === 'function'
            ? results.every((runResult, index) => index === 0 || equals(results[0].value, runResult.value))
            : null;

    const runSummaries = results.map((runResult, index) => `run${index + 1} ${runResult.durationMs.toFixed(2)} ms`).join(', ');
    const hasSpeedup = results.length > 1 && fastestIndex !== slowestIndex;
    const speedup = hasSpeedup
        ? results[slowestIndex].durationMs / results[fastestIndex].durationMs
        : 1;
    const durationDiff = hasSpeedup
        ? Math.abs(results[fastestIndex].durationMs - results[slowestIndex].durationMs)
        : 0;

    const parts = [`${name} benchmark: ${runSummaries}`];
    parts.push(
        sameResult === null
            ? 'results not compared'
            : `results ${sameResult ? 'consistent' : 'divergent'}`
    );
    if (hasSpeedup) {
        parts.push(
            `fastest = run ${fastestIndex + 1} (${speedup.toFixed(2)}× faster than run ${slowestIndex + 1}, Δ ${durationDiff.toFixed(2)} ms)`
        );
    }
    console.error(parts.join('; '));

    return results[fastestIndex].value;
}
