const http = require('http');

http.createServer((request, response) => {
  response.end('Hello node');
}).listen(4000, () => console.log('The server is running'));
