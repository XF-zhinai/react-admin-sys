import Mock from 'mockjs'
import login from './login.json'

Mock.Mock('/mock/login', { code: 200, data: login})