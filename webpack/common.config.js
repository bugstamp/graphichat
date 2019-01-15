const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = require('../paths');

module.exports = merge([
  {
    entry: {
      app: [
        '@babel/polyfill',
        paths.index,
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
          include: paths.assets,
          use: {
            loader: 'file-loader',
            options: {
              context: paths.images,
              name: 'assets/images/[path][name].[ext]',
            },
          },
        },
        {
          test: /\.(svg|eot|ttf|otf|woff|woff2)$/,
          include: paths.assets,
          use: {
            loader: 'file-loader',
            options: {
              context: paths.fonts,
              name: 'assets/fonts/[path][name].[ext]',
            },
          },
        },
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
        template: paths.template,
        favicon: paths.favicon,
        inject: 'body',
      }),
    ],

    resolve: {
      modules: [paths.modules],
      extensions: ['.js', '.jsx', '.json', '*'],
    },
  },
]);
