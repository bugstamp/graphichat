const path = require('path');

const paths = {
  root: path.resolve(__dirname, '../'),
  config: path.resolve(__dirname, '../src/config.js'),
  modules: path.resolve(__dirname, '../node_modules'),
  envProd: path.resolve(__dirname, '../.env.prod'),
  source: path.resolve(__dirname, '../src'),
  index: path.resolve(__dirname, '../src/index.js'),
  worker: path.resolve(__dirname, '../src/worker.js'),
  assets: path.resolve(__dirname, '../src/assets'),
  template: path.resolve(__dirname, '../src/assets/template.html'),
  favicon: path.resolve(__dirname, '../src/assets/favicon.ico'),
  fonts: path.resolve(__dirname, '../src/assets/fonts'),
  images: path.resolve(__dirname, '../src/assets/images'),
  public: path.resolve(__dirname, '../build'),
  html: path.resolve(__dirname, '../build/index.html'),
  history: path.resolve(__dirname, '../src/router/history'),
  publicSw: path.resolve(__dirname, '../build/service-worker.js'),
  manifest: path.resolve(__dirname, '../build/manifest.webmanifest'),
};

module.exports = paths;
