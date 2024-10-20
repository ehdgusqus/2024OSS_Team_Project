// src/pages/Community/CommunityEdit.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import "../../../css/Community.css"; 

const CommunityEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [community, setCommunity] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

  
    useEffect(() => {
        const fetchCommunity = async () => {
            try {
                const response = await fetch(`https://6707ed888e86a8d9e42d8057.mockapi.io/api/oss/community/${id}`);
                if (!response.ok) {
                    throw new Error('커뮤니티 데이터를 불러오는 데 실패했습니다.');
                }
                const data = await response.json();
                setCommunity(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCommunity();
    }, [id]); // id를 의존성으로 추가

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCommunity((prevCommunity) => ({
            ...prevCommunity,
            [name]: value,
        }));
    };

    const handleSaveClick = async () => {
        try {
            const response = await fetch(`https://6707ed888e86a8d9e42d8057.mockapi.io/api/oss/community/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(community),
            });

            if (response.ok) {
                message.success('커뮤니티가 성공적으로 수정되었습니다.');
                navigate('/show-community'); // 목록 페이지로 이동
            } else {
                throw new Error('커뮤니티 수정에 실패했습니다.');
            }
        } catch (error) {
            message.error(error.message);
        }
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!community) {
        return <p>커뮤니티 데이터를 찾을 수 없습니다.</p>;
    }

    return (
        <div className='community-edit'>
            <h2>커뮤니티 수정하기</h2>
            <Form layout="vertical" onFinish={handleSaveClick}>
                <Form.Item label="제목">
                    <Input 
                        name="goal_name" 
                        value={community.goal_name} 
                        onChange={handleInputChange} 
                        placeholder="커뮤니티 제목을 입력하세요" 
                    />
                </Form.Item>
                <Form.Item label="설명">
                    <Input.TextArea 
                        name="goal_description" 
                        value={community.goal_description} 
                        onChange={handleInputChange} 
                        placeholder="커뮤니티 설명을 입력하세요" 
                    />
                </Form.Item>
                <Form.Item label="시작일">
                    <Input 
                        type="date" 
                        name="start_date" 
                        value={community.start_date} 
                        onChange={handleInputChange} 
                    />
                </Form.Item>
                <Form.Item label="종료일">
                    <Input 
                        type="date" 
                        name="end_date" 
                        value={community.end_date} 
                        onChange={handleInputChange} 
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">수정 완료</Button>
                </Form.Item>
                <Form.Item>
                    <Button type="default" onClick={() => navigate('/show-community')}>취소</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CommunityEdit;
