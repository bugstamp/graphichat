const paths = require('../../paths');

module.exports = ({ host, port, proxy } = {}) => ({
  devServer: {
    contentBase: paths.client.public,
    inline: true,
    host,
    port,
    hot: true,
    hotOnly: true,
    historyApiFallback: true,
    open: false,
    proxy,
  },
});
