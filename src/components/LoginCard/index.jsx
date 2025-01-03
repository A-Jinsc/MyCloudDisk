import React, { useState } from 'react';
import {LockOutlined, UserOutlined, QqOutlined, WechatOutlined} from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Divider, Modal} from 'antd'
import {useNavigate} from 'react-router-dom'
import Vert from '../../components/SlideVerify'
import './index.css'

export default function Index() {

    const navigate = useNavigate()

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    function loginToHome(){
        navigate("/main/home/all",{
            replace: true,
            state: {des:'全部'}
        })
    }

    return (
        <div className="card_box">
            <div className="left_item">
                <img src="/src/assets/loginView/people.png" alt="···" className="people"/>
            </div>
            <Divider type="vertical" className="divider"/>
            <div className="right_item">
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: '请输入邮箱!',
                            },
                            {
                                type: 'email',
                                message: '请输入正确的邮箱格式!'
                            },
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="请输入邮箱"
                            size="large"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码!',
                            },
                            {
                                min: 6,
                                message: '密码长度至少为 6 位!',
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="请输入密码"
                            size="large"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>记住我</Checkbox>
                        </Form.Item>

                        <a className="login-form-forgot" href="">
                            忘记密码
                        </a>
                        <a className="login-form-forgot" href="">马上注册</a>
                    </Form.Item>

                    <Form.Item>
                        {/*<Button type="primary" htmlType="submit" className="login-form-button" size="large" onClick={() => loginToHome()}>
                            登陆
                        </Button>*/}
                        <Button type="primary" htmlType="submit" className="login-form-button" size="large" onClick={showModal}>
                            登陆
                        </Button>
                        <Modal title="滑动完成验证" width="600px" open={isModalOpen} onCancel={handleCancel} footer={null}>
                            <Vert/>
                        </Modal>
                        <br/><br/>
                        <div className="quick_login_place">
                            快捷登陆&nbsp;<QqOutlined className="quick_logo"/><WechatOutlined className="quick_logo"/>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}