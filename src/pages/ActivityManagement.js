import React, { useEffect, useState } from 'react';
import { Button, Table, Form, Input, message } from 'antd';
import { fetchActivities, createActivity, updateActivity, deleteActivity } from '../api/activityAPI'; // API 호출 함수

const ActivityManagement = () => {
    const [activities, setActivities] = useState([]);
    const [form] = Form.useForm();
    const [editingActivityId, setEditingActivityId] = useState(null); // 현재 수정 중인 활동 ID

    useEffect(() => {
        loadActivities(); // 컴포넌트 마운트 시 활동 목록 로드
    }, []);

    const loadActivities = async () => {
        try {
            const activityData = await fetchActivities(); // mockAPI에서 활동 데이터 가져오기
            setActivities(activityData);
        } catch (error) {
            message.error('활동 데이터를 가져오는 중 오류가 발생했습니다.');
            console.error(error);
        }
    };

    const onFinish = async (values) => {
        try {
            if (editingActivityId) {
                // 수정 처리
                await updateActivity(editingActivityId, { ...values, id: editingActivityId }); // 수정된 데이터 전송
                message.success('활동 기록 수정 성공!');
                setEditingActivityId(null); // 편집 모드 종료
            } else {
                // 새 활동 추가
                await createActivity(values); // mockAPI에 새 활동 추가
                message.success('활동 기록 생성 성공!');
            }
            form.resetFields();
            loadActivities(); // 최신 데이터 로드
        } catch (error) {
            message.error('활동 기록 처리 중 오류가 발생했습니다!');
            console.error(error);
        }
    };

    const handleEdit = (activityId) => {
        const activity = activities.find((a) => a.id === activityId);
        form.setFieldsValue(activity); // 폼에 활동 데이터를 채웁니다.
        setEditingActivityId(activityId); // 편집할 활동 ID 설정
    };

    const handleDelete = async (activityId) => {
        try {
            await deleteActivity(activityId); // 활동 삭제 요청
            message.success('활동 기록 삭제 성공!');
            loadActivities(); // 최신 데이터 로드
        } catch (error) {
            message.error('활동 기록 삭제 실패!');
            console.error(error);
        }
    };

    return (
        <div>
            <Form form={form} layout="inline" onFinish={onFinish}>
                <Form.Item name="activity_type" rules={[{ required: true, message: '활동 종류를 입력하세요!' }]}>
                    <Input placeholder="활동 종류" />
                </Form.Item>
                <Form.Item name="impact_score" rules={[{ required: true, message: '성과 점수를 입력하세요!' }]}>
                    <Input placeholder="성과 점수" />
                </Form.Item>
                <Form.Item name="date" rules={[{ required: true, message: '날짜를 입력하세요!' }]}>
                    <Input placeholder="날짜 (YYYY-MM-DD)" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">{editingActivityId ? '수정하기' : '활동 기록 생성'}</Button>
                </Form.Item>
            </Form>

            <Table dataSource={activities} rowKey="id">
                <Table.Column title="활동 종류" dataIndex="activity_type" />
                <Table.Column title="성과 점수" dataIndex="impact_score" />
                <Table.Column title="날짜" dataIndex="date" />
                <Table.Column
                    title="작업"
                    render={(text, record) => (
                        <>
                            <Button onClick={() => handleEdit(record.id)}>수정</Button>
                            <Button onClick={() => handleDelete(record.id)} danger>삭제</Button>
                        </>
                    )}
                />
            </Table>
        </div>
    );
};

export default ActivityManagement;
