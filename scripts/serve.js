#!/usr/bin/env node
/** serve.js — mini serveur statique local (dev), avec support Range pour la vidéo. */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const PORT = Number(process.env.PORT) || 4173;
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.mp4': 'video/mp4', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
  '.webp': 'image/webp', '.css': 'text/css', '.js': 'text/javascript',
};

http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (p.endsWith('/')) p += 'index.html';
  let abs = path.join(ROOT, p);
  if (!abs.startsWith(ROOT)) { res.writeHead(403).end(); return; }
  if (!fs.existsSync(abs) && fs.existsSync(abs + '.html')) abs += '.html';
  if (!fs.existsSync(abs) || fs.statSync(abs).isDirectory()) {
    const nf = path.join(ROOT, '404.html');
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(fs.existsSync(nf) ? fs.readFileSync(nf) : 'Not found');
    return;
  }
  const type = TYPES[path.extname(abs)] ?? 'application/octet-stream';
  const size = fs.statSync(abs).size;
  const range = req.headers.range?.match(/bytes=(\d*)-(\d*)/);
  if (range && (range[1] || range[2])) {
    const start = range[1] ? Number(range[1]) : 0;
    const end = range[2] ? Number(range[2]) : size - 1;
    res.writeHead(206, {
      'Content-Type': type, 'Accept-Ranges': 'bytes',
      'Content-Range': `bytes ${start}-${end}/${size}`, 'Content-Length': end - start + 1,
    });
    fs.createReadStream(abs, { start, end }).pipe(res);
  } else {
    res.writeHead(200, { 'Content-Type': type, 'Content-Length': size, 'Accept-Ranges': 'bytes' });
    fs.createReadStream(abs).pipe(res);
  }
}).listen(PORT, () => console.log(`Serveur : http://localhost:${PORT}/`));
