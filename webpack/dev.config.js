const webpack = require('webpack');
const merge = require('webpack-merge');

const paths = require('./paths');

module.exports = merge([
  {
    devServer: {
      contentBase: paths.public,
      host: 'localhost',
      port: '8080',
      inline: true,
      hot: true,
      historyApiFallback: true,
      open: true,
    },

    plugins: [
      new webpack.HotModuleReplacementPlugin(),
    ],

    devtool: 'cheap-module-eval-source-map',
  },
]);
