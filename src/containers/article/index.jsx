import React from "react";
import { Card, Tag, Row, Col, Icon, message } from "antd";
import { colors, timerTrans } from "@/utils";

import "./index.less";
import api from "@/common/api";

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
        this.state.id && this.getArticle(this.state.id);
        this.loadHLJSScript();
        
    }
    loadHLJSScript = () => {        
        let scriptTag = document.createElement("script");
        scriptTag.setAttribute("type", "text/javascript");
        scriptTag.onload = () =>  {
            this.setState({ hljsLoaded: true }, () => {
                this.highlightCode();
            });
        };
        scriptTag.onerror = () =>  {
            message.error("highlight资源加载失败");
        };
        scriptTag.setAttribute("src", "/static/assets/highlight/highlight.pack.js");
        document.body.appendChild(scriptTag);
    }
    highlightCode = () => {        
        const nodes = this.artiDom.querySelectorAll("pre code");            
        for (let i = 0; i < nodes.length; i++) {
            window.hljs.highlightBlock(nodes[i]);
        }
    }
    getArticle = id => {
        api.getArticle({
            params: {
                id: id
            }
        }).then(res =>  {
            this.setState({
                article: res.result[0]
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
                            {/* <span> {this.state.article.readSize} 次浏览</span> */}
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
                        <div ref={ref => { this.artiDom = ref; }} 
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