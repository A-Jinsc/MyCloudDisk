import React from 'react';
import {
    PlaySquareOutlined,
    ProductOutlined,
    VideoCameraOutlined,
    PictureOutlined,
    FileOutlined,
    EllipsisOutlined,
    HomeTwoTone,
    CloudTwoTone,
    DeleteTwoTone,
    CloudUploadOutlined,
    FileAddOutlined,
    RestOutlined,
    CompressOutlined,
} from '@ant-design/icons';
import {
    Layout,
    Menu,
    theme,
    Space,
    Button,
    Input,
} from 'antd';
import './index.css'
import MenuIcon from '../../components/MenuIcon'
import Home from '../../views/home'

export default function Index(){
    const { Search } = Input;
    const { Header, Sider, Content } = Layout;
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout className="main">
            <Sider trigger={null} theme="light" width='82' className="menu_sider">
                <Space className="menu_div" size='middle'>
                    <MenuIcon text="首页">
                        <HomeTwoTone style={{fontSize: '25px'}}/>
                    </MenuIcon>
                    <MenuIcon text="分享">
                        <CloudTwoTone style={{fontSize: '25px'}}/>
                    </MenuIcon>
                    <MenuIcon text="回收站">
                        <DeleteTwoTone style={{fontSize: '25px'}}/>
                    </MenuIcon>
                </Space>
            </Sider>
            <Home/>
        </Layout>
    );
}