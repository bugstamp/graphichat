"use strict";

var _express = _interopRequireDefault(require("express"));

var _apolloServerExpress = require("apollo-server-express");

var _apolloErrors = require("apollo-errors");

var _cors = _interopRequireDefault(require("cors"));

require("./dotenv");

var _paths = _interopRequireDefault(require("../../paths"));

var _db = _interopRequireDefault(require("./db"));

var _schemas = _interopRequireDefault(require("./schemas"));

var _resolvers = _interopRequireDefault(require("./resolvers"));

var _routers = _interopRequireDefault(require("./routers"));

var _middlewares = _interopRequireDefault(require("./middlewares"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tokenVerification = _middlewares.default.tokenVerification;
var verification = _routers.default.verification;
var app = (0, _express.default)();
var port = process.env.PORT;
var apolloPath = process.env.APOLLO_PATH;
var apolloServer = new _apolloServerExpress.ApolloServer({
  typeDefs: _schemas.default,
  resolvers: _resolvers.default,
  formatError: _apolloErrors.formatError,
  context: function context(_ref) {
    var req = _ref.req;
    var user = req.user;
    return {
      db: _db.default,
      user: user
    };
  }
});
var corsOptions = {};
app.use(_express.default.static(_paths.default.public));
app.use((0, _cors.default)(corsOptions));
app.use(tokenVerification);
app.use(verification);
apolloServer.applyMiddleware({
  app: app,
  path: apolloPath
});
app.get('*', function (req, res) {
  res.sendFile(_paths.default.html);
});
app.listen({
  port: port
}, function () {
  console.log("Server is listening on port - ".concat(port));
});