const http = require('http');
const https = require('https');

const PORT = 8080;

const server = http.createServer((req, res) => {
    // Enable CORS for frontend
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Prefer');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // Forward the request to Replicate
    const targetUrl = new URL('https://api.replicate.com' + req.url);
    
    const options = {
        hostname: targetUrl.hostname,
        path: targetUrl.pathname + targetUrl.search,
        method: req.method,
        headers: req.headers
    };
    
    // Remove host header to avoid SSL conflicts
    delete options.headers.host;
    // Remove origin/referer so Replicate treats it as a standard backend call
    delete options.headers.origin;
    delete options.headers.referer;
    
    const proxyReq = https.request(options, (proxyRes) => {
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        proxyRes.pipe(res);
    });
    
    proxyReq.on('error', (e) => {
        console.error("Proxy Error:", e.message);
        res.writeHead(500);
        res.end(e.message);
    });
    
    req.pipe(proxyReq);
});

server.listen(PORT, () => {
    console.log(`\n✅ CORS Proxy Server berjaya dihidupkan di port ${PORT}`);
    console.log(`Menghubungkan frontend ke pelayan rasmi Replicate API...`);
    console.log(`Sila buka index.html di browser anda sekarang.\n`);
});
