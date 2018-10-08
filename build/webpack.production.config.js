const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const OptimizeCss = require("optimize-css-assets-webpack-plugin"); //压缩css
const UglifyJsPlugin = require("uglifyjs-webpack-plugin"); //压缩js

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
        chunkFilename: "[name].chunk.js",
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
                    test: /[\\/]src[\\/]js[\\/]/,
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
        },
        minimizer: [
            new OptimizeCss(),
            new UglifyJsPlugin()
        ]
    },
    plugins: [      
        new webpack.DefinePlugin({
            "process.env":{
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new CleanWebpackPlugin("dist", {
            root: path.resolve(__dirname, "../")
        }),
        new HtmlWebpackPlugin(bdConfig.outputHtmlConfig),
        new ExtractTextPlugin({            
            filename: "index.css",
            ignoreOrder: true
        }), 
        new BundleAnalyzerPlugin(),
        new OptimizeCss({
            assetNameRegExp: /\.style\.css$/g,
            cssProcessor: require("cssnano"),
            cssProcessorOptions: { 
                discardComments: { 
                    removeAll: true 
                } 
            },
            canPrint: true
        }),
        new UglifyJsPlugin({
            exclude: /\.min\.js$/, // 过滤掉以".min.js"结尾的文件
            cache: true,
            parallel: true, // 开启并行压缩
            sourceMap: false,
            extractComments: false, // 移除注释
            uglifyOptions: {
                compress: {
                    unused: true,
                    warnings: false,
                    drop_debugger: true
                },
                output: {
                    comments: false
                }
            }
        }),
    ]
};