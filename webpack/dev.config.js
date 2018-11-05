const webpack = require('webpack');
const merge = require('webpack-merge');

const devServer = require('./devServer');

module.exports = merge([
  devServer({
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || '8000',
  }),
  {
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
    ],

    devtool: 'cheap-module-eval-source-map',
  },
]);
