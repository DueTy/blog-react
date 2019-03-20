import React from "react";
import { Card, Icon } from "antd";

// import "index.less";

class AboutMe extends React.Component {
    render() {
        const iconStyle = {margin: "0 10px"};
        return(
            <Card>
                <p>
                    <Icon type="solution" style={{ ...iconStyle, color: "#E6A23C" }} />
                    一个两年前端，目前就职于蓉城一家旅游公司工作，不是啥大牛，也没啥高大上的追求（咳咳）
                    敲代码全靠随缘，想法来了，撸到三四点都可以，很喜欢的一句话：每一种未来都值得
                    拍手，所以技术上希望继续自我突破，生存能力上希望经历更多摧残来变得更加坚韧
                </p>
                <p>
                    <Icon type="github" style={iconStyle} />
                    <a href="https://github.com/DueTy" target="_blank">follow me!follow me!</a>
                    <Icon type="wechat" style={{ ...iconStyle, color: "#67C23A" }} />
                    bandit420770824
                    <Icon type="qq" style={iconStyle} />
                    420770824
                </p>
            </Card>
        );
    }
}

export default AboutMe;