import {LockOutlined, SafetyCertificateOutlined, UserOutlined, QqOutlined, WechatOutlined} from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Divider} from 'antd'
import './index.css'

export default function Index() {
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

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
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: '请输入邮箱!',
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
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="请输入密码"
                            size="large"
                        />
                    </Form.Item>
                    <Form.Item
                        name="safecode"
                        rules={[
                            {
                                required: true,
                                message: '请输入验证码!',
                            },
                        ]}
                    >
                        <Input
                            rootClassName="short_input"
                            prefix={<SafetyCertificateOutlined className="site-form-item-icon" />}
                            placeholder="请输入验证码"
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
                        <Button type="primary" htmlType="submit" className="login-form-button" size="large">
                            登陆
                        </Button>
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