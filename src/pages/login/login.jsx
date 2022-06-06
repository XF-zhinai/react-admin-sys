import React from 'react'
import {
    Form,
    Icon, 
    Input, 
    Button,
    Checkbox
} from 'antd'
import './login.less'
class Login extends React.Component {

    render() {
        // const { getFieldDecorator } = this.props.form;
        return (
            <div className='login_box'>
                <div className="login_top">
                    <img src="./images/1.png" alt="" />
                    <h1>React: 后台管理系统</h1>
                </div>
                <div className="login_in">
                    <div className="login_from">
                        <h4>用户登录</h4>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login