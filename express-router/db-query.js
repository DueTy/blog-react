const mysql = require("mysql");
const dbConfig = require("./db-config");
const connect = mysql.createConnection(dbConfig);

const tables = {
    article: " article ",
    tag: " tag ",
    user: " user ",
    archive: " archive "
};

function getter(args, callback) {  
    let filed  = args.filed ? args.filed : " * ",
        table = tables[args.table],
        condition = args.condition ? " where " + args.condition : "",
        sql = "select" + filed + "from" + table + condition;

    connect.query(sql, (error, result) => {
        if (error) {
            console.log("error:" + error.message);
        }
        callback(error, result);
    });
}

function adder(args, callback) {
    let sql = "insert into" + tables[args.table] + "value" + args.length;

    connect.query(sql, args.insert, (error, result) => {
        if (error) {
            console.log("error:" + error.message);
        }
        callback(error, result);
    });
}

function updater(args, callback) {
    let sql = "update " + tables[args.table] + " set " + args.opt + " where " + args.condition;

    connect.query(sql, (error, result) => {
        if (error) {
            console.log("error:" + error.message);
        }
        callback(error, result);
    });
}

module.exports = {
    getter, adder, updater
};