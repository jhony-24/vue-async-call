const path = require("path")

/**
 * @type import("webpack").Configuration
 */
module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "dist"),
    library: {
      type: "commonjs",
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  externals: {
    "vue-demi": "vue-demi",
  },
}
