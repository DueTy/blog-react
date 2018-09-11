import Index from "../../containers/index";
import ArchivePage from "../../containers/archive";
import CollectionPage from "../../containers/collection";
import Article from "../../containers/article";

export const routes = [
    {
        key: "首页",
        path: "/app/index",
        component: Index
    },{
        key: "归档",
        path: "/app/archive",
        component: ArchivePage
    },{
        key: "收藏",
        path: "/app/collection",
        component: CollectionPage
    },{
        key: "文章",
        path: "/app/article/:id",
        component: Article
    }
];