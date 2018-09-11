
const http = require("http");
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const router = require("./express-router");
    
const webpack = require("webpack");
const webpackMW = require("webpack-hot-middleware");
const webpackDW = require("webpack-dev-middleware");

let app = express();

app.use(morgan("short"));
app.use("/", router);

var env = process.env.NODE_ENV;

if (env) {
    
    let webpackConfig = require("./webpack.config"),
        compiler = webpack(webpackConfig),
        heartbeatS = 10;
    
    app.use(webpackDW(compiler, {        
        logLevel: "warn", 
        publicPath: webpackConfig.output.publicPath
    }));
    
    app.use(webpackMW(compiler, {
        log: console.log,
        path: "/__webpack_hmr",
        heartbeat: heartbeatS * 1000
    }));
    
    if (require.main === module) {
        
        let server = http.createServer(app);
    
        server.listen(8080, () => {
            console.log("Server runs on %j", server.address());    
        });
    }
} else {
    app.use(express.static(path.resolve(__dirname, "dist")));

    app.get("/", (req, res) =>{
        res.sendFile(path.resolve(__dirname, "dist/index.html"));
    });


    if (require.main === module) {
        
        let server = http.createServer(app);

        server.listen(3389, "0.0.0.0", () => {
            console.log("Server runs on %j", server.address());    
        });
    }
}