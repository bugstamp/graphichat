const merge = require('webpack-merge');
const Dotenv = require('dotenv-webpack');

const devServer = require('./devServer');

module.exports = merge([
  devServer({
    host: process.env.DEV_HOST || 'localhost',
    port: process.env.DEV_PORT || '8000',
    proxy: {
      '/api/**': `http://localhost:${process.env.PORT}`,
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
