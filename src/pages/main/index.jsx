import React from 'react';
import {Layout} from 'antd';
import './index.css'
import TopMenu from '../../components/TopMenu'
import Home from '../../views/home'
import {Outlet} from "react-router-dom";

export default function Index(){

    return (
        <Layout className="main">
            <TopMenu/>
            <Outlet/>
        </Layout>
    );
}