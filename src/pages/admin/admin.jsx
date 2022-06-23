import React from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd';
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
                                background: '#FFFFFF',
                                margin: '20px',
                            }}
                        >
                            <div
                                className="site-layout-background"
                                style={{
                                    minHeight: 360,
                                }}
                            >
                                <Outlet />
                            </div>
                        </Layout.Content>
                        <Layout.Footer
                            style={{
                                textAlign: 'center',
                                color: '#aaaaaa'
                            }}
                        >
                        推荐使用谷歌浏览器，可以获得最佳页面操作体验
                        </Layout.Footer>
                    </Layout>
                </Layout>
            </div>
        )
    }
}

export default Admin