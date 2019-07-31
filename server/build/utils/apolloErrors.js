"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ServerError = exports.ForbiddenError = exports.BadInputError = exports.AuthenticationError = void 0;

var _apolloErrors = require("apollo-errors");

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

const AuthenticationError = (0, _apolloErrors.createError)('AuthenticationError', {
  message: 'The user is not authorized'
});
exports.AuthenticationError = AuthenticationError;
const BadInputError = (0, _apolloErrors.createError)('BadInputError', {
  message: 'The provided value is invalid'
});
exports.BadInputError = BadInputError;
const ForbiddenError = (0, _apolloErrors.createError)('ForbiddenError', {
  message: 'Access is denied'
});
exports.ForbiddenError = ForbiddenError;
const ServerError = (0, _apolloErrors.createError)('ServerError', {
  message: 'Server Error'
});
exports.ServerError = ServerError;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(AuthenticationError, "AuthenticationError", "E:\\Projects\\graphichat\\server\\src\\utils\\apolloErrors.js");
  reactHotLoader.register(BadInputError, "BadInputError", "E:\\Projects\\graphichat\\server\\src\\utils\\apolloErrors.js");
  reactHotLoader.register(ForbiddenError, "ForbiddenError", "E:\\Projects\\graphichat\\server\\src\\utils\\apolloErrors.js");
  reactHotLoader.register(ServerError, "ServerError", "E:\\Projects\\graphichat\\server\\src\\utils\\apolloErrors.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();