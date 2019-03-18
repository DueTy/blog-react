import React from "react";
import { Card, Tag, Button, Input, Row, Col, message } from "antd";
import axios from "axios";

import { colors } from "../../utils";


class TabEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tagList: [],
            tagEdit: "",
            curTag: ""
        };
        
        this.getTags = this.getTags.bind(this);
        this.selectTag = this.selectTag.bind(this);
        this.addTag = this.addTag.bind(this);
        this.modifyTag = this.modifyTag.bind(this);
        this.handleIptChange = this.handleIptChange.bind(this);
    }
    componentWillMount() {
        this.getTags();
    }
    getTags() {        
        axios.get("/getTag").then(res => {
            if (res.data.code) {
                this.setState({
                    tagList: res.data.result
                });
            }
        });
    }
    selectTag(tag) {
        this.setState({
            tagEdit: tag.tag_name,
            curTag: tag.tag_id
        });
    }
    modifyTag() {
        if (!this.state.curTag) {
            message.error("请选择tag后进行修改");
            return false;
        }
        
        let data = {
            name: this.state.tagEdit,
            id: this.state.curTag
        };
        axios.post("/modifyTag", data).then(res => {
            message.info(res.data.message);
            if (res.data.code) {
                this.getTags();
            }           
        });
    }
    addTag() {
        let data = {
            name: this.state.tagEdit
        };

        if (!this.state.tagEdit) {
            message.error("tag不能为空");
            return false;
        }
        
        axios.post("/addTag", data).then(res => {
            if (res.data.code) {
                message.info(res.data.message);
                this.getTags();
            }
            if (!res.data.code) {
                message.info(res.data.message);
            }
        });
    }
    handleIptChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });        
    }
    render() {
        return (
            <Card className="tag-edit" title="标签">
                {
                    this.state.tagList.length ? 
                        <div>
                            {
                                this.state.tagList.map((tag, key) => (
                                    <Tag
                                        onClick={() => this.selectTag(tag)}
                                        color={colors[Math.floor(Math.random() * colors.length)]}
                                        key={key}>
                                        {tag.tag_name}
                                    </Tag>
                                ))
                            }
                        </div> : 
                        null
                }
                <Row style={{marginTop: "10px"}}>
                    <Col span="12">                    
                        <Input 
                            addonBefore="标签名称" 
                            name="tagEdit" value={this.state.tagEdit} 
                            onChange={this.handleIptChange} 
                        />
                    </Col>
                    <Col offset="1" span="8">
                        <Button onClick={this.addTag} icon="plus" type="primary">新增</Button>
                        <Button onClick={this.modifyTag} style={{marginLeft: "8px"}} icon="edit" type="primary">修改</Button>
                    </Col>
                </Row>
            </Card>
        );
    }
}

export default TabEdit;