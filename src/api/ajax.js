// 二次封装请求
import axios from 'axios'
import nprogress from 'nprogress'
import { message } from 'antd';
import 'nprogress/nprogress.css'
// 创建axios实例
const http = axios.create({
    baseURL: 'http://47.102.40.110:3000',
    timeout: 1000,
})

// 请求拦截器
http.interceptors.request.use(config => {
    // 显示进度条
    nprogress.start()
    return config
}, err => {
    return Promise.reject(err)
})

http.interceptors.response.use(res => {
    // 关闭进度条
    nprogress.done()
    if (res.data.status === 0) {
        return res.data
    } else {
        message.error(res.data.msg)
    }
    
}, err => {
    return Promise.reject(err)
})

export default http
