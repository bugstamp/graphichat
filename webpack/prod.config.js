const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');
const VisualizerPlugin = require('webpack-visualizer-plugin');

const paths = require('../paths');

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
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: true,
          terserOptions: {
            output: {
              comments: false,
            },
          },
          exclude: /\/node_modules/,
        }),
      ],
    },

    plugins: [
      new CleanWebpackPlugin([`${paths.public}/*`], {
        root: paths.root,
        exclude: [],
      }),
      new webpack.HashedModuleIdsPlugin(),
      new InjectManifest({
        swSrc: paths.srcSw,
        swDest: 'service-worker.js',
        globDirectory: 'build/',
        globPatterns: [
          '**/*.{css,html,js}',
        ],
      }),
      new VisualizerPlugin(),
    ],

    devtool: 'source-map',
  },
]);
