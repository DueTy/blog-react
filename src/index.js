/*
 * @Author: DueTy.du 
 * @Date: 2018-08-13 22:51:10 *
*/
import "./index.less";
import React from "react";
import ReactDOM from "react-dom";
import RouterVew from "./router-view";
import "./common/http";

ReactDOM.render(
    <RouterVew />,
    document.getElementById("app")
)


if (module.hot) {
    module.hot.accept();
}