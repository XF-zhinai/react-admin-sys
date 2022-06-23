import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
    HomeOutlined,
    AppstoreOutlined,
    BarsOutlined,
    ToolOutlined,
    UserOutlined,
    SafetyOutlined,
    AreaChartOutlined,
    BarChartOutlined,
    LineChartOutlined,
    PieChartOutlined
    
} from '@ant-design/icons';
import '../css/components.scss'


const NavLeft = () => {
    const items = [
        {
            label: '首页',
            key: '/home',
            icon: <HomeOutlined />,
            onClick: () => { navigate('home', { state: { item: '首页' } })}
        }, {
            label: '商品',
            key: '/products',
            icon: <AppstoreOutlined />,
            children: [
                {
                    label: '品类管理',
                    key: '/category',
                    icon: <BarsOutlined />,
                    onClick: () => {navigate('category', { state: { item: '品类管理' } })}
                }, {
                    label: '商品管理',
                    key: '/product',
                    icon: <ToolOutlined />,
                    onClick: () => {navigate('product', { state: { item: '商品管理' } })}
                }
            ]
        }, {
            label: '用户管理',
            key: '/user',
            icon: <UserOutlined />,
            onClick: () => {navigate('/user', { state: { item: '用户管理' } })}
        }, {
            label: '角色管理',
            key: '/role',
            icon: <SafetyOutlined />,
            onClick: () => {navigate('role', { state: { item: '角色管理' } })}
        }, {
            label: '图形图表',
            key: '/charts',
            icon: <AreaChartOutlined />,
            children: [
                {
                    label: '柱形图',
                    key: '/bar',
                    icon: <BarChartOutlined />,
                    onClick: () => {navigate('bar', { state: { item: '柱形图' } })}
                }, {
                    label: '折线图',
                    key: '/line',
                    icon: <LineChartOutlined />,
                    onClick: () => {navigate('line', { state: { item: '折线图' } })}
                }, {
                    label: '饼图',
                    key: '/pie',
                    icon: <PieChartOutlined />,
                    onClick: () => {navigate('pie', { state: { item: '饼图' } })}
                }
            ]
        }
        
    ];
    const navigate = useNavigate()
    
    const location = useLocation()
    const selectedKeys = location.pathname
    const [collapsed, setCollapsed] = useState(false)
    // const [getDefaultOpenKeys, setDefaultOpenKeys] = useState('')

    useEffect(() => {
        /* items.forEach(e => {
            if (e.children) {
                e.children.find(item => {
                    if (selectedKeys.indexOf(item.key) === 0) setDefaultOpenKeys(e.key)
                })
                    
            }
        }); */
        navigate('/home')
    }, []) // eslint-disable-line
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
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[selectedKeys]}
                    // defaultOpenKeys={[getDefaultOpenKeys]}
                    items={items}
                >
                </Menu>
            </Layout.Sider>
        </div>
    )
}
export default NavLeft