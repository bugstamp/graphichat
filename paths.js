const path = require('path');

module.exports = {
  root: path.resolve(__dirname),
  env: path.resolve(__dirname),
  client: path.resolve(__dirname, 'client'),
  index: path.resolve(__dirname, 'client/index.js'),
  assets: path.resolve(__dirname, 'client/assets'),
  template: path.resolve(__dirname, 'client/assets/template.html'),
  favicon: path.resolve(__dirname, 'client/assets/favicon.ico'),
  fonts: path.resolve(__dirname, 'client/assets/fonts'),
  images: path.resolve(__dirname, 'client/assets/images'),
  public: path.resolve(__dirname, 'public'),
  html: path.resolve(__dirname, 'public/index.html'),
  modules: path.resolve(__dirname, 'node_modules'),
};
