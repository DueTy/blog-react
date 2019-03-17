import React from "react";
import axios from "axios";
import {  Row, Col, List, Tag, Icon } from "antd";

import "./index.less";
import { colors, timerTrans } from "../../utils";

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            currentPage: 1,
            total: 0
        };
    }
    getListData = page => {
        axios.get("/getArticleList", {
            params: {
                page: page
            }
        }).then(res => {
            
            this.setState({
                list: res.data.result
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
        const IconText = ({ type, text }) => (
            <span>
                <Icon type={type} style={{ marginRight: 8, fontSize: 18 }} />
                {text}
            </span>
        );
        return (
            <Row>
                <Col
                    lg={{ span: 22, offset: 1 }}
                    md={{ span: 22, offset: 1 }}
                    xs={{ span: 22 }}
                    className="article-wrapper"
                >
                    <List                  
                        itemLayout="vertical"
                        pagination={pagination}
                        size="large"
                        dataSource={this.state.list}
                        renderItem={(item, key) => (
                            <List.Item
                                key={item.title}
                                actions={
                                    [
                                        <IconText key={key} type="message" text={item.commentSize} />,
                                        <IconText key={key} type="tags-o" text={item.tags.split(",").map((tag, tagKey) => (
                                            <Tag color={colors[Math.floor(Math.random() * colors.length)]} key={tagKey}>{tag}</Tag>
                                        ))
                                        } />,
                                        <IconText key={key} type="folder" text={
                                            <Tag color="orange" key={key}>{item.type}</Tag>
                                        } />
                                    ]
                                }   
                                extra={[
                                    timerTrans(item.created_at)
                                ]}                         
                            >
                                <List.Item.Meta
                                    className="list-item"
                                    title={item.title}
                                    description={item.abstract}
                                    onClick={() => this.props.history.push(`/app/article/${item.id}`)} 
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


export default Index;