// 接口文件
import http from './ajax'
// import mockHttp from './mockAjax'

const host = 'http://47.102.40.110:3000'
export const reqCategory = categoryId => http.get({ url: `${host}/manage/category/info`, params: { categoryId }, method: 'get' }) // 获取商品名
