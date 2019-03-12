import React from "react";
import  { Card, Select, Form, Col, Row, Button, message, Badge, Tag, Input } from "antd";
import axios from "axios";
import editorConfig from "./editor-config";
const Option = Select.Option;
const FormItem = Form.Item;

class ArticleEdit extends React.Component {
    constructor(props) {
        super(props);

        this.state =  {
            tagList: [],
            articleList: [],
            editor: null,
            ckeLoaded: false,
            curArticle: "",
            article: {
                tag: "",
                title: ""
            },
            currentSelect: ""
        };

        this.NAME_MAP =  {
            tag: "标签",
            title: "文章标题",
            content: "文章内容"
        };
    }
    componentWillMount() {
        this.getTags();
        this.getArticles();
        this.importCkeditorJs();
    }
    getTags = () => {
        axios.get("/getTag").then(res =>  {
            let tagList = res.data.result.map((tag, key) =>  {
                tag.selected = false;
                return tag;
            });            
            this.setState({ tagList });
        });
    }
    getArticles = () => {
        axios.get("/getArticleList").then(res => {
            const articleList = res.data.result;

            this.setState({ articleList });
        });
    }
    tagSelect = inde => {

        let tagList = this.state.tagList,
            article = this.state.article,
            tag = [];

        tagList[index].selected = !tagList[index].selected;

        tagList.forEach(item =>  {
            item.selected && tag.push(item.tag_name);
        });
        
        article.tag = tag.join(",");
        
        
        this.setState({ tagList, article });
    }
    handleModifyClick = () => {
        const article = this.state.articleList.filter(article => 
            article.id === this.state.currentSelect
        )[0];
        console.log(article);
        console.log(this.state.editor);
        this.state.editor.setData(article.content);
    }
    handleTitle = e => {
        let article = this.state.article;
        article.title = e.target.value;     

        this.setState({ article });
    }
    importCkeditorJs = () => {
        if (window.CKEDITOR)  {
            this.setState({ ckeLoaded: true });   
            return false;
        }
        let scriptTag = document.createElement("script");
        scriptTag.setAttribute("type", "text/javascript");
        scriptTag.onload = () =>  {
            message.info("cke资源加载完成");
            this.setState({ ckeLoaded: true });             
        };
        scriptTag.onerror = () =>  {
            message.error("cke资源加载失败");
        };
        scriptTag.setAttribute("src", "/static/assets/ckeditor4.7/ckeditor.js");
        document.body.appendChild(scriptTag);
    }
    initEditor = () => {

        if (!this.state.ckeLoaded)  {
            message.warning("正在加载cke资源");
            return false;
        }

        if (this.state.editor)  {
            message.warning("已实例化编辑器，请勿频繁操作");
            return false;
        }
        
        let editor = window.CKEDITOR.replace("editor");        
        this.setState({ editor });
    }
    getAbstract = text => {
        let abstract = "";
        if (text.length > 80) {
            abstract = text.substring(0, 80);
        } else {
            abstract = text;
        }
        return abstract;
    }
    addArticle = () => {
        let article = this.state.article,
            editor = this.state.editor,
            data =  {
                title: article.title || "随便写写",
                tag: article.tag || "学习",
                content: editor.getData(),
                abstract: editor.document.getBody().getText(),
                author: article.author || "DueTy"
            },
            flag = true;

        Object.keys(data).forEach(field =>  {
            if(!data[field]) {
                flag = false;
                message.warning(this.NAME_MAP[field] + "不能为空，请填写");
                return;
            }
        });

        if (!flag)  {
            return false;
        }

        axios.post("/postArticle", data).then(res =>  {
            if (res.data.code)  {
                message.info(res.data.message);
                this.setState({ curArticle: res.data.id });
            } else  {
                message.error("添加失败");
            }
            
        });
    }
    render() {
        const layoutCol =  {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 }
        };
        return (
            <Card className="article-edit" title="文章编辑">
                <Row>   
                    <Col span={12}>
                        <FormItem  {...layoutCol} label="文章">
                            <Select name="article" 
                                onChange={val => this.setState({ currentSelect: val })} 
                                style={{width: "100%" }}
                            >
                                {
                                this.state.articleList.map((article, key) => (
                                    <Option key={key} value={article.id}> {article.title}</Option>
                                ))
                                }
                            </Select>    
                        </FormItem>
                    </Col>
                </Row>
                <Row> 
                    <Col span={20}>
                        <Row style={{marginBottom: 10}} type="flex" justify="end"> 
                            <Button onClick={this.initEditor} icon="plus" type="primary">新增</Button>
                            <Button onClick={this.handleModifyClick} 
                                style={{marginLeft: "8px"}} 
                                icon="edit" 
                                type="primary"
                            >修改</Button>
                        </Row>   
                    </Col>                
                </Row>
                <Row>                     
                    <Col span={20}>
                        <FormItem  {...layoutCol} label="文章标题">
                            <Input onChange={this.handleTitle} value={this.state.article.title} />
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <div style={{margin: "10px 0"}}>
                        <div id="editor" />
                    </div>
                    <Row type="flex" justify="end">
                        <Col span={18}>
                            {
                            this.state.tagList.length ? 
                                <div>
                                    {
                                    this.state.tagList.map((tag, key) => (
                                        <Badge
                                            className="tag-bge"
                                            onClick={() => this.tagSelect(key)}
                                            dot={tag.selected}
                                            key={key}>
                                            <Tag>  {tag.tag_name}</Tag>
                                        </Badge>
                                    ))
                                    }
                                </div> : 
                            null
                            }       
                            <p style={{marginTop: 10, display: this.state.article.tag ? "block" : "none"}}>
                                标签: {this.state.article.tag}
                            </p>                     
                        </Col>
                        <Col span={6} style={{textAlign: "right"}}>                            
                            <Button onClick={this.addArticle} style={{marginLeft: 8}} type="primary">提交</Button>
                        </Col>
                    </Row>
                </Row>
            </Card>
        );
    }
}

export default ArticleEdit;