const paths = require('./paths');

module.exports = ({ host, port } = {}) => ({
  devServer: {
    contentBase: paths.public,
    inline: true,
    host,
    port,
    hot: true,
    hotOnly: true,
    historyApiFallback: true,
    open: true,
    stats: 'errors-only',
  },
});
