import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Input, Button, message, Spin } from 'antd'; 
import "../../../css/Goal.css"; 

const GoalEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [goal, setGoal] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchGoal = async () => {
        try {
            const response = await fetch(`https://66ff38202b9aac9c997e8f49.mockapi.io/api/oss/goals/${id}`);
            if (!response.ok) {
                throw new Error('목표 데이터를 불러오는 데 실패했습니다.');
            }
            const data = await response.json();
            setGoal(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchGoal();
    }, [id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setGoal((prevGoal) => ({
            ...prevGoal,
            [name]: value,
        }));
    };

    const handleSaveClick = async () => {
        try {
            const response = await fetch(`https://66ff38202b9aac9c997e8f49.mockapi.io/api/oss/goals/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(goal),
            });

            if (response.ok) {
                message.success('목표가 성공적으로 수정되었습니다.');
                navigate('/goals'); // 목록 페이지로 이동
            } else {
                throw new Error('목표 수정에 실패했습니다.');
            }
        } catch (error) {
            message.error(error.message);
        }
    };

    if (isLoading) {
        return <Spin tip="로딩 중..." />; // 로딩 중일 때 스피너 표시
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!goal) {
        return <p>목표 데이터를 찾을 수 없습니다.</p>;
    }

    return (
        <div className='goal-edit'>
            <h2>목표 수정하기</h2>
            <Form layout="vertical" onFinish={handleSaveClick}>
                <Form.Item label="제목">
                    <Input 
                        name="name" 
                        value={goal.name} 
                        onChange={handleInputChange} 
                        placeholder="목표 제목을 입력하세요" 
                    />
                </Form.Item>
                <Form.Item label="설명">
                    <Input.TextArea 
                        name="description" 
                        value={goal.description} 
                        onChange={handleInputChange} 
                        placeholder="목표 설명을 입력하세요" 
                    />
                </Form.Item>
                <Form.Item label="시작일">
                    <Input 
                        type="date" 
                        name="start_date" 
                        value={goal.start_date} 
                        onChange={handleInputChange} 
                    />
                </Form.Item>
                <Form.Item label="종료일">
                    <Input 
                        type="date" 
                        name="end_date" 
                        value={goal.end_date} 
                        onChange={handleInputChange} 
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">수정 완료</Button>
                </Form.Item>
                <Form.Item>
                    <Button type="default" onClick={() => navigate('/goals')}>취소</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default GoalEdit;
