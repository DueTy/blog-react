const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const bdConfig = require("./build-config");
const paths = bdConfig.paths;

module.exports = {
    mode: "production",
    entry: {
        app: paths.entryJs
    },
    output: {
        path: paths.buildPath,        
        filename: "app.js",
        chunkFilename: "[name].[chunkhash:8].chunk.js",
    },
    module: {
        rules: bdConfig.rules
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor:{ //node_modules内的依赖库
                    chunks:"all",
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    minChunks: 1, 
                    maxInitialRequests: 5,
                    minSize: 0,
                    priority:100
                },
                app: {// ‘src/js’ 下的js文件
                    chunks: "all",
                    test:/[\\/]src[\\/]js[\\/]/,
                    name: "app",
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 0,
                    priority:1
                }
            }
        },
        runtimeChunk: {
            name: "manifest"
        }
    },
    plugins: [
        new CleanWebpackPlugin("dist", {
            root: __dirname
        }),
        new HtmlWebpackPlugin(bdConfig.outputHtmlConfig),
        new ExtractTextPlugin({            
            filename: "index.css",
            ignoreOrder: true
        }),
        new webpack.DefinePlugin({
            "process.env":{
                NODE_ENV:JSON.stringify("production")
            }
        }),
        new BundleAnalyzerPlugin()
    ]
};