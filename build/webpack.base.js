"use strict"
const path = require("path");
const chalk = require("chalk");

const ProgressBarPlugin = require("progress-bar-webpack-plugin");

const HappyPack = require("happypack");
const os = require("os");
const webpack = require("webpack");
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

const HtmlWebpackPlugin = require("html-webpack-plugin"); // 生成html
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 生成css
const config = require("./config.json");

function resolve(dir) {
    return path.join(__dirname, "..", dir);
}

function assetsPath(_path_) {
    let assetsSubDirectory;
    if (process.env.NODE_ENV === "production") {
        assetsSubDirectory = "static"; //当前为static
    } else {
        assetsSubDirectory = "static";
    }
    return path.posix.join(assetsSubDirectory, _path_);
}

function genEntries(pages){
    let entry = {};

    pages.forEach((page) => {
        entry[page.name] = path.resolve("./", page.path);
    });
    
    return entry;
}

module.exports = {
    context: path.resolve(__dirname, "../"),
    entry: genEntries(config.entries), // 使用生成的entry
    output: {
        path: resolve("dist"),
        filename: "[name].[hash:8].js"
    },
    resolve: {
        extensions: [".js", ".css", ".json"],
        alias: {} //配置别名可以加快webpack查找模块的速度
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["css-hot-loader", MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"]
            },
            {
                test: /\.less$/,
                use: ["css-hot-loader", MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "less-loader"],
                include: [resolve("src")],
                exclude: /node_modules/
            },
            {
                test: /\.jsx?$/,
                loader: "happypack/loader?id=happy-babel-js",
                include: [resolve("src")],
                exclude: /node_modules/,
            },
            { 
                test: /\.(png|jpg|jpeg|gif|svg)/,
                use: {
                    loader: "url-loader",
                    options: {
                        name: assetsPath("images/[name].[hash:7].[ext]"), // 图片输出的路径
                        limit: 1 * 1024
                    }
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    name: assetsPath("media/[name].[hash:7].[ext]")
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    name: assetsPath("fonts/[name].[hash:7].[ext]")
                }
            }
        ]
    },
    optimization: { //webpack4的最新优化配置项，用于提取公共代码
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: "initial",
                    name: "common",
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 0,
                    reuseExistingChunk: true
                }
            }
        }
    },
    plugins: [
        new HappyPack({
            id: "happy-babel-js",
            loaders: ["babel-loader?cacheDirectory=true"],
            threadPool: happyThreadPool
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new ProgressBarPlugin({
            format: "  build [:bar] " + chalk.green.bold(":percent") + " (:elapsed seconds)"
        }),
        new webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname, "..", config.paths.dll, "manifest.json")
        }),
        ...config.entries.map((page) => { // 多页面
            return new HtmlWebpackPlugin({
                template: path.resolve(__dirname, "..", page.path, page.index),
                filename: `${page.name}.html`,
                chunks: [page.name, "common"],
                vendor: "./vendor.dll.js", //与dll配置文件中output.fileName对齐
                hash: true,//防止缓存
                minify: {
                    removeAttributeQuotes: true//压缩 去掉引号
                }
            });
        })
    ]
};