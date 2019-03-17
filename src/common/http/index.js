import axios from "axios";

import "./index.less";
import NProgress from "nprogress";

const defaultOption = {
    baseURL: process.env.NODE_ENV === "development" ? "api" : "/",
    // methods: "",
    headers: {
        "Content-Type": "application/json"
    }
};

// 错误信息集中处理
function errorMsg(error, requestMessager) {
    if (error.data) {
        requestMessager.fail && console.error( // 是否展示
            typeof requestMessager.fail === "string" ? 
                requestMessager.fail : error.data.message || error.data.msg || "Error" // 接收自定义字串信息
        );
    } else {
        const errorRes = JSON.parse(JSON.stringify(error)).response;
        console.error(`Network Went Wrong<${errorRes.statusText}--${errorRes.status}>`);
    }
}

const HTTP = (option = defaultOption) => {
    let { baseURL } = option;
    let requestMessager = {};

    // 当baseUrl不是一个带协议头的域名时，值作为二级域名前缀处理
    if(baseURL && !(/http(s)?:\/\/|^\/\//).test(baseURL)) {
        if(process.env.NODE_ENV === "production") {
            option.baseURL = "";
            // option.baseURL = "http://" + baseURL.replace(/\//, "") + `.${ENV_DOMAIN}`;
        }else {
            option.baseURL = "/" + baseURL;
        }
    }

    const instance = axios.create(option);

    instance.defaults.timeout = 5000;

    // 请求拦截器
    instance.interceptors.request.use(config => {
        requestMessager = Object.assign({// 请求判断（默认展示“错误”，隐藏“成功”）
            success: false,
            fail: true
        }, config.messager);

        NProgress.start();
        return config;
    }, error => {
        console.error("request error", error);
        return Promise.reject(error);
    });
    
    // 返回状态判断(添加响应拦截器)
    instance.interceptors.response.use(res => {
        NProgress.done();
        
        // 对响应数据错误的处理 
        
        if((!res.status && !res.data) || res.status !== 200) { // 网络状态非200
            errorMsg(res, requestMessager);
            return false;
        }
        
        requestMessager.success && console.log(
            typeof requestMessager.success === "string" ? requestMessager.success : "Success"
        );

        return res.data;
    }, error => { 
        errorMsg(error, requestMessager);        
        return Promise.reject(error);
    });

    return instance;
};


export const BASE_HTTP = HTTP();


export default HTTP;