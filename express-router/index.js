let express = require("express"),
    { listItem, archiveItem, collectionItem, articleItem } = require("./list-item-sample"),
    db = require("./db-query");

let router = express.Router(),
    uuidV4 = require("uuid/v4"),
    utils = require("./utils"),
    packRes = utils.packRes,
    packInsert = utils.packInsert,
    packUpdate = utils.packUpdate,
    getTime = utils.getTime,
    calcuByteLength = utils.calcuByteLength;


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

//获取标签
router.get("/getTag", (req, res) => {
    
    let id = req.query.id,
        args = {
            table: "tag"
        };

    id && (args.condition = "tag_id='" + id + "'");

    db.getter(args, (err, result) => {        
        res.send(packRes({//打包res
            result
        }, 1));
    });
});

//添加标签
router.post("/addTag", (req, res) => {
    let tag_name = req.body.name,
        checkArgs = {
            table: "tag",
            condition: "tag_name='" + tag_name + "'"
        };
    
    db.getter(checkArgs, (err, result) => {
        if (result.length) {
            res.send(packRes({ 
                message: tag_name + "已存在，请勿重复添加"
            }, 0));
        } else {

            let result = {
                    tag_id: uuidV4(),
                    tag_name: tag_name,
                    created_at: getTime(),
                    modify_time: getTime()
                },
                args = packInsert(result);

            args.table = "tag";
            
            db.adder(args, (error, result) => {
                res.send(packRes({ 
                    message: result.affectedRows ? "添加成功" : "添加失败"
                }, 1));
            });
        }
    });
});

//修改标签
router.post("/modifyTag", (req, res) => {
    let reqBody = req.body,
        checkArgs = {
            table: "tag",
            condition: "tag_id='" + reqBody.id + "'"
        };
    
    db.getter(checkArgs, (error, result) => {
        let tag = result[0];

        if (tag.tag_name === reqBody.name) {
            res.send(packRes({ message: "名称重复" }, 0));
        } else {
            let data = { tag_name: reqBody.name };

            data.modify_time = getTime();

            let args = packUpdate(data);
            
            Object.assign(args, {
                table: "tag",
                condition: "tag_id='" + reqBody.id + "'"
            });

            db.updater(args, (error, result) => {

                res.send(packRes({ 
                    message: result.affectedRows ? "修改成功" : "修改失败"
                }, 1));                
            });
        }
    });
});

router.post("/postArticle", (req, res) => { 
    let reqBody = req.body,
        id = reqBody.id;

    if (id) {
        res.send(packRes({ message: "fail" }, 0));
    } else {
        let newId = uuidV4(),
            data = {
                id: newId,
                title: reqBody.title,
                type: "arti",
                tags: reqBody.tag,
                created_at: getTime(),
                modify_time: getTime(),
                content: reqBody.content,
                abstract: reqBody.abstract,
                size: calcuByteLength(reqBody.content)           
            },
            args = packInsert(data);

        args.table = "article";

        db.adder(args, (error, result) => {
            res.send(packRes({ 
                message: result.affectedRows ? "添加成功" : "添加失败", 
                id: result.affectedRows ? newId : "",
            }, result.affectedRows));
        });
    }
    
});

router.post("/login", (req, res) => {
    let reqBody = req.body,
        args = {
            table: "user",
            condition: `username='${reqBody.username}'`
        };

    db.getter(args, (error, result) => {
        let queryUser = result[0];

        if (!queryUser) {
            res.send(packRes({ message: "用户不存在" }, 0));
            return false;
        }
        
        if (reqBody.password !== queryUser.password) {
            res.send(packRes({ message: "密码不正确" }, 0));
            return false;
        }

        if (reqBody.password === queryUser.password) {
            let isLogin = {
                userId: queryUser.user_id,
                username: queryUser.username
            };
            
            res.locals.isLogin = isLogin;
            res.cookie("isLogin", res.locals.isLogin, {
                maxAge: 60000
            });

            res.send(packRes({ message: "登录成功，正在跳转" }, 1));
        }
    });
});


router.get("/checkStatus", (req, res) => {
    let isLogin = req.cookies.isLogin;

    if (isLogin) {
        res.send({ isLogin });
    }
});




module.exports = router;