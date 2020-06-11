 module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true,
    "jest": true
  },
  "extends": [
    "airbnb",
    "plugin:jsx-control-statements/recommended",
  ],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "plugins": [
    "react",
    "react-hooks",
    "jsx-control-statements"
  ],
  "rules": {
    "import/no-unresolved": [2, { ignore: ['\config', '\appHistory'] }],
    "import/no-named-as-default": 0,
    "linebreak-style": ["error", "windows"],
    "react/jsx-no-undef": 0,
    "react/jsx-filename-extension": 0,
    "react/prefer-stateless-function": 0,
    "react/sort-comp": 0,
    "no-underscore-dangle": ["error", { allowAfterThis: true }],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
};
