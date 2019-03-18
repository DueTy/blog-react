/*
 * @Author: DueTy.du 
 * @Date: 2019-03-17 15:55:44 
 * @Last Modified by: DueTy.du
 * @Last Modified time: 2019-03-19 00:31:30
 */

import { BASE_HTTP as base } from "@/common/http";


const api = {
    getArticleList: function({ params = {} }) {
        return base.get("/getArticleList", { params });
    },
    getArticle: function({ params }) {
        return base.get("/getArticle", { params });
    },
    addArticle: function({ data }) {
        return base.post("/postArticle", data);
    },
    modifyArticle: function({ data }) {
        return base.post("/modifyArticle", data);
    },
    getTags: function() {
        return base.get("/getTag");
    },
    checkStatus: function() {
        return base.get("/checkStatus");
    }
};

export default api;