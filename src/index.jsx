/*
 * @Author: DueTy.du 
 * @Date: 2018-08-13 22:51:10 *
*/
import "./index.less";
import React from "react";
import ReactDOM from "react-dom";
import RouterVew from "./router-view";
import "@/common/http";

import { Provider } from "react-redux";
import reducers from "./reducers";
import { createStore } from "redux";

const store = createStore(reducers);

const render = Component => {
    ReactDOM.render(
        (
            <Provider store={store}>
                <Component />
            </Provider>
        ),
        document.getElementById("app")
    );
};

console.log(module);

if (module.hot) {
    
    module.hot.accept(() => {
        console.log("hot render");
        render(RouterVew);
    });
}
