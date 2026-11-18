import http from 'http';
import fs from 'fs';
import path from 'path';

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf'
};

const ARTIFACT_DIR = 'C:\\Users\\PC\\.gemini\\antigravity\\brain\\b85e6102-b6eb-4565-9493-6e009226675e';

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);
  let filePath = '';

  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  }

  if (reqPath.startsWith('/reference/')) {
    const sub = reqPath.replace(/^\/reference\/?/, '') || 'index.html';
    filePath = path.join(process.cwd(), 'homepage-design-reference', 'duyuf-homepage-reference', sub);
  } else if (reqPath.startsWith('/blueprint/')) {
    const sub = reqPath.replace(/^\/blueprint\/?/, '') || 'index.html';
    filePath = path.join(process.cwd(), 'blueprint-reference', 'duyuf-complete-site-blueprint', sub);
  } else if (reqPath.startsWith('/artifacts/')) {
    const sub = reqPath.replace(/^\/artifacts\/?/, '');
    filePath = path.join(ARTIFACT_DIR, sub);
  } else if (reqPath.startsWith('/assets/')) {
    filePath = path.join(process.cwd(), 'public', reqPath);
  } else if (reqPath.startsWith('/design-concepts/')) {
    filePath = path.join(process.cwd(), reqPath.slice(1));
  } else {
    filePath = path.join(process.cwd(), 'design-concepts', reqPath);
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
      'Access-Control-Allow-Origin': '*'
    });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
    res.end('Not Found: ' + reqPath);
  }
});

const PORT = 3008;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Universal Preview Server running on http://localhost:${PORT}`);
  console.log(`- Exact Design Reference: http://localhost:${PORT}/reference/index.html`);
  console.log(`- Full Site Blueprint:    http://localhost:${PORT}/blueprint/index.html`);
  console.log(`- Creative Decision Deck: http://localhost:${PORT}/index.html`);
});
