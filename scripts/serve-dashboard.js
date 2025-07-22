const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 8080;

// MIME types
const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.txt': 'text/plain',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);
    
    // Parse URL
    const parsedUrl = url.parse(req.url);
    let pathname = parsedUrl.pathname;
    
    // Default to index.html
    if (pathname === '/') {
        pathname = '/index.html';
    }
    
    // Map URL to file system path
    let filePath;
    if (pathname.startsWith('/functional/') || pathname.startsWith('/performance/') || pathname.startsWith('/js/')) {
        // Serve from src/main/resources
        filePath = path.join(__dirname, '../src/main/resources', pathname);
    } else {
        // Serve from src/main/resources
        filePath = path.join(__dirname, '../src/main/resources', pathname);
    }
    
    // Get file extension
    const ext = path.extname(filePath);
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    
    // Read and serve file
    fs.readFile(filePath, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                console.log(`❌ File not found: ${filePath}`);
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - File Not Found</h1>');
            } else {
                console.log(`❌ Server error: ${err.code}`);
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end('<h1>500 - Internal Server Error</h1>');
            }
        } else {
            console.log(`✅ Serving: ${filePath}`);
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
});

server.listen(PORT, () => {
    console.log(`🚀 Servidor iniciado en http://localhost:${PORT}`);
    console.log(`📊 Dashboard disponible en: http://localhost:${PORT}/index.html`);
    console.log(`📁 Sirviendo archivos desde: src/main/resources/`);
    console.log(`\n💡 Presiona Ctrl+C para detener el servidor`);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Deteniendo servidor...');
    server.close(() => {
        console.log('✅ Servidor detenido');
        process.exit(0);
    });
}); 