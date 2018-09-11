const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
    mode: "production",
    entry: {
        app: path.resolve(__dirname, "./src/index.js")
    },
    output: {
        path: path.resolve(__dirname, "dist"),        
        filename: "app.js",
        chunkFilename: "[name].[chunkhash:8].chunk.js",
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
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor:{//node_modules内的依赖库
                    chunks:"all",
                    test: /[\\/]node_modules[\\/]/,
                    name:"vendor",
                    minChunks: 1, 
                    maxInitialRequests: 5,
                    minSize: 0,
                    priority:100
                },
                app: {// ‘src/js’ 下的js文件
                    chunks:"all",
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
        new CleanWebpackPlugin("dist"),
        new HtmlWebpackPlugin({
            title: "Dlog",
            template: path.resolve(__dirname, "src/index.html") 
        }),
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