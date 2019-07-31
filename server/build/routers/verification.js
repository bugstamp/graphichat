"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _db = _interopRequireDefault(require("../db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

const router = _express.default.Router();

router.get('/api/verification/:regToken', async (reg, res) => {
  const {
    regToken
  } = reg.params;

  try {
    const {
      token
    } = await _db.default.User.verifyEmail(regToken);
    const redirectPath = `reg?token=${token}`;
    const redirectUrl = process.env.NODE_ENV !== 'production' ? `${process.env.DEV_URL}/${redirectPath}` : redirectPath;
    res.redirect(redirectUrl);
  } catch (err) {
    res.status(404).send('Verification token was expired');
  }
});
const _default = router;
var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(router, "router", "E:\\Projects\\graphichat\\server\\src\\routers\\verification.js");
  reactHotLoader.register(_default, "default", "E:\\Projects\\graphichat\\server\\src\\routers\\verification.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();