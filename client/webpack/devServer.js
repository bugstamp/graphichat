const paths = require('./paths');

module.exports = ({ host, port, proxy } = {}) => ({
  devServer: {
    contentBase: paths.public,
    inline: true,
    hot: true,
    historyApiFallback: true,
    open: false,
    host,
    port,
    proxy,
    watchOptions: {
      ignored: [paths.modules, paths.build],
      aggregateTimeout: 300,
      poll: process.env.WEBPACK_DEV_SERVER_POOL || false,
    },
  },
});
