import React from "react";
import  { 
    Card, Select, Form, 
    Col, Row, Button, 
    message, Badge, Tag, 
    Input 
} from "antd";
const Option = Select.Option;
const FormItem = Form.Item;

import api from "@/common/api";

class ArticleEdit extends React.Component {
    constructor(props) {
        super(props);

        this.state =  {
            tagList: [],
            articleList: [],
            editor: null,
            ckeLoaded: false,
            isModify: false,
            article: {
                tag: "",
                title: ""
            },
            currentSelect: ""
        };

        this.NAME_MAP =  {
            tags: "标签",
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
        api.getTags().then(res =>  {
            let tagList = res.result.map((tag, key) =>  {
                tag.selected = false;
                return tag;
            });            
            this.setState({ tagList });
        });
    }
    getArticles = () => {
        api.getArticleList({}).then(res => {
            const articleList = res.result;            

            this.setState({ articleList });
        });
    }
    tagSelect = index => {

        let tagList = this.state.tagList,
            article = this.state.article,
            tags = [];

        tagList[index].selected = !tagList[index].selected;

        tagList.forEach(item =>  {
            item.selected && tags.push(item.tag_name);
        });
        
        article.tags = tags.join(",");
        
        this.setState({ tagList, article });
    }
    handleArticleSelectChange = id => {
        if (!id) {
            this.setState({ 
                article: {
                    tag: "",
                    title: ""
                }
            });
            this.state.editor.setData("");
            this.setState({ isModify: false });
            return;
        }
        const article = this.state.articleList.filter(article => 
            article.id === id
        )[0];

        this.setState({ article, isModify: true }, () => {
            this.state.editor.setData(article.content);
        });
    }
    handleTitle = e => {
        let article = this.state.article;
        article.title = e.target.value;     

        this.setState({ article });
    }
    importCkeditorJs = () => {
        if (window.CKEDITOR)  {
            this.setState({ ckeLoaded: true }, () => this.initEditor());
            return false;
        }
        let scriptTag = document.createElement("script");
        scriptTag.setAttribute("type", "text/javascript");
        scriptTag.onload = () =>  {
            message.info("cke资源加载完成");
            this.setState({ ckeLoaded: true });   
            this.initEditor();       
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
    modifyArticle = () => {
        let state = this.state,
            article = state.article,
            editor = state.editor;
        
        Object.assign(article, {            
            content: editor.getData(),
            abstract: editor.document.getBody().getText()
        });
        
        const data = { article };
        
        api.modifyArticle({ data }).then(res => {
            message.info(res.message);
        });
    }
    addArticle = () => {
        let state = this.state,
            article = state.article,
            editor = state.editor,
            data =  {
                title: article.title || "随便写写",
                tags: article.tags || "学习",
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

        api.addArticle({ data }).then(res =>  {
            if (res.code)  {
                message.info(res.message);
            } else  {
                message.error("添加失败");
            }
            
        });
    }
    render() {
        const 
            state = this.state,
            layoutCol =  {
                labelCol: { span: 4 },
                wrapperCol: { span: 20 }
            };
        return (
            <Card className="article-edit" title="文章编辑">
                <Form>
                    <Row>   
                        <Col span={18}>
                            <FormItem  {...layoutCol} label="文章">
                                <Select name="article" 
                                    onChange={this.handleArticleSelectChange} 
                                    style={{width: "100%" }}
                                    disabled={!state.ckeLoaded}
                                    allowClear
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
                        <Col span={18}>
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
                                    标签: {this.state.article.tags}
                                </p>                     
                            </Col>
                            <Col span={6} style={{textAlign: "right"}}>
                                {
                                    state.isModify ?                         
                                        <Button 
                                            onClick={this.modifyArticle} 
                                            style={{marginLeft: 8}} 
                                            size="small"
                                            icon="edit"
                                            type="primary">修改</Button> :
                                        <Button 
                                            onClick={this.addArticle} 
                                            style={{marginLeft: 8}} 
                                            size="small"
                                            icon="save"
                                            type="primary">提交</Button>
                                } 
                            </Col>
                        </Row>
                    </Row>
                </Form>
            </Card>
        );
    }
}

export default ArticleEdit;