
const timeout = new Promise((_, reject) =>
  setTimeout(() => reject(new Error('timeout')), 1000)
);

const request = fetch('http://localhost:8001')
  .then(response => response.text());

Promise.race([request, timeout]).then(result => {
  console.log(result);
}).catch(err => {
  console.error(err.message);
});

