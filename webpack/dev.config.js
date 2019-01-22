const webpack = require('webpack');
const merge = require('webpack-merge');

const devServer = require('./devServer');

module.exports = merge([
  devServer({
    host: 'localhost',
    port: '8000',
  }),
  {
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
    ],

    devtool: 'cheap-module-eval-source-map',
  },
]);
