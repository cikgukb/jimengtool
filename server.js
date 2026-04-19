const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());

// Proxy /v1 requests to Replicate API
app.use('/v1', createProxyMiddleware({
    target: 'https://api.replicate.com',
    changeOrigin: true,
    pathRewrite: {
        '^/v1': '/v1'
    },
    onProxyReq: (proxyReq, req, res) => {
        proxyReq.removeHeader('origin');
        proxyReq.removeHeader('referer');
    }
}));

// Serve static frontend files (index.html, app.js, styles.css)
app.use(express.static(path.join(__dirname, '/')));

app.listen(PORT, () => {
    console.log(`✅ Production-ready Server is running at port ${PORT}`);
    console.log(`Sila buka http://localhost:${PORT} di browser anda.`);
});
