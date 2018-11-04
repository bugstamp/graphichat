const path = require('path');

module.exports = {
  client: {
    root: path.resolve(__dirname, '../client'),
    index: path.resolve(__dirname, '../client/index.js'),
    assets: {
      root: path.resolve(__dirname, '../client/assets'),
      html: path.resolve(__dirname, '../client/assets/template.html'),
      favicon: path.resolve(__dirname, '../client/assets/favicon.ico'),
      fonts: path.resolve(__dirname, '../client/assets/fonts'),
      images: path.resolve(__dirname, '../client/assets/images'),
    },
  },
  public: path.resolve(__dirname, '../public'),
  modules: path.resolve(__dirname, '../node_modules'),
};
