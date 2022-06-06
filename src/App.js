// 根文件
import React from 'react'
import { BrowserRouter, Route,  Routes} from 'react-router-dom'
import Admin from './pages/admin/admin'
import Login from './pages/login/login'
import './App.css';
class App extends React.Component {
    render() {
        return (
            // 创建路由并当前显示
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Admin />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                </Routes>
            </BrowserRouter>
        )
    }
}

export default App
