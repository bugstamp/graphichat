"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("@graphql-modules/core");

var _apolloServerExpress = require("apollo-server-express");

var _scalarsResolvers = _interopRequireDefault(require("./scalarsResolvers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

const ScalarsModule = new _core.GraphQLModule({
  name: 'scalars',
  typeDefs: _apolloServerExpress.gql`
    scalar DateTime
    scalar EmailAddress
    scalar NegativeFloat
    scalar NegativeInt
    scalar NonNegativeFloat
    scalar NonNegativeInt
    scalar NonPositiveFloat
    scalar NonPositiveInt
    scalar PhoneNumber
    scalar PositiveFloat
    scalar PositiveInt
    scalar PostalCode
    scalar RegularExpression
    scalar UnsignedFloat
    scalar UnsignedInt
    scalar URL
    scalar Upload

    type File {
      filename: String!
      mimetype: String!
      encoding: String!
    }
  `,
  resolvers: _scalarsResolvers.default
});
const _default = ScalarsModule;
var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(ScalarsModule, "ScalarsModule", "E:\\Projects\\graphichat\\server\\src\\modules\\scalars\\scalarsModule.js");
  reactHotLoader.register(_default, "default", "E:\\Projects\\graphichat\\server\\src\\modules\\scalars\\scalarsModule.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();