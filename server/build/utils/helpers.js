"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fileToBuffer = exports.getUserDisplayName = exports.removeHeaderTokens = exports.setHeaderTokens = exports.getHeaderTokens = void 0;

var _upperFirst2 = _interopRequireDefault(require("lodash/upperFirst"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

const getHeaderTokens = req => {
  const token = req.headers['x-token'];
  const refreshToken = req.headers['x-refresh-token'];
  return {
    token,
    refreshToken
  };
};

exports.getHeaderTokens = getHeaderTokens;

const setHeaderTokens = (res, {
  token,
  refreshToken
}) => {
  // res.set('Access-Control-Expose-Headers', '*');
  res.set({
    'x-token': token,
    'x-refresh-token': refreshToken
  });
  return res;
};

exports.setHeaderTokens = setHeaderTokens;

const removeHeaderTokens = res => {
  res.set({
    'x-token': null,
    'x-refresh-token': null
  });
  return res;
};

exports.removeHeaderTokens = removeHeaderTokens;

const getUserDisplayName = ({
  firstName,
  lastName
}) => `${(0, _upperFirst2.default)(firstName)} ${(0, _upperFirst2.default)(lastName)}`;

exports.getUserDisplayName = getUserDisplayName;

const fileToBuffer = (filename, createReadStream) => new Promise((res, rej) => {
  const readStream = createReadStream ? createReadStream(filename) : _fs.default.createReadStream(filename);
  const chunks = [];
  readStream.on('data', chunk => {
    chunks.push(chunk);
  });
  readStream.on('error', err => {
    rej(err);
  });
  readStream.on('close', () => {
    res(Buffer.concat(chunks));
  });
});

exports.fileToBuffer = fileToBuffer;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(getHeaderTokens, "getHeaderTokens", "E:\\Projects\\graphichat\\server\\src\\utils\\helpers.js");
  reactHotLoader.register(setHeaderTokens, "setHeaderTokens", "E:\\Projects\\graphichat\\server\\src\\utils\\helpers.js");
  reactHotLoader.register(removeHeaderTokens, "removeHeaderTokens", "E:\\Projects\\graphichat\\server\\src\\utils\\helpers.js");
  reactHotLoader.register(getUserDisplayName, "getUserDisplayName", "E:\\Projects\\graphichat\\server\\src\\utils\\helpers.js");
  reactHotLoader.register(fileToBuffer, "fileToBuffer", "E:\\Projects\\graphichat\\server\\src\\utils\\helpers.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();