import React from 'react';
import {useLocation} from 'react-router-dom'
import {Content} from "antd/es/layout/layout.js";
import './index.css'

export default function Index() {
    return (
        <Content className="context_body">
            这是关于的内容
        </Content>
    );
}