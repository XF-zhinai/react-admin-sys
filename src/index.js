// @ts-nocheck
// 入口文件
import React from "react";
import ReactDOM from "react-dom";
import App from './App'
import http from './api/ajax'

window.$bom = window
window.$http = http

ReactDOM.render(
    <App />,
    document.getElementById('root')
)