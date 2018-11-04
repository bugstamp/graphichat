const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const paths = require('./paths');

module.exports = merge([
  {
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
      minimizer: [
        new UglifyJSPlugin({
          cache: true,
          parallel: true,
          sourceMap: true,
          uglifyOptions: {
            output: {
              comments: false,
            },
          },
        }),
      ],
    },

    plugins: [
      new CleanWebpackPlugin([`${paths.public}/*`], {
        root: __dirname,
        exclude: [],
      }),
      new webpack.HashedModuleIdsPlugin(),
    ],

    devtool: 'source-map',
  },
]);
