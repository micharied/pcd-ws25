
let timeout = new Promise((_, reject) =>
  setTimeout(() => reject(new Error('timeout')), 10000)
);

let request = fetch('http://localhost:8001')
  .then(response => response.text());

while (!(timeout.resolved || request.resolved)) {

}

Promise.race([request, timeout]).then(result => {
  console.log(result);
}).catch(err => {
  console.log(err.message);
});

