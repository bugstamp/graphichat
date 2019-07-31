"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OFFLINE = exports.ONLINE = exports.COMPLETED = exports.UNCOMPLETED = exports.EMAIL_UNCONFIRMED = void 0;

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

const EMAIL_UNCONFIRMED = 'EMAIL_UNCONFIRMED';
exports.EMAIL_UNCONFIRMED = EMAIL_UNCONFIRMED;
const UNCOMPLETED = 'UNCOMPLETED';
exports.UNCOMPLETED = UNCOMPLETED;
const COMPLETED = 'COMPLETED';
exports.COMPLETED = COMPLETED;
const ONLINE = 'ONLINE';
exports.ONLINE = ONLINE;
const OFFLINE = 'OFFLINE';
exports.OFFLINE = OFFLINE;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(EMAIL_UNCONFIRMED, "EMAIL_UNCONFIRMED", "E:\\Projects\\graphichat\\server\\src\\db\\models\\enums.js");
  reactHotLoader.register(UNCOMPLETED, "UNCOMPLETED", "E:\\Projects\\graphichat\\server\\src\\db\\models\\enums.js");
  reactHotLoader.register(COMPLETED, "COMPLETED", "E:\\Projects\\graphichat\\server\\src\\db\\models\\enums.js");
  reactHotLoader.register(ONLINE, "ONLINE", "E:\\Projects\\graphichat\\server\\src\\db\\models\\enums.js");
  reactHotLoader.register(OFFLINE, "OFFLINE", "E:\\Projects\\graphichat\\server\\src\\db\\models\\enums.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();