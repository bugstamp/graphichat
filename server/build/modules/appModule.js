"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("@graphql-modules/core");

var _scalars = _interopRequireDefault(require("./scalars"));

var _common = _interopRequireDefault(require("./common"));

var _auth = _interopRequireDefault(require("./auth"));

var _user = _interopRequireDefault(require("./user"));

var _chat = _interopRequireDefault(require("./chat"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

const AppModule = new _core.GraphQLModule({
  name: 'app',
  imports: [_scalars.default, _common.default, _auth.default, _user.default, _chat.default]
});
const _default = AppModule;
var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(AppModule, "AppModule", "E:\\Projects\\graphichat\\server\\src\\modules\\appModule.js");
  reactHotLoader.register(_default, "default", "E:\\Projects\\graphichat\\server\\src\\modules\\appModule.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();