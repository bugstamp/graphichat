"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _di = require("@graphql-modules/di");

var _db = _interopRequireWildcard(require("../../db"));

var _dec, _class, _class2, _temp;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

let DbProvider = (_dec = (0, _di.Injectable)({
  scope: _di.ProviderScope.Session
}), _dec(_class = (_temp = _class2 = class DbProvider {
  // eslint-disable-next-line
  async onInit() {
    try {
      await (0, _db.connectToDb)();
      console.log('Connected to db');
    } catch (e) {
      console.log('Couldn\'t connected to db', e);
    }
  }

  // @ts-ignore
  __reactstandin__regenerateByEval(key, code) {
    // @ts-ignore
    this[key] = eval(code);
  }

}, _class2.db = _db.default, _temp)) || _class);
const _default = DbProvider;
var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(DbProvider, "DbProvider", "E:\\Projects\\graphichat\\server\\src\\modules\\common\\DbProvider.js");
  reactHotLoader.register(_default, "default", "E:\\Projects\\graphichat\\server\\src\\modules\\common\\DbProvider.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();