
const HOST = "http://47.102.40.110:3000"
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    login: () => `${HOST}/login`, // 登录
    weather: city => `https://www.yiketianqi.com/free/day?appid=91145352&appsecret=SEZv3V1T&cityid=${city}&unescape=1`, // 获取天气
    categoryList: () => `${HOST}/manage/category/list`, // 获取一级、二级分类列表
    addCategory: () => `${HOST}/manage/category/add`, // 添加分类
    upDateCategory: () => `${HOST}/manage/category/update`, // 更新分类
    productList: () => `${HOST}/manage/product/list`, // 获取商品列表
    searchCategory: () => `${HOST}/manage/product/search?pageNum=1&pageSize=20`, // 搜索商品
}