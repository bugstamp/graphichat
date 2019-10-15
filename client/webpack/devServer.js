const paths = require('./paths');

module.exports = ({ host, port, proxy } = {}) => ({
  devServer: {
    contentBase: paths.public,
    inline: true,
    host,
    port,
    hot: true,
    hotOnly: true,
    historyApiFallback: true,
    open: false,
    proxy,
    watchOptions: {
      aggregateTimeout: 500,
      poll: process.env.WEBPACK_DEV_SERVER_POOL || false,
    },
  },
});
