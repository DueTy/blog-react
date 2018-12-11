const path = require("path");
const webpack = require("webpack");
const baseConfig = require("./webpack.base");
const merge = require("webpack-merge");
const paths = require("./config.json").paths;

const devWebpackConfig = merge(baseConfig, {
    output: {
        publicPath: "/"
    },
    devtool: "eval-source-map", // 指定加source-map的方式
    devServer: {
        inline: true,//打包后加入一个websocket客户端
        hot: true,//热加载
        contentBase: path.join(__dirname, "..", paths.dist), //静态文件根目录
        overlay: true,
        compress: false // 服务器返回浏览器的时候是否启动gzip压缩
    },
    watchOptions: {
        ignored: /node_modules/, //忽略不用监听变更的目录
        aggregateTimeout: 500, //防止重复保存频繁重新编译,500毫米内重复保存不打包
        poll: 1000 //每秒询问的文件变更的次数
    },
    plugins: [
        // new webpack.DllReferencePlugin({
        //     manifest: path.resolve(__dirname, "..", paths.dll, "manifest.json")
        // }),
        new webpack.HotModuleReplacementPlugin(), //HMR
        new webpack.NamedModulesPlugin() // HMR
    ]
});

module.exports = devWebpackConfig;