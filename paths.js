const path = require('path');

module.exports = {
  root: path.resolve(__dirname),
  env: path.resolve(__dirname, '/.env'),
  src: path.resolve(__dirname, 'src'),
  index: path.resolve(__dirname, 'src/index.js'),
  srcSw: path.resolve(__dirname, 'src/sw.js'),
  assets: path.resolve(__dirname, 'src/assets'),
  template: path.resolve(__dirname, 'src/assets/template.html'),
  favicon: path.resolve(__dirname, 'src/assets/favicon.ico'),
  fonts: path.resolve(__dirname, 'src/assets/fonts'),
  images: path.resolve(__dirname, 'src/assets/images'),
  public: path.resolve(__dirname, 'public'),
  publicSw: path.resolve(__dirname, 'public/service-worker.js'),
  html: path.resolve(__dirname, 'public/index.html'),
  modules: path.resolve(__dirname, 'node_modules'),
};
