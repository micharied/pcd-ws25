import * as http from 'node:http';

const server = http.createServer((req, res) => {
  console.log("request received");
  res.end('7\n');
});

server.listen(8002);
