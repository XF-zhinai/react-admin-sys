// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Layout, Select, Modal } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons'
import { reqWeather } from '../../api';
import { formateDate } from '../../utils/global';
import LinkButton from '../button';
import storage from '../../utils/storage'
import '../css/components.scss'

const weatherObj = {
    wea: '',
    city: '',
    wea_img: '',
    win: ''
}

const { Option } = Select;

const Head = () => {
    const { state } = useLocation()
    const {username} = storage.getUser()
    const [getWeather, setWeather] = useState(weatherObj)
    const [getWeatherImg, setWeatherImg] = useState('d0')
    const [getDate, setDate] = useState(formateDate(Date.now()))

    const weatherChange = value => {
        reqWeather(value).then(res => {
            let imgStr = res.wea_img === 'xue' ? 'd28' :
                res.wea_img === 'lei' ? 'd4' :
                    res.wea_img === 'shachen' ? 'd20' :
                        res.wea_img === 'wu' ? 'd18' :
                            res.wea_img === 'bingbao' ? 'd5' :
                                res.wea_img === 'yun' ? 'd1' :
                                    res.wea_img === 'yu' ? 'd7' :
                                        res.wea_img === 'yin' ? 'd2' : 'd0'
            setWeather({ ...weatherObj, ...res })
            setWeatherImg(imgStr);
        })
    }

    const weatherData = value => {
        reqWeather(value).then(res => {
            let imgStr = res.wea_img === 'xue' ? 'd28' :
                res.wea_img === 'lei' ? 'd4' :
                    res.wea_img === 'shachen' ? 'd20' :
                        res.wea_img === 'wu' ? 'd18' :
                            res.wea_img === 'bingbao' ? 'd5' :
                                res.wea_img === 'yun' ? 'd1' :
                                    res.wea_img === 'yu' ? 'd7' :
                                        res.wea_img === 'yin' ? 'd2' : 'd0'
            setWeather({ ...weatherObj, ...res })
            setWeatherImg(imgStr);
        })
    }

    const handelDate = () => {
        setInterval(() => {
            setDate(formateDate(Date.now()))
        }, 1000);
    }

    const handelQuit = () => {
        Modal.confirm({
            title: '确定退出吗？',
            icon: <QuestionCircleOutlined />,
            cancelText: '取消',
            okText: '确定',
            onOk() {
                storage.delUser()
                window.$bom.location.reload()
            }
        });
    }

    
    useEffect(() => {
        weatherData('101200101')
        handelDate()

    }, [])


    return (
        <div className="head_box">
            <Layout.Header className="head_layout">
                <div className="head_layout_t">
                    欢迎，{username}&nbsp;&nbsp;
                    <LinkButton onClick={handelQuit}>退出</LinkButton>
                
                </div>
                <div className="head_layout_b">
                    <div className="head_b_title">{ state ? state.item : '首页' }</div>
                    <div className="head_b_r">
                        {getDate}
                        <img src={`http://www.weather.com.cn/m/i/weatherpic/29x20/${ getWeatherImg }.gif`} alt=""/>
                        {getWeather.win} {getWeather.wea}
                        <Select
                            className="weather_select"
                            defaultValue="武汉"
                            onChange={weatherChange}
                        >
                            <Option value="101200101">武汉</Option>
                            <Option value="101200402">安陆</Option>
                            <Option value="101200502">红安</Option>
                            <Option value="101160807">玉门</Option>
                        </Select>
                    </div>
                </div>
            </Layout.Header>
        </div>
    )
}
export default Head