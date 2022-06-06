import React from 'react'
import {
    Form,
    Input, 
    Button,
    Checkbox
} from 'antd'
import {
    UserOutlined,
    LockOutlined
} from '@ant-design/icons'
import './login.scss'
// @ts-ignore
import logo from './images/logo-1.png'
class Login extends React.Component {
    onFinish = (values) => {
        console.log('Received values of form: ', values);
    }

    render() {
        // const { getFieldDecorator } = this.props.form;
        return (
            <div className="login_box">
                <header className="login_top">
                    <img src={logo} alt="" />
                    <h1>React: 后台管理系统</h1>
                </header>
                <section className="login_in">
                    <h2>用户登录</h2>
                    <div className="login_from">
                        <Form
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={this.onFinish}
                        >
                            <Form.Item
                                name="username"
                                rules={[
                                {
                                    required: true,
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
                                    {
                                        pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$/,
                                        message: "请输入6-15位字母+数字的组合密码",
                                    },
                                ]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="密码"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox>记住我</Checkbox>
                                </Form.Item>

                                <a className="login-form-forgot" href="">
                                    忘记密码
                                </a>
                            </Form.Item>

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