import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Typography, message } from 'antd';
import axios from 'axios'; // axios로 mockAPI와 통신
import '../css/MainContent.css';

const { Title, Text } = Typography;

const MainContent = () => {
    const [users, setUsers] = useState([]); // 사용자 데이터를 저장할 상태

    useEffect(() => {
        // 컴포넌트가 마운트될 때 API 호출
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://mockapi.io/your-endpoint/users');
                setUsers(response.data); // 받은 데이터를 상태에 저장
            } catch (error) {
                console.error('API 요청 에러:', error);
                message.error('사용자 데이터를 가져오는 중 오류가 발생했습니다.');
            }
        };

        fetchUsers(); // 함수 호출
    }, []); // 빈 배열을 전달하여 컴포넌트가 처음 마운트될 때만 호출

    const onFinish = async (values) => {
        const { email, password } = values;

        // 이메일과 비밀번호가 일치하는 유저 찾기
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            message.success('로그인 성공!');
            // 로그인 성공 후 추가 작업 (예: 페이지 이동)
        } else {
            message.error('이메일 또는 비밀번호가 일치하지 않습니다.');
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
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
                        onClick={() => console.log('구글로 로그인 시도 중...')}
                        block
                        className="social-login google-login"
                    >
                        <img
                            src="/google-g-icon.svg"
                            alt="Google"
                            className="google-icon"
                        />
                        Google
                    </Button>

                    <Button
                        type="default"
                        onClick={() => console.log('네이버로 로그인 시도 중...')}
                        block
                        className="social-login naver-login"
                    >
                        <span className="naver-icon">
                            N
                        </span>
                        Naver
                    </Button>
                </div>

                <div className="signup-link">
                    <Text><Link to="/signup">
                        <Button 
                            type="default" 
                            block 
                            className="signup-button" 
                        >
                            Sign Up
                        </Button>
                    </Link></Text>
                </div>
            </div>
        </main>
    );
};

export default MainContent;
