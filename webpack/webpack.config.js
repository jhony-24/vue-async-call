const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const webpack = require("webpack");

/**
 * @returns import("webpack").Configuration
 */
module.exports = (_options,config) => {
  const isProduction = config.mode === "production";

  const plugins = () => {
    const pluginsList = [
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        template: "public/index.html",
        inject: true,
      })
    ];
    if(isProduction) {
      pluginsList.push(...[
        new webpack.HotModuleReplacementPlugin(),
      ])
    }
  }

  return {
    entry: "./src/main.ts",
    output: {
      filename: "main.js",
      path: path.join(__dirname, "dist"),
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: "vue-loader",
        },
        {
          test: /\.ts$/,
          loader: "ts-loader",
          options: { appendTsSuffixTo: [/\.vue$/] },
        },
      ],
    },
    devtool : isProduction ? "none" : "eval-source-map",
    resolve: {
      extensions: [".ts", ".js"],
    },
    plugins: plugins(),
  };
};
