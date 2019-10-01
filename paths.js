const path = require('path');

const paths = {
  root: path.resolve(__dirname),
  env: path.resolve(__dirname, '.env'),
  client: {
    root: path.resolve(__dirname, 'client'),
    modules: path.resolve(__dirname, 'client/node_modules'),
    source: path.resolve(__dirname, 'client/src'),
    envProd: path.resolve(__dirname, 'client/.env.prod'),
    index: path.resolve(__dirname, 'client/src/index.js'),
    srcSw: path.resolve(__dirname, 'client/src/sw.js'),
    assets: path.resolve(__dirname, 'client/src/assets'),
    template: path.resolve(__dirname, 'client/src/assets/template.html'),
    favicon: path.resolve(__dirname, 'client/src/assets/favicon.ico'),
    fonts: path.resolve(__dirname, 'client/src/assets/fonts'),
    images: path.resolve(__dirname, 'client/src/assets/images'),
    public: path.resolve(__dirname, 'client/build'),
    html: path.resolve(__dirname, 'client/build/index.html'),
    publicSw: path.resolve(__dirname, 'client/build/service-worker.js'),
  },
};

module.exports = paths;
