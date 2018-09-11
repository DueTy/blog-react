import axios from "axios";
import "../../../node_modules/nprogress/nprogress.css";
import NProgress from "nprogress";
import qs from "qs";

axios.defaults.baseURL = "/";

axios.interceptors.request.use(function (config) {
    if (config.method === "post") {
        config.data = qs.stringify(config.data);
    }
    NProgress.start();
    return config;
});

axios.interceptors.response.use(function (config) {
    NProgress.done();
    return config;
});