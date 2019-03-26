module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: 'standard',
  rules: {
    'comma-dangle': 0,
    "semi": [2, "always"]
  }
}
