import React from "react";
import { Card, Tag } from "antd";

import avator from "@/assets/images/avator.png";
import { colors } from "@/utils";
import "./index.less";

import { Link } from "react-router-dom";
import { listFetchedSuccess, listFetchedFailed } from "@/reducers/list";
import { connect } from "react-redux";

import api from "@/common/api";

export default connect(
    state => state.list,
    { listFetchedSuccess, listFetchedFailed }
)(class PageSider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            recent: [],
            tags: []
        };
    }
    getArticles = () => {

        api.getArticleList({}).then(res => {
            if(res.code) {
                this.props.listFetchedSuccess(res.result);
                this.setState({ recent: [ ...res.result.slice(0, 3) ] });
            } else {
                this.props.listFetchedFailed();
            }
        });
    }
    getTags = () => {
        api.getTags({}).then(res => {
            this.setState({ tags: res.result });
        });
    }
    componentDidMount() {
        this.getArticles();
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
                                        <li 
                                            className="recent-item"
                                            key={key}>
                                            <Link to={`/app/article/${article.id}`}>{article.title}</Link>
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
                                            {tag.tag_name}
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
});
