import Index from "@/containers/index";
import ArchivePage from "@/containers/archive";
import CollectionPage from "@/containers/collection";
import Article from "@/containers/article";
import About from "@/containers/about";
import Admin from "@/containers/admin";

export const routes = [
    {
        key: "首页",
        path: "/app/index",
        component: Index
    },
    {
        key: "归档",
        path: "/app/archive",
        component: ArchivePage
    },
    {
        key: "收藏",
        path: "/app/collection",
        component: CollectionPage
    },
    {
        key: "文章",
        path: "/app/article/:id",
        component: Article
    },
    {
        key: "关于",
        path: "/app/about",
        component: About
    },
    {
        key: "后台管理",
        path: "/app/admin",
        component: Admin
    }
];