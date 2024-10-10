import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Loader from '../Common/Loader';
import "../../../css/Goal.css" 

const Goal = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [goal, setGoal] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
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

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`https://66ff38202b9aac9c997e8f49.mockapi.io/api/oss/goals/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(goal),
            });

            if (response.ok) {
                console.log('목표가 성공적으로 수정되었습니다.');
                setIsEditing(false);
            } else {
                console.error('목표 수정에 실패했습니다.');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteClick = async () => {
        const confirmDelete = window.confirm("이 목표를 삭제하시겠습니까?");
        if (confirmDelete) {
            try {
                setIsLoading(true);
                const response = await fetch(`https://66ff38202b9aac9c997e8f49.mockapi.io/api/oss/goals/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    console.log('목표가 삭제되었습니다.');
                    navigate('/show-goal');
                } else {
                    console.error('목표 삭제에 실패했습니다.');
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

    if (!goal) {
        return <p>목표 데이터를 찾을 수 없습니다.</p>;
    }

    return (
        <div className='goal-detail'>
            <h1>목표 상세 정보</h1>
            {isEditing ? (
                <>
                    <div>
                        <label>제목</label>
                        <input
                            type="text"
                            name="name"
                            value={goal.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>설명</label>
                        <textarea
                            name="description"
                            value={goal.description}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>시작일</label>
                        <input
                            type="date"
                            name="start_date"
                            value={goal.start_date}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>종료일</label>
                        <input
                            type="date"
                            name="end_date"
                            value={goal.end_date}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>완료 여부</label>
                        <input
                            type="checkbox"
                            name="completed"
                            checked={goal.completed}
                            onChange={(e) =>
                                setGoal((prevGoal) => ({
                                    ...prevGoal,
                                    completed: e.target.checked,
                                }))
                            }
                        />
                    </div>
                    <div>
                        <label>진행률:</label>
                        <input
                            type="number"
                            name="progress"
                            value={goal.progress}
                            onChange={handleInputChange}
                            min="0"
                            max="100"
                        />
                    </div>
                    <button onClick={handleSaveClick} className="btn-save">저장</button>
                </>
            ) : (
                <>
                    <h3>{goal.name}</h3>
                    <p><strong>설명:</strong> {goal.description}</p>
                    <p><strong>시작일:</strong> {goal.start_date}</p>
                    <p><strong>종료일:</strong> {goal.end_date}</p>
                    <p><strong>완료 여부:</strong></p> {goal.completed ? (
                        <p><strong>완료</strong></p>
                    ) : (
                        <div>
                            <p><strong>진행률:</strong> {goal.progress}%</p>
                            <progress value={goal.progress} max="100"></progress>
                        </div>
                    )}
                    <button onClick={handleEditClick} className="btn-edit">수정</button>
                    <button onClick={handleDeleteClick} className="btn-delete">삭제</button>
                </>
            )}

            <Link to="/show-goal" className="back-link">목록 보기</Link>
        </div>
    );
};

export default Goal;
