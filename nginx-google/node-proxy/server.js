// include dependencies
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

// proxy middleware options
const options = {
  target: 'https://www.google.com', // target host
  changeOrigin: true, // needed for virtual hosted sites
  ws: true, // proxy websockets
  pathRewrite: {
  },
};

// create the proxy (without context)
const exampleProxy = createProxyMiddleware(options);

// mount `exampleProxy` in web server
const app = express();
app.use('/', exampleProxy);
app.listen(3000);
