"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MESSAGE_ADDED = exports.CHAT_CREATED = exports.USER_UPDATED = exports.USER_ACTIVITY_UPDATED = void 0;

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

const USER_ACTIVITY_UPDATED = 'USER_ACTIVITY_UPDATED';
exports.USER_ACTIVITY_UPDATED = USER_ACTIVITY_UPDATED;
const USER_UPDATED = 'USER_UPDATED';
exports.USER_UPDATED = USER_UPDATED;
const CHAT_CREATED = 'CHAT_CREATED';
exports.CHAT_CREATED = CHAT_CREATED;
const MESSAGE_ADDED = 'MESSAGE_ADDED';
exports.MESSAGE_ADDED = MESSAGE_ADDED;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(USER_ACTIVITY_UPDATED, "USER_ACTIVITY_UPDATED", "E:\\Projects\\graphichat\\server\\src\\modules\\subscriptions.js");
  reactHotLoader.register(USER_UPDATED, "USER_UPDATED", "E:\\Projects\\graphichat\\server\\src\\modules\\subscriptions.js");
  reactHotLoader.register(CHAT_CREATED, "CHAT_CREATED", "E:\\Projects\\graphichat\\server\\src\\modules\\subscriptions.js");
  reactHotLoader.register(MESSAGE_ADDED, "MESSAGE_ADDED", "E:\\Projects\\graphichat\\server\\src\\modules\\subscriptions.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();