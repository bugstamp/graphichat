const webpack = require('webpack');
const merge = require('webpack-merge');
const Dotenv = require('dotenv-webpack');

const devServer = require('./devServer');

module.exports = merge([
  devServer({
    host: 'localhost',
    port: '8000',
    proxy: {
      '/api/**': 'http://localhost:3000',
    },
  }),
  {
    plugins: [
      new Dotenv({
        expand: true,
      }),
      new webpack.HotModuleReplacementPlugin(),
    ],

    devtool: 'cheap-module-eval-source-map',
  },
]);
