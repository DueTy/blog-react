import React from "react";
import { Card, Tag } from "antd";

import avator from "../../assets/images/avator.png";
import { colors } from "../../utils";
import "./index.less";

class PageSider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            recent: [],
            tags: []
        };

        this.getRecent = this.getRecent.bind(this);
        this.getTags = this.getTags.bind(this);
    }
    getRecent() {
        this.setState({
            recent: [
                "入门到放弃", "JavaScript", "react"
            ]
        });
    }
    getTags() {
        this.setState({
            tags: [
                "嘻嘻嘻", "哈哈哈", "学习", "入门到放弃", "JavaScript", "react"
            ]
        });
    }
    componentDidMount() {
        this.getRecent();
        this.getTags();
    }
    render() {
        return(
            <div className="page-sider">
                <section className="avator-container block">
                    <img src={avator} />
                    <p className="bloger">DueTy</p>
                    <p className="slogan">
                        b3auDy Of This World
                    </p>
                </section>
                <section className="recent-container block">
                    <Card title="最近文章">
                        {
                            this.state.recent.length ? <ul className="recent-list">
                                {
                                    this.state.recent.map((article, key) => (
                                        <li className="recent-item" key={key}>
                                            {article}
                                        </li>
                                    ))
                                }
                            </ul> : null
                        }
                    </Card>
                </section>
                <section className="tag-container block">
                    <Card title="标签">
                        {
                            this.state.tags.length ? <div>
                                {
                                    this.state.tags.map((tag, key) => (
                                        <Tag
                                            color={colors[Math.floor(Math.random() * colors.length)]}
                                            key={key}>
                                            {tag}
                                        </Tag>
                                    ))
                                }
                            </div> : null
                        }
                    </Card>
                </section>
            </div>
        );
    }
}

export default PageSider;

