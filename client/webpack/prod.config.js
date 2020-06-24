const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const {
  GenerateSW,
  // InjectManifest,
} = require('workbox-webpack-plugin');
const VisualizerPlugin = require('webpack-visualizer-plugin');

const paths = require('./paths');

module.exports = merge([
  {
    optimization: {
      namedChunks: true,
      chunkIds: 'named',
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
            safari10: true,
          },
          exclude: [paths.modules],
        }),
      ],
    },
    plugins: [
      new CleanWebpackPlugin([`${paths.public}/*`], {
        root: paths.root,
        exclude: [],
      }),
      new webpack.HashedModuleIdsPlugin(),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: `${paths.images}/short_icons`,
            to: 'assets/images',
          },
          {
            from: `${paths.assets}/manifest.webmanifest`,
            to: '',
          },
        ],
      }),
      new GenerateSW({
        clientsClaim: true,
        skipWaiting: true,
      }),
      // new InjectManifest({
      //   swSrc: paths.worker,
      //   swDest: 'worker.js',
      //   globDirectory: 'build/',
      //   globPatterns: [
      //     '**/*.{css,html,js}',
      //   ],
      // }),
      new VisualizerPlugin(),
    ],
    devtool: 'source-map',
  },
]);
