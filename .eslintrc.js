module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    indent: ["error", "spaces"],
    "linebreak-style": ["error", "unix"],
    quotes: ["warning", "double"],
    semi: ["warning", "always"],
    "no-var-requires": "off",
    "ban-ts-comment": "off",
  },
};
