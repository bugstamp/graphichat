const merge = require('webpack-merge');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const paths = require('./paths');

module.exports = merge([
  {
    entry: {
      app: [
        'core-js',
        'regenerator-runtime/runtime',
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
          exclude: [paths.modules, paths.public],
          use: [
            'babel-loader',
            'stylelint-custom-processor-loader',
          ],
        },
        {
          test: /\.(graphql|gql)$/,
          exclude: [paths.modules],
          loader: 'graphql-tag/loader',
        },
        {
          test: /\.html$/,
          use: ['html-loader'],
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            'css-loader',
          ],
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
      new Dotenv({
        path: process.env.DOTENV_PATH || './.env',
        expand: true,
        allowEmptyValues: true,
        systemvars: true,
      }),
      new HtmlWebpackPlugin({
        template: paths.template,
        favicon: paths.favicon,
        inject: 'body',
        chunksSortMode: 'none',
      }),
      new MiniCssExtractPlugin({
        filename: 'styles.css',
      }),
    ],
    resolve: {
      alias: {
        'react-dom': '@hot-loader/react-dom',
        appHistory: paths.history,
        config: paths.config,
      },
      extensions: ['.js', '.jsx', '.json', '*'],
    },
  },
]);
