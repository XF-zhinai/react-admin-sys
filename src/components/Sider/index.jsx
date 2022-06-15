import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import './sider.scss'
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
const items = [
    getItem('首页', '1', <PieChartOutlined />),
    getItem('商品', 'sub1', <UserOutlined />, [
        getItem('品类管理', '2'),
        getItem('商品管理', '3'),
    ]),
    getItem('用户管理', '4', <DesktopOutlined />),
    getItem('角色管理', '5', <FileOutlined />),
    getItem('图形图表', 'sub2', <TeamOutlined />, [
        getItem('柱形图', '6'),
        getItem('条形图', '7'),
        getItem('饼图', '8')
    ]),
    
];
const NavLeft = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div className="navLeft_box">
            
            <Layout.Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                style={{'height': '100%'}}
            >
                <Link to="/" className="navLeft_top">
                    <img src={require('../../assets/images/1.png')} alt="" />
                    <h1>管理后台</h1>
                </Link>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Layout.Sider>
        </div>
    )
}
export default NavLeft