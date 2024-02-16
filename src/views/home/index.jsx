import React from 'react';
import {Layout, theme} from "antd";
import './index.css'
import SecMenu from '../../components/SecMenu'
import SecHeader from '../../components/SecHeader'
import {useNavigate, Outlet} from "react-router-dom";

export default function Index() {
    //颜色主题设置用法
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const navigate = useNavigate()

    const getMenuItem = (Obj) => {
        switch(Obj.key){
            case "1": navigate("all",{state:{des:'全部'}}); break;
            case "2": navigate("video",{state:{des:'视频'}}); break;
            case "3": navigate("music",{state:{des:'音频'}}); break;
            case "4": navigate("picture",{state:{des:'图片'}}); break;
            case "5": navigate("document",{state:{des:'文档'}}); break;
            case "6": navigate("other",{state:{des:'其他'}}); break;
            default: navigate("/main/home/all",{state:{des:'全部'}}); break;
        }
    }

    return (
        <div className="view">
            <SecMenu getMenuItem={getMenuItem}/>
            <Layout>
                <SecHeader/>
                <Outlet/>
            </Layout>
        </div>
    );
}