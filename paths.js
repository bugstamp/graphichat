const path = require('path');

module.exports = {
  root: path.resolve(__dirname),
  modules: path.resolve(__dirname, 'node_modules'),
  env: path.resolve(__dirname, '/.env'),
  prodEnv: path.resolve(__dirname, '/.env.prod'),
  src: path.resolve(__dirname, 'client'),
  index: path.resolve(__dirname, 'client/index.js'),
  srcSw: path.resolve(__dirname, 'client/sw.js'),
  assets: path.resolve(__dirname, 'client/assets'),
  template: path.resolve(__dirname, 'client/assets/template.html'),
  favicon: path.resolve(__dirname, 'client/assets/favicon.ico'),
  fonts: path.resolve(__dirname, 'client/assets/fonts'),
  images: path.resolve(__dirname, 'client/assets/images'),
  public: path.resolve(__dirname, 'build/client'),
  html: path.resolve(__dirname, 'build/client/index.html'),
  publicSw: path.resolve(__dirname, 'build/client/service-worker.js'),
};
