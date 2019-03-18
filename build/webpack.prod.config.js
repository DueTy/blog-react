"use strict"

const path = require("path");

const CopyWebpackPlugin = require("copy-webpack-plugin"); // 复制静态资源的插件
const CleanWebpackPlugin = require("clean-webpack-plugin"); // 清空打包目录的插件
const baseConfig = require("./webpack.base");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin; //打包分析
const merge = require("webpack-merge");

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 生成html
const WebpackParallelUglifyPlugin = require("webpack-parallel-uglify-plugin");
const config = require("./config.json");

module.exports = merge(baseConfig, {
    output: {
        publicPath: "./" // 这里要放的是静态资源CDN的地址(一般只在生产环境下配置)

    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: path.join(__dirname, "..", "static"),
                to: path.join(__dirname,  "..", "dist", "static"),
                ignore: [".*"]
            }
        ]),
        new CleanWebpackPlugin(["dist"], {
            root: path.join(__dirname, ".."),
            exclude: ["manifest.json", "vendor.dll.js", "static"],
            verbose: true,
            dry: false
        }),
        new WebpackParallelUglifyPlugin({
            uglifyJS: {
                output: {
                    beautify: false, // 不需要格式化
                    comments: false // 不保留注释
                },
                compress: {
                    warnings: false, // 在UglifyJs删除没有用到的代码时不输出警告
                    drop_console: true, // 删除所有的 `console` 语句，可以兼容ie浏览器
                    collapse_vars: true, // 内嵌定义了但是只用到一次的变量
                    reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
                }
            }
        }),
        new webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname, "..", config.paths.dll, "manifest.json")
        }),
        ...config.entries.map(page => { // 多页面
            return new HtmlWebpackPlugin({
                template: path.resolve(__dirname, "..", page.path, page.index),
                filename: `${page.name}.html`,
                chunks: [page.name, "common"],
                vendor: "./vendor.dll.js", // 与dll配置文件中output.fileName对齐
                hash: true, // 防止缓存
                minify: {
                    removeAttributeQuotes: true // 压缩 去掉引号
                }
            });
        }),
        new BundleAnalyzerPlugin()
    ]
});
