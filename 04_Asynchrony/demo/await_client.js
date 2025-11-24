
let A = fetch('http://localhost:8001');
let B = fetch('http://localhost:8002');

let a = parseInt(await ((await A).text()));
let b = parseInt(await (await B).text());

console.log(a + b);

