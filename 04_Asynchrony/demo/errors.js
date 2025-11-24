import * as fs from 'node:fs';

const A = new Promise((resolve, reject) => {
  fs.readFile('input1.txt', 'utf8', (err, data) => {
    if (err) reject(err);
    else resolve(data);
  });
});

const B = new Promise((resolve, reject) => {
  fs.readFile('input2.txt', 'utf8', (err, data) => {
    if (err) reject(err);
    else resolve(data);
  });
});

A.then((a) => {
  B.then((b) => {
    console.log(a, b);
  });
}).catch((err) => {
  console.error('Error occured');
});

