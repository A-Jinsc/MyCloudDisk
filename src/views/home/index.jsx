import React from 'react';
import {Layout, theme} from "antd";
import './index.css'
import SecMenu from '../../components/SecMenu'
import SecHeader from '../../components/SecHeader'
import ShowContent from '../../components/ShowContent'

export default function Index() {
    const { Content } = Layout;
    //颜色主题设置用法
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <div className="view">
            <SecMenu/>
            <Layout>
                <SecHeader/>
                <ShowContent/>
            </Layout>
        </div>
    );
}