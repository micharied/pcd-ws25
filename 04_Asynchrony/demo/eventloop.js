
console.log('START');

Promise.resolve()
  .then(() => console.log('A1'))
  .then(() => console.log('A2'));

Promise.resolve()
  .then(() => console.log('B1'))
  .then(() => console.log('B2'));

console.log('END');

