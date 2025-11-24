import * as fs from 'node:fs/promises';

try {
  let a = fs.readFile('input1.txt', 'utf8');
  let b = fs.readFile('input2.txt', 'utf8');
  console.log(await a, await b);
} catch (err) {
  console.error('Fehler');
}

