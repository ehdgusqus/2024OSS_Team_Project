import React, { useEffect, useState } from 'react';
import { Button, Table, Form, Input, message } from 'antd';
import { fetchUsers, createUser, updateUser, deleteUser } from '../api/userAPI'; // API 호출 함수

const UserManagement = ({ setSelectedUserId }) => {
    const [users, setUsers] = useState([]);
    const [form] = Form.useForm();
    const [editingUserId, setEditingUserId] = useState(null); // 편집 중인 사용자 ID

    useEffect(() => {
        loadUsers();
    }, []); // 빈 배열로 설정하여 컴포넌트가 마운트될 때만 호출

    const loadUsers = async () => {
        try {
            const userData = await fetchUsers(); // mockAPI에서 사용자 데이터 가져오기
            setUsers(userData);
        } catch (error) {
            message.error('사용자 데이터를 가져오는 중 오류가 발생했습니다.');
            console.error(error);
        }
    };

    const onFinish = async (values) => {
        try {
            if (editingUserId) {
                await updateUser(editingUserId, values); // 수정 시 id 사용
                message.success('사용자 정보 수정 성공!');
                setEditingUserId(null); // 편집 모드 종료
            } else {
                await createUser(values); // 사용자 생성
                message.success('사용자 생성 성공!');
            }
            form.resetFields();
            loadUsers(); // 사용자 목록 갱신
        } catch (error) {
            message.error('사용자 처리 중 오류가 발생했습니다!');
            console.error(error);
        }
    };

    const handleEdit = (userId) => {
        const user = users.find((u) => u.id === userId); // id로 사용자 찾기
        if (user) {
            form.setFieldsValue(user);
            setEditingUserId(userId); // 편집 중인 사용자 ID 설정
        } else {
            message.error('사용자를 찾을 수 없습니다.');
        }
    };

    const handleDelete = async (userId) => {
        try {
            await deleteUser(userId); // 사용자 삭제
            message.success('사용자 삭제 성공!');
            loadUsers(); // 사용자 목록 갱신
        } catch (error) {
            message.error('사용자 삭제 실패!');
            console.error(error);
        }
    };

    const handleSelectUser = (userId) => {
        setSelectedUserId(userId); // 선택된 유저 ID를 설정
        // 메인 페이지로 이동 (선택 후)
    };

    return (
        <div>
            <Form form={form} layout="inline" onFinish={onFinish}>
                <Form.Item name="user_id" rules={[{ required: true, message: '사용자 ID를 입력하세요!' }]}>
                    <Input placeholder="사용자 ID" />
                </Form.Item>
                <Form.Item name="name" rules={[{ required: true, message: '이름을 입력하세요!' }]}>
                    <Input placeholder="이름" />
                </Form.Item>
                <Form.Item name="email" rules={[{ required: true, message: '이메일을 입력하세요!' }]}>
                    <Input placeholder="이메일" />
                </Form.Item>
                <Form.Item name="location">
                    <Input placeholder="위치" />
                </Form.Item>
                <Form.Item name="eco_score" rules={[{ required: true, message: 'Eco Score를 입력하세요!' }]}>
                    <Input placeholder="Eco Score" type="number" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">{editingUserId ? '수정하기' : '사용자 생성'}</Button>
                </Form.Item>
            </Form>

            <Table dataSource={users} rowKey="id"> {/* id 사용 */}
                <Table.Column title="사용자 ID" dataIndex="id" /> {/* 'user_id'에서 'id'로 수정 */}
                <Table.Column title="이름" dataIndex="name" />
                <Table.Column title="이메일" dataIndex="email" />
                <Table.Column title="위치" dataIndex="location" />
                <Table.Column title="Eco Score" dataIndex="eco_score" />
    
                <Table.Column
                    title="작업"
                    render={(text, record) => (
                        <>
                            <Button onClick={() => handleEdit(record.id)}>수정</Button> {/* id 사용 */}
                            <Button onClick={() => handleDelete(record.id)} danger>삭제</Button> {/* id 사용 */}
                            <Button onClick={() => handleSelectUser(record.id)}>선택</Button> {/* id 사용 */}
                        </>
                    )}
                />
            </Table>
        </div>
    );
};

export default UserManagement;
