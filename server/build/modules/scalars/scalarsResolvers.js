"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlScalars = require("@okgrow/graphql-scalars");

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

const _default = {
  DateTime: _graphqlScalars.DateTime,
  NonPositiveInt: _graphqlScalars.NonPositiveInt,
  PositiveInt: _graphqlScalars.PositiveInt,
  NonNegativeInt: _graphqlScalars.NonNegativeInt,
  NegativeInt: _graphqlScalars.NegativeInt,
  NonPositiveFloat: _graphqlScalars.NonPositiveFloat,
  PositiveFloat: _graphqlScalars.PositiveFloat,
  NonNegativeFloat: _graphqlScalars.NonNegativeFloat,
  NegativeFloat: _graphqlScalars.NegativeFloat,
  EmailAddress: _graphqlScalars.EmailAddress,
  URL: _graphqlScalars.URL,
  PhoneNumber: _graphqlScalars.PhoneNumber,
  PostalCode: _graphqlScalars.PostalCode
};
var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "E:\\Projects\\graphichat\\server\\src\\modules\\scalars\\scalarsResolvers.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();