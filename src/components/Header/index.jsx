import React from 'react';
import { Layout } from 'antd';

const Head = () => {
    return (
        <div className="head_box">
            <Layout.Header
                className="site-layout-background"
                style={{
                    padding: 0,
                }}
            >
                我是页头
            </Layout.Header>
        </div>
    )
}
export default Head