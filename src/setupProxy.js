
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/holymbti',
    createProxyMiddleware({
      target: 'https://www.holymbti.kro.kr',
      changeOrigin: true,
    })
  );
};