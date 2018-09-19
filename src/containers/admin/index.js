import React from "react";
import { Tabs } from "antd";
const TabPane = Tabs.TabPane;

import TagEdit from "./tag-edit";
import ArticleEdit from "./article-edit";
import "./index.less";


class Admin extends React.Component{    
    constructor(props){
        super(props);

        this.state = {
            
        }

    }
    render(){
        return (
            <div className="admin">
                <Tabs tabPosition="left" type="card">
                    <TabPane tab="文章编辑" key="1">
                        <ArticleEdit />
                    </TabPane>
                    <TabPane tab="属性" key="2">
                        <TagEdit/>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
};

export default Admin;