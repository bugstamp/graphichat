"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nodemailer = require("nodemailer");

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

const transporter = (0, _nodemailer.createTransport)({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_ADRRESS,
    pass: process.env.EMAIL_PASSWORD
  }
});

const sendEmailVerification = async (email, registerToken) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_ADRRESS,
      to: email,
      subject: 'Go to the link for confirm registration.',
      text: `${process.env.API_URL}/verification/${registerToken}`
    };
    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (err) {
    throw err;
  }
};

const _default = {
  sendEmailVerification
};
var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(transporter, "transporter", "E:\\Projects\\graphichat\\server\\src\\utils\\nodemailer.js");
  reactHotLoader.register(sendEmailVerification, "sendEmailVerification", "E:\\Projects\\graphichat\\server\\src\\utils\\nodemailer.js");
  reactHotLoader.register(_default, "default", "E:\\Projects\\graphichat\\server\\src\\utils\\nodemailer.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();