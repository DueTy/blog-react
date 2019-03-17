/*
 * @Author: DueTy.du 
 * @Date: 2019-03-17 15:55:44 
 * @Last Modified by: DueTy.du
 * @Last Modified time: 2019-03-17 16:51:20
 */

import { BASE_HTTP as base } from "@/common/http";


const api = {
    getArticleList: function({ params }) {
        return base.get("/getArticleList", params);
    },
    getArticle: function({ params }) {
        return base.get("/getArticle", { params });
    },
    checkStatus: function() {
        return base.get("/checkStatus");
    }
};

export default api;