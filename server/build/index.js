"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

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

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

const {
  tokenVerification
} = _middlewares.default;
const {
  verification
} = _routers.default;
const port = process.env.PORT;
const apolloPath = process.env.APOLLO_PATH;
const apolloUrl = process.env.APOLLO_URL;
const wsPath = process.env.WS_PATH;
const wsUrl = process.env.WS_URL;

const startServer = ({
  schema,
  subscriptions
}) => {
  const app = (0, _express.default)();
  const apolloServer = new _apolloServerExpress.ApolloServer({
    schema,
    formatError: _apolloErrors.formatError,
    context: session => session
  });
  const corsOptions = {
    exposedHeaders: ['x-token', 'x-refresh-token']
  };
  app.use(_express.default.static(_paths.default.public));
  app.use((0, _cors.default)(corsOptions));
  app.use(tokenVerification);
  app.use(verification);
  apolloServer.applyMiddleware({
    app,
    path: apolloPath
  });
  app.get('/service-worker.js', (req, res) => {
    res.sendFile(_paths.default.publicSw);
  });
  app.get('*', (req, res) => {
    res.sendFile(_paths.default.html);
  });
  const ws = (0, _http.createServer)(app);
  ws.listen(port, () => {
    console.log(`Server ready at ${apolloUrl}`);
    console.log(`Subscriptions ready at ${wsUrl}`);

    _subscriptionsTransportWs.SubscriptionServer.create({
      schema,
      execute: _graphql.execute,
      subscribe: _graphql.subscribe,
      ...subscriptions
    }, {
      server: ws,
      path: wsPath
    });
  });
};

startServer(_modules.default);
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

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
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();