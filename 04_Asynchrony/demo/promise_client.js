
const A = fetch('http://localhost:8001')
  .then(response => response.text());

const B = fetch('http://localhost:8002')
  .then(response => response.text());

A.then( (a) => {
  B.then( (b) => {
    console.log(parseInt(a) + parseInt(b));
  });
});

