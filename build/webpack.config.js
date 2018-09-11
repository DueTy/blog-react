const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");

const bdConfig = require("./build-config");
const paths = bdConfig.paths;

module.exports = {
    mode: "development",
    entry:  [
        paths.whmUrl, paths.entryJs
    ],
    output: {
        filename: "build.js",
        path: paths.buildPath,
        publicPath: paths.publicPath
    },
    devtool: "inline-source-map",
    devServer: {
        contentBase: paths.buildPath,
        publicPath: paths.publicPath,
        inline: true,
        hot: true,        
        overlay: {
            warnings: true,
            errors:true
        } // 将错误显示在html之上
    },
    module: {
        rules: bdConfig.rules
    },
    plugins: [
        new HtmlWebpackPlugin(bdConfig.outputHtmlConfig),
        new ExtractTextPlugin("css/index.css"),
        new webpack.NamedModulesPlugin(),      
		new webpack.HotModuleReplacementPlugin()
    ]
};