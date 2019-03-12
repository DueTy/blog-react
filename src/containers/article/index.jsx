import React from "react";
import axios from "axios";
import hljs from "highlight.js/lib/highlight";
import javascript from "highlight.js/lib/languages/javascript";

import marked from "marked";
import { Card, Tag, Row, Col, Icon } from "antd";

import { colors, timerTrans } from "../../utils";

import "./index.less";

class Article extends React.Component {
    constructor(props) {
        super(props);
        this.state =  {
            id: this.props.match.params.id,
            article: {
                tags: ""
            }
        };
    }
    componentDidMount() {
        console.log(123);
        console.log(hljs);
        this.state.id && this.getArticle(this.state.id);
        hljs.initHighlightingOnLoad();
    }
    getArticle = id => {
        axios.get("getArticle",  {
            params: {
                id: id
            }
        }).then(res =>  {
            this.setState({
                article: res.data.result[0]
            });
        });
    }
    render() {        
        const IconText = ({ type, text }) => (
            <span>
                <Icon type= {type} style= {{marginRight: 8 }} />
                {text}
            </span>
        );
        return(
            <Row>
                <Col                
                    lg= {{span: 22, offset: 1 }}
                    md= {{span: 22, offset: 1 }}
                    xs= {{span: 22 }}>
                    <Card className="article-wrapper"
                        title= {this.state.article.title}
                        extra= {[
                            <Tag color="red" key="author">
                                作者：{this.state.article.author}
                            </Tag>,
                            <span style= {{marginTop: 10}} key="time">
                                {
                                this.state.article.created_at
                                ? timerTrans(this.state.article.created_at)
                                : null
                                }
                            </span>
                        ]}>
                        <div className="article-tags">
                            <span> {this.state.article.readSize} 次浏览</span>
                            <IconText type="tags-o" text= {
                                this.state.article.tags.split(",").map(tag => (
                                    <Tag
                                        key= {tag}
                                        color= {colors[Math.floor(Math.random() * colors.length)]}>
                                        {tag}
                                    </Tag>
                                ))}
                            />
                        </div>
                        <div className="article-content" 
                            dangerouslySetInnerHTML= {{
                                __html: this.state.article.content
                            }}
                        />
                    </Card>

                </Col>
            </Row>
        );
    }
}

export default Article;