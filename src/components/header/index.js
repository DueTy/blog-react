import React from "react";
import { Row, Col } from "antd";
import Navigat from "../navigate";
import { menus } from "../../common/menus";


import "./index.less";

class PageHeader extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            nav: "首页"
        };
        this.menuClick = this.menuClick.bind(this);
    }
    menuClick({key}){
        this.setState({
            nav: key
        });       
    }
    render() {
        return (
            <Row className="page-header">
                <Col
                    lg={{span: 4}}
                    md={{span: 4}}
                    xs={{span: 0}}>                
                </Col>
                <Col
                    lg={{span: 14}}
                    md={{span: 14}}
                    xs={{span: 0}}>
                    <Navigat onClick={this.menuClick} menus={menus} mode="horizontal"/>                
                </Col>
            </Row>
        )
    }
};

export default PageHeader;