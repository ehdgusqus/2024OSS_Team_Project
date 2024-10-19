import React from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import axios from 'axios';

const { Title } = Typography;

const ActivityForm = () => {
    const onFinish = async (values) => {
        const { activity_type, date, impact_score } = values;

        try {
            await axios.post('https://670367bbbd7c8c1ccd414d3f.mockapi.io/api/oss_Data/activity', {
                activity_type,
                date,
                impact_score,
            });
            message.success('활동 기록이 추가되었습니다.');
            // 추가 후 메인 페이지로 리다이렉트
            window.location.href = '/'; // 메인 페이지로 이동
        } catch (error) {
            console.error('API 요청 에러:', error);
            message.error('활동 기록 추가 중 오류가 발생했습니다.');
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div style={{ padding: '20px' }}>
            <Title level={2}>활동 기록 추가</Title>
            <Form
                name="activityForm"
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed
                }
                style={{ maxWidth: '400px' }} // 폼 최대 너비 설정
            >
                <Form.Item
                    label="활동 타입"
                    name="activity_type"
                    rules={[{ required: true, message: '활동 타입을 입력하세요!' }]}
                >
                    <Input placeholder="활동 타입 입력" />
                </Form.Item>

                <Form.Item
                    label="날짜"
                    name="date"
                    rules={[{ required: true, message: '날짜를 입력하세요!' }]}
                >
                    <Input type="date" />
                </Form.Item>

                <Form.Item
                    label="Impact Score"
                    name="impact_score"
                    rules={[{ required: true, message: 'Impact Score를 입력하세요!' }]}
                >
                    <Input placeholder="Impact Score 입력" type="number" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        추가하기
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ActivityForm;
