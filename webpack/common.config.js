const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = require('./paths');

module.exports = merge([
  {
    entry: {
      app: [
        '@babel/polyfill',
        paths.client.index,
      ],
    },

    output: {
      filename: '[name].[hash].js',
      chunkFilename: '[name].[hash].js',
      path: paths.public,
      publicPath: '/',
    },

    module: {
      rules: [
        {
          test: /\.js(x)?$/,
          exclude: [
            paths.modules,
            paths.public,
          ],
          use: [
            'babel-loader',
            'stylelint-custom-processor-loader',
          ],
        },
        {
          test: /\.html$/,
          use: ['html-loader'],
        },
        {
          test: /\.(png|jpeg|jpg|gif)$/,
          include: paths.client.assets.root,
          use: {
            loader: 'file-loader',
            options: {
              context: paths.client.assets.images,
              name: 'assets/images/[path][name].[ext]',
            },
          },
        },
        {
          test: /\.(svg|eot|ttf|otf|woff|woff2)$/,
          include: paths.client.assets.root,
          use: {
            loader: 'file-loader',
            options: {
              context: paths.client.assets.fonts,
              name: 'assets/fonts/[path][name].[ext]',
            },
          },
        },
        // Import fonts/icons from "node_modules"
        {
          test: /\.(svg|eot|ttf|otf|woff|woff2)$/,
          include: paths.modules,
          use: {
            loader: 'file-loader',
            options: {
              context: paths.modules,
              name: 'assets/fonts/[name].[ext]',
            },
          },
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: paths.client.assets.html,
        favicon: paths.client.assets.favicon,
        inject: 'body',
      }),
    ],

    externals: {
      lodash: {
        commonjs: 'lodash',
        amd: 'lodash',
        root: '_', // indicates global variable
      },
    },

    resolve: {
      modules: [paths.modules],
      extensions: ['.js', '.jsx', '.json', '*'],
    },
  },
]);
