import React from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import axios from 'axios';

const { Title } = Typography;

const SignupPage = () => {
  const onFinish = async (values) => {
    const { email, password, name } = values;

    try {
      // mockAPI에 유저 데이터를 추가
      const response = await axios.post('https://mockapi.io/your-endpoint/users', {
        email,
        password,
        name,
      });

      if (response.status === 201) {
        message.success('회원가입 성공!');
        // 회원가입 성공 후 추가 작업 (예: 로그인 페이지로 이동)
      } else {
        message.error('회원가입에 실패했습니다.');
      }
    } catch (error) {
      console.error('API 요청 에러:', error);
      message.error('회원가입 중 오류가 발생했습니다.');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="signup-container">
      <Title level={2} className="signup-title">
        회원가입
      </Title>

      <Form
        name="signupForm"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="signup-form"
      >
        <Form.Item
          label="이름"
          name="name"
          rules={[{ required: true, message: '이름을 입력하세요!' }]}
        >
          <Input placeholder="이름을 입력하세요" />
        </Form.Item>

        <Form.Item
          label="이메일"
          name="email"
          rules={[{ required: true, message: '이메일을 입력하세요!' }]}
        >
          <Input placeholder="이메일을 입력하세요" />
        </Form.Item>

        <Form.Item
          label="비밀번호"
          name="password"
          rules={[{ required: true, message: '비밀번호를 입력하세요!' }]}
        >
          <Input.Password placeholder="비밀번호를 입력하세요" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            회원가입
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignupPage;
