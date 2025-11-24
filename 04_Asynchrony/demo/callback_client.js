import * as http from 'node:http';

let a, b;
let wasFirst = true;

http.get('http://localhost:8001', (A) => {
  A.once('data', (chunk) => {
    a = parseInt(chunk);
    if (wasFirst) {
      wasFirst = false
    } else {
      console.log(a + b)
    }
  });
});

http.get('http://localhost:8002', (B) => {
  B.once('data', (chunk) => {
    b = parseInt(chunk);
    if (wasFirst) {
      wasFirst = false;
    } else {
      console.log(a + b);
    }
  });
});

