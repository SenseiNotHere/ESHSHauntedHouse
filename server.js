const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('File not found');
    } else {
      res.writeHead(200, { 'Content-Type': getContentType(filePath) });
      res.end(data);
    }
  });
});

function getContentType(filePath) {
  const ext = path.extname(filePath);
  switch (ext) {
    case '.html': return 'text/html';
    case '.png': return 'image/png';
    default: return 'text/plain';
  }
}

server.listen(8000, () => {
  console.log('Server running at http://localhost:8000');
});