"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.isAuth = void 0;

var _apolloErrors = require("../../utils/apolloErrors");

var _AuthProvider = _interopRequireDefault(require("../auth/AuthProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

const isAuth = () => next => async (parent, args, context, info) => {
  const {
    injector
  } = context;

  if (!injector.get(_AuthProvider.default).user) {
    throw new _apolloErrors.ForbiddenError();
  }

  return next(parent, args, context, info);
};

exports.isAuth = isAuth;
const _default = null;
var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(isAuth, "isAuth", "E:\\Projects\\graphichat\\server\\src\\modules\\middlewares\\index.js");
  reactHotLoader.register(_default, "default", "E:\\Projects\\graphichat\\server\\src\\modules\\middlewares\\index.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();