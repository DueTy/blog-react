const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

let paths = {
        entryJs: path.resolve(__dirname, "../src/index.js"),
        buildPath: path.resolve(__dirname, "../dist"),
        distStatic: "../dist",
        publicPath: "/",
        whmUrl: "webpack-hot-middleware/client?noInfo=true&reload=true",
        templateSrc: "../src/index.html"
    },
    outputHtmlConfig = {
        template: path.resolve(__dirname, "../src/index.html")
    },
    rules = [      
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        },{
            test:/\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader", 
                use: "css-loader",
                publicPath: paths.publicPath
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
                        publicPath: paths.publicPath
                    }
                }
            ]
        }
    ];

module.exports = {
    paths, outputHtmlConfig, rules
};