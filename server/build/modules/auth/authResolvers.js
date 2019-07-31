"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AuthProvider = _interopRequireDefault(require("./AuthProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

const _default = {
  Mutation: {
    signIn: (parent, {
      form
    }, {
      injector
    }) => injector.get(_AuthProvider.default).signIn(form),
    signUp: (parent, {
      form
    }, {
      injector
    }) => injector.get(_AuthProvider.default).signUp(form),
    signUpCompletion: (parent, {
      form
    }, {
      injector
    }) => injector.get(_AuthProvider.default).signUpCompletion(form),
    signUpAsyncValidation: (parent, {
      field,
      value
    }, {
      injector
    }) => injector.get(_AuthProvider.default).signUpAsyncValidation(field, value),
    signInBySocial: (parent, {
      social,
      profile
    }, {
      injector
    }) => injector.get(_AuthProvider.default).signInBySocial(social, profile),
    signUpBySocial: (parent, {
      social,
      profile
    }, {
      injector
    }) => injector.get(_AuthProvider.default).signUpBySocial(social, profile),
    signOut: (parent, {
      userId
    }, {
      injector
    }) => injector.get(_AuthProvider.default).signOut(userId)
  }
};
var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "E:\\Projects\\graphichat\\server\\src\\modules\\auth\\authResolvers.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();