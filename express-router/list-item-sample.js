let listItem = {
    "id": 42,
    "title": "这是文章标题",
    "summary": "这是文章摘要",
    "content": "react好好好，react棒棒棒",
    "readSize": 7,
    "commentSize": 0,
    "tags": "随笔,JavaScript",
    "created_at": "2018-08-04T14:51:21.000Z",
    "updated_at": "2018-08-05T13:53:22.000Z",
    "user_id": 1,
    "catalog_id": 7,
    "user": {
        "id": 1,
        "username": "admin",
        "authority": {
            "id": 1,
            "name": "ROLE_ADMIN"
        }
    },
    "catalog": {
        "id": 7,
        "name": "学习",
        "created_at": "2018-08-22T05:25:14.000Z",
        "updated_at": "2018-08-22T05:25:14.000Z",
        "user_id": 1
    }
};

let archiveItem = {    
    "id": 4,
    "title": "这是归档文章标题",
    "summary": "react好好好，react棒棒棒",
    "content": "这是文章内容",
    "readSize": 172,
    "commentSize": 2,
    "tags": "React,Node,MySQL",
    "created_at": "2018-02-05T01:44:58.000Z",
    "updated_at": "2018-09-05T14:54:00.000Z",
    "user_id": 1,
    "catalog_id": 1
};

let collectionItem = {
    "id": 5,
    "author": "Jartto",
    "date": "2018-07-08",
    "link": "http://jartto.wang/2018/07/08/git-commit/",
    "title": "你可能会忽略的 Git 提交规范",
    "created_at": "2018-07-10T09:25:54.000Z",
    "updated_at": "2018-07-10T09:25:54.000Z"
}

let articleItem = {
    "id": 40,
    "title": "一道阿里编程测验题",
    "content": "本质上是简单实现一个`Promise all`的方法，一开始没啥思路，然后想了下，开始动手，思考`Promise all`的执行方式。无非就是将多个`Promise`同步执行，执行完最后一个后返回执行的结果。然后一开始我用了循环去写，判断执行完多少个后`resolve`结果。虽然`console`出结果了，但是顺序不一样，这时候时间也到了，随便就提交了。事后想一想，用递归或许可以实现，试了下，结果还真是这样....（再次证明自己有多low了）\n``` JavaScript\n// 实现 mergePromise 函数，把传进去的数组顺序先后执行，并且把返回的数据先后放到数组（data）中。\n\nconst timeout = ms => new Promise((resolve, reject) => {\n  setTimeout(() => {\n    resolve();\n  }, ms);\n});\n\nconst ajax1 = () => timeout(2000).then(() => {\n  console.log('1');\n  return 1;\n});\n\nconst ajax2 = () => timeout(1000).then(() => {\n  console.log('2');\n  return 2;\n});\n\nconst ajax3 = () => timeout(2000).then(() => {\n  console.log('3');\n  return 3;\n});\n\nconst mergePromise = ajaxArray => {\n  // 在这里实现你的代码\n  let ret = [];\n  return new Promise((resolve, reject) => {\n    let i = 0;\n    ajax();\n\n    function ajax() {\n      Promise.resolve(ajaxArray[i]())\n        .then(res => {\n          i++;\n          ret.push(res);\n          i === ajaxArray.length ?\n            resolve(ret) :\n            ajax();\n        })\n        .catch(err => {\n          reject(err);\n        })\n    }\n  })\n};\nmergePromise([ajax1, ajax2, ajax3]).then(data => {\n  console.log('done');\n  console.log(data); // data 为 [1, 2, 3]\n});\n\n// 分别输出\n// 1\n// 2\n// 3\n// done\n// [1, 2, 3]\n```",
    "readSize": 147,
    "commentSize": 3,
    "tags": "JavaScript",
    "created_at": "2018-07-19T15:49:30.000Z",
    "updated_at": "2018-09-05T18:32:36.000Z",
    "user_id": 1,
    "catalog_id": 7,
    "user": {
        "id": 1,
        "username": "admin",
        "authority": {
            "id": 1,
            "name": "ROLE_ADMIN"
        }
    },
    "catalog": {
        "id": 7,
        "name": "学习",
        "created_at": "2018-04-22T05:25:14.000Z",
        "updated_at": "2018-04-22T05:25:14.000Z",
        "user": {
            "username": "admin"
        }
    }
};

module.exports = {
    listItem,
    archiveItem,
    collectionItem,
    articleItem
};