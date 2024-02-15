import React from 'react';
import {Button, Input, Layout, Space} from "antd";
import {CloudUploadOutlined, CompressOutlined, FileAddOutlined, RestOutlined} from "@ant-design/icons";
import './index.css'

export default function Index() {
    const { Search } = Input;
    const { Header } = Layout;

    return (
        <Header className="context_header">
            <Space>
                <Button type="primary" icon={<CloudUploadOutlined />}>上传</Button>
                <Button type="primary" icon={<FileAddOutlined />} style={{
                    borderColor: '#029402FF',
                    backgroundColor: '#299801FF',
                }}>新建文件夹</Button>
                <Button type="primary" icon={<RestOutlined /> } style={{
                    borderColor: 'orangered',
                    backgroundColor: 'orangered',
                }}>批量删除</Button>
                <Button type="primary" icon={<CompressOutlined />} style={{
                    borderColor: '#e8b304',
                    backgroundColor: '#e8b304',
                }}>移动</Button>
            </Space>
            <Search placeholder="输入文件名搜索" style={{ width: 200, marginLeft: 20}}/>
        </Header>
    );
}