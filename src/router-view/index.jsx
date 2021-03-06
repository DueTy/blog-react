import React from "react";
import { HashRouter as Router, Route, Redirect } from "react-router-dom";
import { Row, Col, Layout } from "antd";

import "./index.less";
import { routes } from "../common/routes";
import PageHeader from "../components/header";
import PageSider from "../components/sider";
const { Footer } = Layout;

class RouterView extends React.Component {
    render() {
        return(
            <Router>
                <Layout>
                    <PageHeader />
                    <Row className="page-content">
                        <Col                   
                            lg={{ span: 16 }}
                            md={{ span: 16 }}
                            xs={{ span: 24 }}
                            className="view-container">
                            <Route exact path="/" render={() => <Redirect to="/app/index" />} />
                            {
                                routes.map(({key, path, component, props}) => (
                                    <Route 
                                        exact
                                        key={key}
                                        path={path}
                                        store={this.props.store}
                                        component={component}
                                        {...props}
                                    />
                                ))
                            }
                        </Col>
                        <Col
                            lg={{ span: 6, offset: 1 }}
                            md={{ span: 6, offset: 1 }}
                            xs={{ span: 0 }}
                            className="sider-container">
                            <PageSider />
                        </Col>
                    </Row>
                    <Footer className="page-footer">
                        <p className="copy-right">
                        Copyright © b3auDy 2018
                        </p>
                    </Footer>
                </Layout>
            </Router>
        );
    }
}

export default RouterView;