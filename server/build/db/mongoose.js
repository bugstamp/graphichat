"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.connectToDb = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

_mongoose.default.Promise = Promise;
const {
  ObjectId
} = _mongoose.default.Types; // eslint-disable-next-line

ObjectId.prototype.valueOf = function () {
  return this.toString();
};

const uri = process.env.MONGOLAB_URI;
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
};

const connectToDb = async () => {
  try {
    return await _mongoose.default.connect(uri, options);
  } catch (e) {
    throw e;
  }
};

exports.connectToDb = connectToDb;
const _default = _mongoose.default;
var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(ObjectId, "ObjectId", "E:\\Projects\\graphichat\\server\\src\\db\\mongoose.js");
  reactHotLoader.register(uri, "uri", "E:\\Projects\\graphichat\\server\\src\\db\\mongoose.js");
  reactHotLoader.register(options, "options", "E:\\Projects\\graphichat\\server\\src\\db\\mongoose.js");
  reactHotLoader.register(connectToDb, "connectToDb", "E:\\Projects\\graphichat\\server\\src\\db\\mongoose.js");
  reactHotLoader.register(_default, "default", "E:\\Projects\\graphichat\\server\\src\\db\\mongoose.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();