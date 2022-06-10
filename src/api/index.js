// 接口文件
import http from './ajax'
// import mockHttp from './mockAjax'
export const reqLogin = data => http({url: '/login', data, method: 'post'}) // 登录