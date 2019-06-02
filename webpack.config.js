const merge = require('webpack-merge');

const common = require('./webpack/common.config');
const dev = require('./webpack/dev.config');
const prod = require('./webpack/prod.config');

module.exports = (mode) => {
  if (mode === 'production') {
    return merge(common, prod, { mode });
  }
  return merge(common, dev, { mode });
};
