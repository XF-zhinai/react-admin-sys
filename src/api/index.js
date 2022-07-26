// 接口文件
import http from './ajax'
// import mockHttp from './mockAjax'

const host = 'http://47.102.40.110:3000'
export const reqLogin = data => http({ url: `${host}/login`, data, method: 'post' }) // 登录
export const reqWeather = city => http({ url: `https://www.yiketianqi.com/free/day?appid=91145352&appsecret=SEZv3V1T&cityid=${city}&unescape=1`, method: 'get' }) // 获取天气
export const reqCategoryList = parentId => http({ url: `${host}/manage/category/list`, params: { parentId }, method: 'get' }) // 获取一级、二级分类列表
export const reqAddCategory = ({ parentId, categoryName }) => http({ url: `${host}/manage/category/add`, data: { parentId, categoryName }, method: 'post' }) // 添加分类
export const reqUpDateCategory = (data) => http({ url: `${host}/manage/category/update`, data, method: 'post' }) // 更新分类
export const reqProduct = ({ pageNum, pageSize }) => http({ url: `${host}/manage/product/list`, params: { pageNum, pageSize }, method: 'get' }) // 获取商品列表
export const reqCategory = categoryId => http({ url: `${host}/manage/category/info`, params: { categoryId }, method: 'get' }) // 获取商品名
export const reqSearchCategory = data => http({url: `${host}/manage/product/search?pageNum=1&pageSize=20`, params: data, method: 'get'}) // 搜索商品
