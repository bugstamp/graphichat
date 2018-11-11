"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _methodOverride = _interopRequireDefault(require("method-override"));

var _cors = _interopRequireDefault(require("cors"));

const PUBLIC_PATH = _path.default.resolve(__dirname, '../public');

const HTML_PATH = _path.default.resolve(PUBLIC_PATH, './index.html');

const PORT = process.env.PORT || 3000;
const app = (0, _express.default)();
app.set('port', PORT);
app.use(_express.default.static(PUBLIC_PATH));
app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: true
}));
app.use((0, _cookieParser.default)());
app.use((0, _methodOverride.default)());
app.use((0, _cors.default)({
  credentials: true
}));
app.get('*', (req, res) => {
  res.sendFile(HTML_PATH);
});
app.listen(app.get('port'), () => {
  console.log(`Server is listening: http://localhost:${PORT}`);
});