import React from "react";
import { Row, Col, Button } from "antd";
import axios  from "axios";
import Navigat from "../navigate";
import Login from "../login";
import { menus } from "../../common/menus";
import { Link } from "react-router-dom";
import { loginSuccess, logout } from "../../reducers/user";
import { connect } from "react-redux";

import "./index.less";

export default connect(
    state => state.user,
    { loginSuccess, logout }
)(class PageHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            nav: "首页",
            loginShow: false,
            isLogin: false,
            user: ""
        };      
                
        let funSet = ["menuClick", "loginShow", "loginHide", "checkStatus"];

        for (let i = 0; i < funSet.length; i++) {
            this[funSet[i]] = this[funSet[i]].bind(this);
        }
    }
    componentWillMount() {
        this.checkStatus();
    }
    menuClick({key}) {
        this.setState({
            nav: key
        });       
    }
    loginHide() {
        this.setState({ loginShow: false });
    }
    loginShow() {
        this.setState({ loginShow: true });        
    }
    checkStatus() {
        axios.get("/checkStatus").then(res => {
            if (res.data.isLogin) {
                let userData = res.data.isLogin;

                this.props.loginSuccess({
                    user: userData.username,
                    msg: "登录成功"
                });
            }            
        });
    }
    render() {
        return (
            <Row className="page-header">
                <Col
                    lg={{span: 4}}
                    md={{span: 4}}
                    xs={{span: 0}} />
                <Col
                    lg={{span: 14}}
                    md={{span: 14}}
                    xs={{span: 0}}>
                    <Navigat onClick={this.menuClick} menus={menus} mode="horizontal" />
                </Col>
                
                <Col
                    lg={{span: 5}}
                    md={{span: 5}}
                    xs={{span: 0}}>
                    
                    <div className="personal">
                        {
                            this.props.user ? 
                                <Button
                                    onClick={this.loginShow}
                                    ghost
                                    size="small"
                                    type="primary">
                                    <Link to="/app/admin">后台管理</Link>
                                </Button> : 
                                <Button
                                    onClick={this.loginShow}
                                    ghost
                                    size="small"
                                    type="primary">
                                    登录
                                </Button> 
                        }
                    </div>
                   
                </Col>
                {
                    this.props.user ? null : <Login visible={this.state.loginShow} hide={this.loginHide} />
                }
            </Row>
        );
    }
});

// PageHeader;