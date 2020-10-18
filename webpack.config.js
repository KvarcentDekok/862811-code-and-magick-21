const path = require("path");

module.exports = {
  entry: [
    "./js/util.js",
    "./js/debounce.js",
    "./js/colorize.js",
    "./js/stat.js",
    "./js/setup.js",
    "./js/backend.js",
    "./js/similar-wizards.js",
    "./js/dialog.js",
    "./js/game.js",
  ],
  devtool: false,
  output: {
    path: path.resolve(__dirname),
    filename: "bundle.js",
    iife: true
  }
};
