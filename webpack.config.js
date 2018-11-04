const merge = require('webpack-merge');

const commonConfig = require('./webpack/common.config');
const devConfig = require('./webpack/dev.config');
const prodConfig = require('./webpack/prod.config');

module.exports = (mode) => {
  if (mode === 'production') {
    return merge(commonConfig, prodConfig, { mode });
  }

  return merge(commonConfig, devConfig, { mode });
};
