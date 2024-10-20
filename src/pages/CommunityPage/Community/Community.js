// src/pages/Community.js
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Loader from '../Common/Loader';
import '../../../css/Community.css';

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
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setCommunity({ ...originalCommunity });
        setIsEditing(false);
    };

    const handleSaveClick = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`https://6707ed888e86a8d9e42d8057.mockapi.io/api/oss/community/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(community),
            });

            if (response.ok) {
                console.log('커뮤니티가 성공적으로 수정되었습니다.');
                setIsEditing(false);
            } else {
                console.error('커뮤니티 수정에 실패했습니다.');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
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
                    console.log('커뮤니티가 삭제되었습니다.');
                    navigate('/show-community');
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
            {isEditing ? (
                <>
                    <div>
                        <label>제목</label>
                        <input
                            type="text"
                            name="goal_name"
                            value={community.goal_name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>설명</label>
                        <textarea
                            name="goal_description"
                            value={community.goal_description}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>시작일</label>
                        <input
                            type="date"
                            name="start_date"
                            value={community.start_date}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>종료일</label>
                        <input
                            type="date"
                            name="end_date"
                            value={community.end_date}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>설립자</label>
                        <input
                            type="text"
                            name="creator_id"
                            value={community.creator_id}
                            onChange={handleInputChange}
                        />
                        <label>참여자</label>
                        <input
                            type="text"
                            name="participants"
                            value={community.participants}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>완료 여부</label>
                        <input
                            type="checkbox"
                            name="completed"
                            checked={community.completed}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>진행률:</label>
                        <input
                            type="number"
                            name="progress"
                            value={community.progress}
                            onChange={handleInputChange}
                            min="0"
                            max="100"
                            disabled={community.completed}
                        />
                    </div>
                    <div className='edit-btns'>
                        <button onClick={handleCancelClick} className="btn-cancel">취소</button>
                        <button onClick={handleSaveClick} className="btn-save">저장</button>
                    </div>
                </>
            ) : (
                <>
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
                        <Link to="/show-community" className="back-link">목록 보기</Link>
                        <div className="btns-edit">
                            <button onClick={handleEditClick} className="btn-edit">수정</button>
                            <button onClick={handleDeleteClick} className="btn-delete">삭제</button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Community;
