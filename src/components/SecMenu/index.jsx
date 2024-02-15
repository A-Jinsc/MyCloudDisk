import React from 'react';
import {Layout, Menu} from "antd";
import {useNavigate} from 'react-router-dom';
import {
    EllipsisOutlined,
    FileOutlined,
    PictureOutlined,
    PlaySquareOutlined,
    ProductOutlined,
    VideoCameraOutlined
} from "@ant-design/icons";

export default function Index() {
    const navigate = useNavigate()
    const { Sider } = Layout;

    function showData(Obj){
        console.log(Obj.key === "1")
        switch(Obj.key){
            case "1": navigate("all",{state:{des:'全部'}}); break;
            case "2": navigate("video",{state:{des:'视频'}}); break;
            case "3": navigate("music",{state:{des:'音频'}}); break;
            case "4": navigate("picture",{state:{des:'图片'}}); break;
            case "5": navigate("document",{state:{des:'文档'}}); break;
            case "6": navigate("other",{state:{des:'其他'}}); break;
            default: navigate("all",{state:{des:'全部'}}); break;
        }
    }

    return (
        <Sider trigger={null} theme="light">
            <Menu
                id="menu"
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