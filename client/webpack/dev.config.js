const merge = require('webpack-merge');
const Dotenv = require('dotenv-webpack');

const devServer = require('./devServer');

module.exports = merge([
  devServer({
    host: process.env.DEV_HOST || 'localhost',
    port: process.env.DEV_PORT || '8000',
    proxy: {
      '/api/**': process.env.API || 'http://localhost:3000',
    },
  }),
  {
    plugins: [
      new Dotenv({
        path: process.env.DOTENV_PATH || '../.env',
        expand: true,
      }),
    ],
    devtool: 'cheap-module-eval-source-map',
  },
]);
