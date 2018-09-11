const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");
const whmUrl = "webpack-hot-middleware/client?noInfo=true&reload=true";

const entryJs = "./src/index.js";
const buildPath = "dist";
const publicPath = "/";

module.exports = {
    mode: "development",
    entry:  [
        whmUrl, entryJs
    ],
    output: {
        filename: "build.js",
        path: path.resolve(__dirname, buildPath),
        publicPath
    },
    devtool: "inline-source-map",
    devServer: {
        contentBase: path.resolve(__dirname, buildPath),
        publicPath,
        inline: true,
        hot: true,        
        overlay: true, // 将错误显示在html之上
    },
    module: {
        rules: [      
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader"
                }
            },{
                test:/\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader", 
                    use: "css-loader",
                    publicPath: "/" 
                })
            },{
                test:/\.less$/,
                use:["style-loader", "css-loader", "less-loader"]
            },{
                test:/\.(png|jpg|gif)$/,
                use:[{
                    loader: "file-loader",
                    options:{
                        name: "[name].[hash:8].[ext]",
                        limit: 50000,
                        outputPath: "assets/images",
                    }
                }]
            },{
                test: /\.(eot|svg|ttf|woff|woff2)\w*/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            outputPath: "assets/font",
                            publicPath: "/" 
                        }
                    }
                ]
            }
		]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Dlog",
            template: path.resolve(__dirname, "src/index.html")
        }),
        new ExtractTextPlugin("css/index.css"),
        new webpack.NamedModulesPlugin(),      
		new webpack.HotModuleReplacementPlugin()
    ]
};