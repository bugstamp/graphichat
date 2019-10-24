 module.exports = {
  "env": {
    "es6": true,
    "node": true,
    "mongo": true,
  },
  "extends": [
    "airbnb-base/legacy",
  ],
  "parser": "babel-eslint",
  "rules": {
    "no-useless-catch": 0,
    "linebreak-style": ["error", "windows"],
    "comma-dangle": ["error", {
      "objects": "always-multiline",
    }],
  },
};
