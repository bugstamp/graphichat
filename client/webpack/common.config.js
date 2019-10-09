const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const paths = require('../../paths');

module.exports = merge([
  {
    entry: {
      app: [
        'core-js',
        'regenerator-runtime/runtime',
        paths.client.index,
      ],
    },

    output: {
      filename: '[name].[hash].js',
      chunkFilename: '[name].[hash].js',
      path: paths.client.public,
      publicPath: '/',
    },

    module: {
      rules: [
        {
          test: /\.js(x)?$/,
          exclude: [
            paths.client.modules,
            paths.client.public,
          ],
          use: [
            {
              loader: 'babel-loader',
              options: {
                rootMode: 'upward-optional',
              },
            },
            'stylelint-custom-processor-loader',
          ],
        },
        {
          test: /\.(graphql|gql)$/,
          exclude: /node_modules/,
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
          include: paths.client.assets,
          use: {
            loader: 'file-loader',
            options: {
              context: paths.client.images,
              name: 'assets/images/[path][name].[ext]',
            },
          },
        },
        {
          test: /\.(svg|eot|ttf|otf|woff|woff2)$/,
          include: paths.client.assets,
          use: {
            loader: 'file-loader',
            options: {
              context: paths.client.fonts,
              name: 'assets/fonts/[path][name].[ext]',
            },
          },
        },
        {
          test: /\.(svg|eot|ttf|otf|woff|woff2)$/,
          include: paths.client.modules,
          use: {
            loader: 'file-loader',
            options: {
              context: paths.client.modules,
              name: 'assets/fonts/[name].[ext]',
            },
          },
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: paths.client.template,
        favicon: paths.client.favicon,
        inject: 'body',
      }),
      new MiniCssExtractPlugin({
        filename: 'styles.css',
      }),
    ],

    resolve: {
      alias: {
        'react-dom': '@hot-loader/react-dom',
      },
      extensions: ['.js', '.jsx', '.json', '*'],
    },
  },
]);
