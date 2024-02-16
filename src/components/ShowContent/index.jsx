import React from 'react';
import {useLocation} from 'react-router-dom'
import {Content} from "antd/es/layout/layout.js";
import UpLoad from '../UpLoad'
import './index.css'

export default function Index() {
    const {state:{des}}= useLocation()

    return (
        <Content className="context_body">
            <div className="title">{des}文件</div>
            <div className="center_area"><UpLoad/></div>
        </Content>
    );
}