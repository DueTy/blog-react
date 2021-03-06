import React from "react";
import axios from "axios";
import {  Row, Col, List, Tag } from "antd";

import "./index.less";
import { colors, timerTrans } from "../../utils";

class CollectionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            list: [],
            year: 2018
        };

        this.getListData = this.getListData.bind(this);
    }
    getListData(page) {
        axios.get("/getCollectionList", {
            params: {
                page: page 
            }
        }).then(res => {            
            this.setState({
                list: res.data,
                total: 10
            });
        });
    }
    componentDidMount() {
        this.getListData(1);
    }
    render() {        
        const pagination = {
            pageSize: 5,
            current: this.state.currentPage,
            total: this.state.total,
            size: "small",
            onChange: (page, pageSize) => {
                this.getListData(page);
                this.setState({
                    currentPage: page
                });
            }
        };
        return (
            <Row
                className="archive-wrapper">
                <Col                    
                    lg={{ span: 22, offset: 1 }}
                    md={{ span: 22, offset: 1 }}
                    xs={{ span: 22 }}
                    className="collection-wrapper"
                >
                    <List
                        className="collection-list"
                        itemLayout="vertical"
                        pagination={pagination}
                        size="large"
                        dataSource={this.state.list}
                        header={this.state.year}
                        renderItem={(item, key) => (
                            <List.Item
                                key={key}
                                extra={timerTrans(item.created_at)}
                                style={{cursor: "pointer"}}
                            >
                                <List.Item.Meta description={[
                                    <a key={item.title} href={item.link}>{item.title}</a>,
                                    <Tag  
                                        key={item.id}                              
                                        className="article-author"
                                        color={colors[Math.floor(Math.random() * colors.length)]}
                                    >{item.author}</Tag>
                                ]}
                                />    
                            </List.Item>
                        )
                        }
                    />                
                </Col>
            </Row>
        );
    }
}


export default CollectionPage;