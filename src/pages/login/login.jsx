import React from 'react'
import {
    Form,
    Input, 
    Button,
} from 'antd'
import {
    UserOutlined,
    LockOutlined
} from '@ant-design/icons'
import './login.scss'
import {reqLogin} from '../../api'
class Login extends React.Component {
    state = {
        username: 'admin',
        password: 'admin'
    }
    onFinish = (values) => {
        console.log('Received values of form: ', values);
    
        reqLogin(values).then(res => {
            console.log(res);
        })
        
    }

    render() {
        return (
            <div className="login_box">
                <header className="login_top">
                    <img src={require('./images/logo-1.png')} alt="" />
                    <h1>React: 后台管理系统</h1>
                </header>
                <section className="login_in">
                    <h2>用户登录</h2>
                    <div className="login_from">
                        <Form
                            initialValues={this.state}
                            onFinish={this.onFinish}
                        >
                            <Form.Item
                                name="username"
                                rules={[
                                {
                                    required: true,
                                    whitespace: true,
                                    message: '请输入用户名！',
                                },
                                ]}
                            >
                                <Input
                                    prefix={<UserOutlined className="site-form-item-icon" />}
                                    placeholder="用户名" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入密码！',
                                    },
                                ]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="密码"
                                />
                            </Form.Item>
                            {/* <Form.Item>
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox>记住我</Checkbox>
                                </Form.Item>

                                <a className="login-form-forgot" href="/#">
                                    忘记密码
                                </a>
                            </Form.Item> */}

                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="login-form-button"
                                >
                                    登录
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </section>
            </div>
        )
    }
}

export default Login