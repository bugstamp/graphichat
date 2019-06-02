"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("reflect-metadata");

var _express = _interopRequireDefault(require("express"));

var _http = require("http");

var _apolloServerExpress = require("apollo-server-express");

var _graphql = require("graphql");

var _subscriptionsTransportWs = require("subscriptions-transport-ws");

var _apolloErrors = require("apollo-errors");

var _cors = _interopRequireDefault(require("cors"));

require("./dotenv");

var _paths = _interopRequireDefault(require("../../paths"));

var _middlewares = _interopRequireDefault(require("./middlewares"));

var _routers = _interopRequireDefault(require("./routers"));

var _modules = _interopRequireDefault(require("./modules"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var tokenVerification = _middlewares.default.tokenVerification;
var verification = _routers.default.verification;
var port = process.env.PORT;
var apolloPath = process.env.APOLLO_PATH;
var apolloUrl = process.env.APOLLO_URL;
var wsPath = process.env.WS_PATH;
var wsUrl = process.env.WS_URL;

var startServer = function startServer(_ref) {
  var schema = _ref.schema,
      subscriptions = _ref.subscriptions;
  var app = (0, _express.default)();
  var apolloServer = new _apolloServerExpress.ApolloServer({
    schema: schema,
    formatError: _apolloErrors.formatError,
    context: function context(session) {
      return session;
    }
  });
  var corsOptions = {
    exposedHeaders: ['x-token', 'x-refresh-token']
  };
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
  var ws = (0, _http.createServer)(app);
  ws.listen(port, function () {
    console.log("Server ready at ".concat(apolloUrl));
    console.log("Subscriptions ready at ".concat(wsUrl));

    _subscriptionsTransportWs.SubscriptionServer.create(_objectSpread({
      schema: schema,
      execute: _graphql.execute,
      subscribe: _graphql.subscribe
    }, subscriptions), {
      server: ws,
      path: wsPath
    });
  });
};

startServer(_modules.default);
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(tokenVerification, "tokenVerification", "C:\\Users\\Professional\\Google \u0414\u0438\u0441\u043A\\web\\projects\\react\\test-graphql\\server\\src\\index.js");
  reactHotLoader.register(verification, "verification", "C:\\Users\\Professional\\Google \u0414\u0438\u0441\u043A\\web\\projects\\react\\test-graphql\\server\\src\\index.js");
  reactHotLoader.register(port, "port", "C:\\Users\\Professional\\Google \u0414\u0438\u0441\u043A\\web\\projects\\react\\test-graphql\\server\\src\\index.js");
  reactHotLoader.register(apolloPath, "apolloPath", "C:\\Users\\Professional\\Google \u0414\u0438\u0441\u043A\\web\\projects\\react\\test-graphql\\server\\src\\index.js");
  reactHotLoader.register(apolloUrl, "apolloUrl", "C:\\Users\\Professional\\Google \u0414\u0438\u0441\u043A\\web\\projects\\react\\test-graphql\\server\\src\\index.js");
  reactHotLoader.register(wsPath, "wsPath", "C:\\Users\\Professional\\Google \u0414\u0438\u0441\u043A\\web\\projects\\react\\test-graphql\\server\\src\\index.js");
  reactHotLoader.register(wsUrl, "wsUrl", "C:\\Users\\Professional\\Google \u0414\u0438\u0441\u043A\\web\\projects\\react\\test-graphql\\server\\src\\index.js");
  reactHotLoader.register(startServer, "startServer", "C:\\Users\\Professional\\Google \u0414\u0438\u0441\u043A\\web\\projects\\react\\test-graphql\\server\\src\\index.js");
  leaveModule(module);
})();

;