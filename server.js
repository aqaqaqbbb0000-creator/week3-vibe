const http = require('http');
const fs = require('fs');
const path = require('path');

const port = Number(process.env.PORT) || 3000;
const host = '0.0.0.0';
const htmlPath = path.join(__dirname, 'bluetooth_content_share.html');

const server = http.createServer((req, res) => {
  if (req.method !== 'GET' || (req.url !== '/' && req.url !== '/index.html')) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not found');
    return;
  }

  fs.readFile(htmlPath, (error, data) => {
    if (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Unable to load the page');
      return;
    }

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(data);
  });
});

server.listen(port, host, () => {
  console.log(`Server listening on ${host}:${port}`);
});
