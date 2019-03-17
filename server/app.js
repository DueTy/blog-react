
const http = require("http");
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const router = require("../express-router");
const favicon = require("serve-favicon");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

let app = express();

app.use(morgan("short")); // 日志组件
app.use(favicon(path.resolve(__dirname, "../favicon.ico"))); // 网站ico
app.use(bodyParser.json()); // 转换req,res的body
app.use(bodyParser.urlencoded({ extended: false })); // cookie
app.use(cookieParser("An"));

app.use("/", router);

var env = process.env.NODE_ENV;

if (env) {
    
    app.use(express.static(path.resolve(__dirname, "../dist")));

    app.all("*", function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        res.header("Access-Control-Allow-Methods", "*");
        res.header("Content-Type", "application/json;charset=utf-8");
        next();
    });
    
    if (require.main === module) {
        
        let server = http.createServer(app);
    
        server.listen(8080, () => {
            console.log("Server runs on %j", server.address());    
        });
    }
} else {
    app.use(express.static(path.resolve(__dirname, "../dist")));

    app.get("/", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../dist/index.html"));
    });

    if (require.main === module) {
        
        let server = http.createServer(app);

        server.listen(8000, "0.0.0.0", () => {
            console.log("Server runs on %j", server.address());    
        });
    }
}