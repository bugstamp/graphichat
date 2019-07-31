"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _db = _interopRequireDefault(require("../db"));

var _helpers = require("../utils/helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

const _default = async (req, res, next) => {
  const tokens = (0, _helpers.getHeaderTokens)(req);
  const {
    token,
    refreshToken
  } = tokens;
  req.user = null;

  if (token) {
    try {
      const {
        user,
        newTokens
      } = await _db.default.User.verifyTokens(token, refreshToken);

      if (newTokens) {
        res = (0, _helpers.setHeaderTokens)(res, newTokens);
      }

      req.user = user;
    } catch (e) {
      res.status(401);
    }
  }

  next();
};

var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "E:\\Projects\\graphichat\\server\\src\\middlewares\\tokenVerification.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();