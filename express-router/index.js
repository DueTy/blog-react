let express = require("express");
let path = require("path");
let { listItem, archiveItem, collectionItem, articleItem } = require("./list-item-sample");
let router = express.Router();


/* GET users listing. */
router.get("/getArticleList", (req, res, next) => {
    let items = [];
    delete listItem.content;
    for (let index = 0; index < 3; index++) {
        items.push(listItem);
    }

    res.send(items);
});

router.get("/getArchiveList", (req, res, next) => {
    let items = [];
    delete archiveItem.content;

    for (let index = 0; index < 3; index++) {
        items.push(archiveItem);
    }

    res.send(items);
});

router.get("/getCollectionList", (req, res, next) => {
    let items = [];

    for (let index = 0; index < 3; index++) {
        items.push(collectionItem);
    }

    res.send(items);
});

router.get("/getArticle", (req, res, next) => { 
    res.send(articleItem);
});

module.exports = router;