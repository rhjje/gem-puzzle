module.exports = {
  extends: ['eslint:recommended', 'airbnb-base'],
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'linebreak-style': [0],
    indent: [0],
    'operator-linebreak': [0],
  },
};
