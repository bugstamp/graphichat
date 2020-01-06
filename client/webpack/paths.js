const path = require('path');

const paths = {
  root: path.resolve(__dirname, '../'),
  config: path.resolve(__dirname, '../src/config.js'),
  modules: path.resolve(__dirname, '../node_modules'),
  envProd: path.resolve(__dirname, '../.env.prod'),
  source: path.resolve(__dirname, '../src'),
  index: path.resolve(__dirname, '../src/index.js'),
  srcSw: path.resolve(__dirname, '../src/sw.js'),
  assets: path.resolve(__dirname, '../src/assets'),
  template: path.resolve(__dirname, '../src/assets/template.html'),
  favicon: path.resolve(__dirname, '../src/assets/favicon.ico'),
  fonts: path.resolve(__dirname, '../src/assets/fonts'),
  images: path.resolve(__dirname, '../src/assets/images'),
  public: path.resolve(__dirname, '../build'),
  html: path.resolve(__dirname, '../build/index.html'),
  publicSw: path.resolve(__dirname, '../build/service-worker.js'),
};

module.exports = paths;
