
const sillyDt = require("silly-datetime");

function packRes(result, type) {
    let resMsg = type ? { msg: "success", code: 1 } : { msg: "failed", code: 0 };
    return Object.assign(result, resMsg);
}

function packInsert(data) {
    let length = [],
        insert = [];
    Object.keys(data).forEach((field) => {
        length.push("?");
        insert.push(data[field]);
    });

    length = "(" + length.join(",") + ")";

    return {
        length, insert
    };
}

function packUpdate(data) {
    let opt = [];

    Object.keys(data).forEach((field) => {
        opt.push(field + "='" + data[field] + "'");
    });

    opt = " " + opt.join(",") + " ";

    return { opt };
}

function calcuByteLength(text) {
    var bf = new Buffer(text);
    var byte = bf.length,
        byteStr = "";
    if (byte > 1048576) {
        byteStr = (byte / 1048576).toFixed(0) + "MB";
    } else if (byte > 1024) {
        byteStr = (byte / 1024).toFixed(1) + "KB";
    } else {
        byteStr = byte + "B";
    }
    return byteStr;
}

function getTime() {
    return sillyDt.format(new Date(), "YYYY-MM-DD hh:mm:ss");
}

function getDate(dateTime) {
    return sillyDt.format(dateTime, "YYYY-MM-DD");
}


module.exports = {
    packRes, packInsert, packUpdate, getTime, getDate, calcuByteLength
};