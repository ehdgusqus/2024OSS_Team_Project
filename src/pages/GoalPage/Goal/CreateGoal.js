import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from "react-router-dom";

const CreateGoal = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm(); // Form 상태 초기화
    const [error, setError] = useState('');

    const handleSubmit = async (values) => {
        const { name, description, start_date, end_date } = values;

        if (!name || !description || !start_date || !end_date) {
            setError('모든 필드를 채워주세요.');
            return;
        }

        const newGoal = {
            name,
            description,
            progress: 0,
            start_date,
            end_date,
            completed: false,
        };

        try {
            const response = await fetch('https://66ff38202b9aac9c997e8f49.mockapi.io/api/oss/goals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newGoal),
            });

            if (response.ok) {
                message.success('목표 생성 성공!');
                form.resetFields(); // 폼 필드 초기화
                navigate('/goals'); // 목표 목록으로 이동
            } else {
                throw new Error('목표 생성에 실패했습니다.');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="create-goal" style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
            <h2 style={{ textAlign: 'center' }}>목표 추가</h2>
            {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item label="목표명" name="name" rules={[{ required: true, message: '목표를 입력하세요!' }]}>
                    <Input placeholder="목표를 입력하세요" />
                </Form.Item>
                <Form.Item label="목표 설명" name="description" rules={[{ required: true, message: '목표 설명을 입력하세요!' }]}>
                    <Input.TextArea placeholder="목표에 대한 설명을 입력하세요" />
                </Form.Item>
                <Form.Item label="시작 날짜" name="start_date" rules={[{ required: true, message: '시작 날짜를 선택하세요!' }]}>
                    <Input type="date" />
                </Form.Item>
                <Form.Item label="종료 날짜" name="end_date" rules={[{ required: true, message: '종료 날짜를 선택하세요!' }]}>
                    <Input type="date" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>목표 추가</Button>
                </Form.Item>
                <Form.Item>
                    <Button type="default" style={{ width: '100%' }} onClick={() => navigate('/goals')}>취소</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CreateGoal;
