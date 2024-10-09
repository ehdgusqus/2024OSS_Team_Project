import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Typography, message } from 'antd';
import axios from 'axios'; // axios로 mockAPI와 통신
import '../css/MainContent.css';

const { Title, Text } = Typography;

const MainContent = () => {
    const onFinish = async (values) => {
        const { email, password } = values;

        try {
            // mockAPI에서 유저 데이터를 가져옴
            const response = await axios.get('https://mockapi.io/your-endpoint/users'); // 실제 mockAPI URL로 변경
            const users = response.data;

            // 이메일과 비밀번호가 일치하는 유저 찾기
            const user = users.find(user => user.email === email && user.password === password);

            if (user) {
                message.success('로그인 성공!');
                // 로그인 성공 후 추가 작업 (예: 페이지 이동)
            } else {
                message.error('이메일 또는 비밀번호가 일치하지 않습니다.');
            }
        } catch (error) {
            console.error('API 요청 에러:', error);
            message.error('로그인 중 오류가 발생했습니다.');
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    // 구글 로그인 핸들러
    const handleGoogleLogin = () => {
        console.log('구글로 로그인 시도 중...');
    };

    // 네이버 로그인 핸들러
    const handleNaverLogin = () => {
        console.log('네이버로 로그인 시도 중...');
    };

    return (
        <main className="first-page-content">
            <div className="content-container">
                <Title level={2} className="first-page-title">
                    Welcome to EcoHabit!
                </Title>

                <Form
                    name="loginForm"
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    className="first-page-form"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: '이메일을 입력하세요!' }]}
                    >
                        <Input placeholder="Enter Email" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: '비밀번호를 입력하세요!' }]}
                    >
                        <Input.Password placeholder="Enter Password" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Login
                        </Button>
                    </Form.Item>
                </Form>

                {/* 소셜 로그인 버튼 */}
                <div className="social-login-buttons">
                    <Button
                        type="default"
                        onClick={handleGoogleLogin}
                        block
                        className="social-login google-login"
                        style={{ backgroundColor: '#ffffff', color: '#000000' }}
                    >
                        <img
                            src="/google-g-icon.svg" // 구글 아이콘 경로 확인
                            alt="Google"
                            className="google-icon"
                            style={{ marginRight: '10px' }}
                        />
                        Google
                    </Button>

                    <Button
                        type="default"
                        onClick={handleNaverLogin}
                        block
                        className="social-login naver-login"
                        style={{ backgroundColor: '#03C75A', color: '#ffffff' }}
                    >
                        <span className="naver-icon" style={{ marginRight: '10px', fontWeight: 'bold', fontSize: '18px' }}>
                            N
                        </span>
                        Naver
                    </Button>
                </div>

                {/* Sign Up 버튼으로 변경 */}
                <div className="signup-link">
                    <Text><Link to="/signup">
                        <Button type="default" block className="signup-button" style={{ marginTop: '20px' }}>
                            Sign Up
                        </Button>
                    </Link></Text>
                </div>
            </div>
        </main>
    );
};

export default MainContent;
