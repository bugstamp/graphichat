"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("@graphql-modules/core");

var _apolloServerExpress = require("apollo-server-express");

var _common = _interopRequireDefault(require("../common"));

var _AuthProvider = _interopRequireDefault(require("./AuthProvider"));

var _authResolvers = _interopRequireDefault(require("./authResolvers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

const AuthModule = new _core.GraphQLModule({
  name: 'auth',
  imports: [_common.default],
  providers: [_AuthProvider.default],
  typeDefs: _apolloServerExpress.gql`
    type AuthPayload {
      token: String
      refreshToken: String
    }

    input SignInForm {
      username: String!
      password: String!
    }

    input SignUpForm {
      username: String!
      email: String!
      password: String!
    }

    input SignUpCompletionForm {
      firstName: String!
      lastName: String!
      gender: String
      birthday: String
    }

    input SocialProfile {
      id: ID!
      name: String!
    }

    input SocialUserProfile {
      email: String!
      firstName: String!
      lastName: String!
    }

    type AsyncValidationResult {
      field: String!
      valid: Boolean!
    }

    type Mutation {
      signIn(form: SignInForm!): AuthPayload
      signUp(form: SignUpForm!): Boolean
      signUpCompletion(form: SignUpCompletionForm): AuthPayload
      signUpAsyncValidation(field: String!, value: String!): AsyncValidationResult
      signInBySocial(social: SocialProfile!, profile: SocialUserProfile!): AuthPayload
      signUpBySocial(social: SocialProfile!, profile: SocialUserProfile!): AuthPayload
      signOut(userId: String): Boolean
    }
  `,
  resolvers: _authResolvers.default
});
const _default = AuthModule;
var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(AuthModule, "AuthModule", "E:\\Projects\\graphichat\\server\\src\\modules\\auth\\authModule.js");
  reactHotLoader.register(_default, "default", "E:\\Projects\\graphichat\\server\\src\\modules\\auth\\authModule.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();