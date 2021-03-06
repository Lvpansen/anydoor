module.exports = {
  "extends": ["eslint:recommended"],
  "parser": "babel-eslint",
  "rules": {
    "no-console":["warn",{
      "allow":["info","error"]
    }]
  },
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "script"
  },
  "globals": {
    "window": true
  },
  "env": {
    "node": true,
    "es6": true,
    "mocha": true
  }
}
