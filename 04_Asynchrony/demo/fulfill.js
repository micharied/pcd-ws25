import * as fs from 'node:fs';

const A = new Promise((resolve) => {
  fs.readFile('input1.txt', 'utf8', (err, data) => {
    resolve(data);
  });
});

const B = new Promise((resolve) => {
  fs.readFile('input2.txt', 'utf8', (err, data) => {
    resolve(data);
  });
});

A.then((a) => {
  B.then((b) => {
    console.log(a, b);
  });
});

