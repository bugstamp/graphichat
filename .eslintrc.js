module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "extends": [
    "airbnb",
    "plugin:jsx-control-statements/recommended"
  ],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "plugins": [
    "react",
    "jsx-control-statements"
  ],
  "rules": {
    "linebreak-style": ["error", "windows"],
    "react/jsx-no-undef": 0,
    "react/jsx-filename-extension": 0,
    "react/prefer-stateless-function": 0,
    "react/sort-comp": 0
  }
};
