const path = require("path");
const webpack = require("webpack");
const baseConfig = require("./webpack.base");
const merge = require("webpack-merge");
const paths = require("./config.json").paths;

const HtmlWebpackPlugin = require("html-webpack-plugin"); // 生成html
const config = require("./config.json");

const devWebpackConfig = merge(baseConfig, {
    output: {
        publicPath: "/"
    },
    devtool: "eval-source-map", // 指定加source-map的方式
    devServer: {
        inline: true, // 打包后加入一个websocket客户端
        hot: true, // 热加载
        contentBase: path.join(__dirname, "..", paths.dist), // 静态文件根目录
        overlay: true,
        compress: false // 服务器返回浏览器的时候是否启动gzip压缩
    },
    watchOptions: {
        ignored: /node_modules/, // 忽略不用监听变更的目录
        aggregateTimeout: 500, // 防止重复保存频繁重新编译,500毫米内重复保存不打包
        poll: 1000 // 每秒询问的文件变更的次数
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // HMR
        new webpack.NamedModulesPlugin(), // HMR        
        ...config.entries.map(page => { // 多页面
            return new HtmlWebpackPlugin({
                template: path.resolve(__dirname, "..", page.path, page.index),
                filename: `${page.name}.html`,
                chunks: [page.name, "common"],
                hash: true, // 防止缓存
                minify: {
                    removeAttributeQuotes: true // 压缩 去掉引号
                }
            });
        })
    ]
});

module.exports = devWebpackConfig;