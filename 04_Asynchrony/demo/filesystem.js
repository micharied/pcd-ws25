import * as fs from 'node:fs';

try {
fs.readFile('input1.txt', 'utf8', (err, content) => {
  if (err) {
    throw err;
  }

  const upper = content.toUpperCase();

  fs.writeFile('output.txt', upper, (err) => {
    if (err) {
      throw err;
    }
  });
});
} catch (e) {
  console.log("error occured")
}

