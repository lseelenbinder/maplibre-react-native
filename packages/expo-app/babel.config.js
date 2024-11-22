/* eslint-env node */
const path = require("path");
const { getConfig } = require("react-native-builder-bob/babel-config");

const pkg = require("../../package.json");

const root = path.resolve(__dirname, "..", "..");

module.exports = getConfig(
  {
    presets: ["babel-preset-expo"],
  },
  { root, pkg },
);
