module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    "jest/globals": true,
  },
  extends: ["standard", "plugin:json/recommended", "prittier"],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {},
};
