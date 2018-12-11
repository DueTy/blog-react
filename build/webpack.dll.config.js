const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin"); // 清空打包目录的插件
const config = require("./config.json");
const paths = config.paths;
const vendor = config["dll-sources"];

module.exports = {
    context: path.resolve(__dirname, "../"),
    entry: {
        vendor
    },
    output: {
        path: path.join(__dirname, "..", paths.dll),
        filename: "[name].dll.js",
        library: "_dll_[name]" // 全局变量名，其他模块会从此变量上获取里面模块
    },
    // manifest是描述文件
    plugins: [
        new webpack.DllPlugin({
            name: "_dll_[name]",
            path: path.join(__dirname, "..", paths.dll, "/manifest.json"),
            context: path.resolve(__dirname, "../")
        })
    ]
};