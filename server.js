const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());

// Proxy /v1 requests to Replicate API
// NOTE: Express strips the '/v1' prefix when mounted with app.use('/v1', ...).
// So the proxy sees paths like '/account' and must prepend '/v1/' back.
app.use('/v1', createProxyMiddleware({
    target: 'https://api.replicate.com/v1',
    changeOrigin: true,
    logger: console,
    on: {
        proxyReq: (proxyReq, req, res) => {
            proxyReq.removeHeader('origin');
            proxyReq.removeHeader('referer');
            console.log(`[PROXY] ${req.method} ${req.originalUrl} -> ${proxyReq.protocol}//${proxyReq.getHeader('host')}${proxyReq.path}`);
        },
        proxyRes: (proxyRes, req, res) => {
            console.log(`[PROXY RES] ${proxyRes.statusCode} for ${req.originalUrl}`);
        },
        error: (err, req, res) => {
            console.error('[PROXY ERROR]', err.message);
        }
    }
}));

// Serve static frontend files (index.html, app.js, styles.css)
app.use(express.static(path.join(__dirname, '/')));

app.listen(PORT, () => {
    console.log(`✅ Production-ready Server is running at port ${PORT}`);
    console.log(`Sila buka http://localhost:${PORT} di browser anda.`);
});
