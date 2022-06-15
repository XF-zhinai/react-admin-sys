import React from 'react'
import { Outlet } from 'react-router-dom'
import { Breadcrumb, Layout } from 'antd';
import Head from '../../components/Header';
import NavLeft from '../../components/Sider';
class Admin extends React.Component {
    state = {
        collapsed: false
    }
    render() {
        return (
            <div className="admin_box">
                <Layout
                    style={{
                        minHeight: '100vh',
                    }}
                    >
                    <NavLeft />
                    <Layout className="site-layout">
                        <Head />
                        <Layout.Content
                            style={{
                                margin: '0 16px',
                            }}
                        >
                            <Breadcrumb
                                style={{
                                margin: '16px 0',
                                }}
                            >
                                <Breadcrumb.Item>User</Breadcrumb.Item>
                                <Breadcrumb.Item>Bill</Breadcrumb.Item>
                            </Breadcrumb>
                            <div
                                className="site-layout-background"
                                style={{
                                padding: 24,
                                minHeight: 360,
                                }}
                            >
                                <Outlet />
                            </div>
                        </Layout.Content>
                        <Layout.Footer
                            style={{
                                textAlign: 'center',
                            }}
                        >
                        Ant Design ©2018 Created by Ant UED
                        </Layout.Footer>
                    </Layout>
                </Layout>
            </div>
        )
    }
}

export default Admin