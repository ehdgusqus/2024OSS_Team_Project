// src/pages/Community/Community.js
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Loader from '../Common/Loader';
import '../../../css/Community.css';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const Community = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [community, setCommunity] = useState(null);
    const [originalCommunity, setOriginalCommunity] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCommunity = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`https://6707ed888e86a8d9e42d8057.mockapi.io/api/oss/community/${id}`);
            if (!response.ok) throw new Error('커뮤니티 데이터를 불러오는 데 실패했습니다.');
            const data = await response.json();
            setCommunity(data);
            setOriginalCommunity({ ...data });
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCommunity();
    }, [id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCommunity((prevCommunity) => ({
            ...prevCommunity,
            [name]: value,
        }));
    };

    const handleEditClick = () => {
        navigate(`/community/edit/${id}`); // 수정 페이지로 이동
    };

    const handleDeleteClick = async () => {
        const confirmDelete = window.confirm("이 커뮤니티를 삭제하시겠습니까?");
        if (confirmDelete) {
            try {
                setIsLoading(true);
                const response = await fetch(`https://6707ed888e86a8d9e42d8057.mockapi.io/api/oss/community/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    navigate('/show-community'); // 삭제 후 목록 페이지로 이동
                } else {
                    console.error('커뮤니티 삭제에 실패했습니다.');
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        }
    };

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <p className="error-message">Error: {error}</p>;
    }

    if (!community) {
        return <p>커뮤니티 데이터를 찾을 수 없습니다.</p>;
    }

    return (
        <div className="community-detail">
            <h1>Community 정보</h1>
            <h3>{community.goal_name}</h3>
            <p><strong>설명:</strong> {community.goal_description}</p>
            <p><strong>시작일:</strong> {community.start_date}</p>
            <p><strong>종료일:</strong> {community.end_date}</p>
            <p><strong>설립자:</strong> {community.creator_id}</p>
            <p><strong>참여자:</strong> {community.participants}</p>
            <p><strong>완료 여부:</strong> {community.completed ? "완료됨" : "진행 중"}</p>
            <div className="community-progress">
                <p>진행률: {community.progress}%</p>
                <div className="progress-bar">
                    <div
                        className="progress-bar-fill"
                        style={{
                            width: `${community.progress}%`,
                            backgroundColor: '#4caf50',
                            height: '20px',
                            borderRadius: '5px',
                        }}
                    />
                </div>
            </div>

            <div className="btns">
                <div className="btn-show">
                    <Link to="/show-community" className="back-link">목록 보기</Link>
                </div>
                <div className="btns-edit">
                    <EditOutlined
                        onClick={handleEditClick}
                        style={{ color: 'blue', fontSize: '24px', marginRight: '10px', cursor: 'pointer' }}
                    />
                    <DeleteOutlined
                        onClick={handleDeleteClick}
                        style={{ color: 'red', fontSize: '24px', cursor: 'pointer' }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Community;
