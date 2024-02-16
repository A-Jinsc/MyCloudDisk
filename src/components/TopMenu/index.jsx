import React, {useState} from 'react';
import {Layout, Space} from 'antd';
import {HomeTwoTone, CloudTwoTone, DeleteTwoTone} from '@ant-design/icons'
import './index.css'
import {useNavigate} from "react-router-dom";

export default function Index() {
    const {Sider} = Layout;
    const [color, setColor] = useState(['#196df6', '#4d4d4d', '#4d4d4d'])
    const navigate = useNavigate()

    function selectItem(i){
        let colorM = ['#4d4d4d', '#4d4d4d', '#4d4d4d'];
        colorM[i] = '#196df6';
        setColor(colorM);
        switch(i){
            case 0: navigate("home/all",{state:{des:'全部'}}); break;
            case 1: navigate("share"); break;
            case 2: navigate("recycle"); break;
            default: navigate("home/all",{state:{des:'全部'}}); break;
        }
    }

    return (
        <Sider trigger={null} theme="light" width='82' className="menu_sider">
            <Space className="menu_div" size='middle'>
                <div className="icon_title_box" onClick={() => selectItem(0)}>
                    <div className="icon_area">
                        <HomeTwoTone style={{fontSize: '25px'}} twoToneColor={color[0]}/>
                    </div>
                    <div className="text_area" style={{color: color[0]}}>首页</div>
                </div>
                <div className="icon_title_box" onClick={() => selectItem(1)}>
                    <div className="icon_area">
                        <CloudTwoTone style={{fontSize: '25px'}} twoToneColor={color[1]}/>
                    </div>
                    <div className="text_area" style={{color: color[1]}}>分享</div>
                </div>
                <div className="icon_title_box" onClick={() => selectItem(2)}>
                    <div className="icon_area">
                        <DeleteTwoTone style={{fontSize: '25px'}} twoToneColor={color[2]}/>
                    </div>
                    <div className="text_area" style={{color: color[2]}}>回收站</div>
                </div>
            </Space>
        </Sider>
    );
}