import React from "react";
import { Modal, Input, Icon, Button, message } from "antd";
import axios from "axios";

import "./index.less";

class Login extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            username: "",
            password: ""
        }
        
        let funSet = ["handleChange", "handleOk"];

        for (let i = 0; i < funSet.length; i++) {
            this[funSet[i]] = this[funSet[i]].bind(this);
        }
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    handleOk(){
        let data = {
            username: this.state.username,
            password: this.state.password
        };

        axios.post("/login", data).then((res) => {
            if (!res.data.code) {
                message.error(res.data.message);
            }

            if (res.data.code) {
                message.info(res.data.message);
                window.location.href = "/";
            }
        });
    }
    render(){
        return (
            <Modal
                className="login-modal"              
                title="登录"
                visible={this.props.visible}
                onCancel={this.props.hide}
                width={320}
                footer={null}>
                <div>
                    <Input
                        style={{marginBottom: 20}}
                        prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />} 
                        name="username"
                        placeholder="用户名"
                        value={this.state.username}
                        onChange={this.handleChange}
                    />
                    <Input
                        style={{marginBottom: 20}}
                        prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />} 
                        type="password"
                        name="password"
                        placeholder="密码"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                </div>
                <div>                    
                    <Button
                        style={{width: "100%"}}
                        type="primary"
                        onClick={this.handleOk}>
                        登录
                    </Button>
                </div>
            </Modal>
        )
    }
};

export default Login;