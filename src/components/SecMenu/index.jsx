import React from 'react';
import {Layout, Menu} from "antd";
import {
    EllipsisOutlined,
    FileOutlined,
    PictureOutlined,
    PlaySquareOutlined,
    ProductOutlined,
    VideoCameraOutlined
} from "@ant-design/icons";
import './index.css'

export default function Index(props) {
    const { Sider } = Layout;

    function showData(Obj){
        props.getMenuItem(Obj)
    }

    return (
        <Sider trigger={null} theme="light" className="sec_sider">
            <Menu
                style={{border: '0'}}
                theme="light"
                mode="inline"
                defaultSelectedKeys={['1']}
                items={[
                    {
                        key: '1',
                        icon: <ProductOutlined />,
                        label: '全部',
                    },
                    {
                        key: '2',
                        icon: <VideoCameraOutlined />,
                        label: '视频',
                    },
                    {
                        key: '3',
                        icon: <PlaySquareOutlined />,
                        label: '音频',
                    },
                    {
                        key: '4',
                        icon: <PictureOutlined />,
                        label: '图片',
                    },
                    {
                        key: '5',
                        icon: <FileOutlined />,
                        label: '文档',
                    },
                    {
                        key: '6',
                        icon: <EllipsisOutlined />,
                        label: '其他',
                    }
                ]}
                onSelect={(Obj) => showData(Obj)}
            />
        </Sider>
    );
}