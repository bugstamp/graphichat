const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
// const { GenerateSW } = require('workbox-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');

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
        root: paths.root,
        exclude: [],
      }),
      new webpack.HashedModuleIdsPlugin(),
      // new GenerateSW({
      //   clientsClaim: true,
      //   skipWaiting: true,
      //   runtimeCaching: [
      //     {
      //       urlPattern: /assets/,
      //       handler: 'cacheFirst',
      //     },
      //     {
      //       urlPattern: new RegExp('^https://fonts.(?:googleapis|gstatic).com/(.*)'),
      //       handler: 'cacheFirst',
      //     },
      //     {
      //       urlPattern: /.*/,
      //       handler: 'networkFirst',
      //     },
      //   ],
      // }),
      new Visualizer(),
    ],

    devtool: 'source-map',
  },
]);
