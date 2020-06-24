const merge = require('webpack-merge');

const devServer = require('./devServer');

const host = process.env.DEV_HOST || 'localhost';
const port = process.env.DEV_PORT || 8000;
const api = `${process.env.URL_SCHEME || 'http'}://${process.env.URL_DOMAIN || 'localhost:3000'}`;

module.exports = merge([
  devServer({
    host,
    port,
    proxy: {
      '/api/**': api,
    },
  }),
  {
    devtool: 'cheap-module-eval-source-map',
  },
]);
