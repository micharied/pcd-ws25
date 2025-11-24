import * as http from 'node:http';

const server = http.createServer((req, res) => {
  console.log("request received");
  setTimeout(() => res.end('5\n'), 2000);
});

server.listen(8001);
