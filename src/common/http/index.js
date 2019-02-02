import axios from "axios";
import "./nprogress.css";
import NProgress from "nprogress";
import qs from "qs";

axios.defaults.baseURL = "/";

axios.interceptors.request.use(config => {
    if (config.method === "post") {
        config.data = qs.stringify(config.data);
    }
    NProgress.start();
    return config;
});

axios.interceptors.response.use(config => {
    NProgress.done();
    return config;
});