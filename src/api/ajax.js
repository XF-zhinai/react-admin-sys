// 二次封装请求
import axios from 'axios'
import nprogress from 'nprogress'
import {
    message
} from 'antd';
import 'nprogress/nprogress.css'
// 创建axios实例
const http = axios.create({
    baseURL: '/',
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
    if (res.status === 200) {
        if (res.data.status === 1) return message.error(res.data.msg)
        return res.data
    } else {
        message.error(res.data.msg)
    }

}, err => {
    return Promise.reject(err)
})

const send = (config) => http(config)

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    get: (config) => {
        if (typeof config === 'string') {
            config = {
                url: config
            }
        }
        config = {
            params: typeof config.data === 'object' ? config.data : {},
            method: 'get',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            ...config,
        }
        return send(config)
    },
    post: (config) => {
        if (typeof config === 'string') {
            config = {
                url: config
            }
        }
        config = {
            data: typeof config.data === 'object' ? JSON.stringify(config.data) : {},
            method: 'post',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            ...config,
        }
        return send(config)
    },
}