import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../Common/Loader';
import "../../../css/ShowGoal.css";
import { PlusCircleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const ShowGoal = () => {
    const navigate = useNavigate();
    const [goals, setGoals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGoals = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('https://66ff38202b9aac9c997e8f49.mockapi.io/api/oss/goals');
                if (!response.ok) throw new Error('목표 데이터를 불러오는 데 실패했습니다.');
                const data = await response.json();
                setGoals(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchGoals();
    }, []);

    const handleGoalClick = (id) => {
        navigate(`/goal/${id}`); // 상세 페이지로 이동
    };

    const handleDeleteClick = async (id) => {
        const confirmDelete = window.confirm("이 목표를 삭제하시겠습니까?");
        if (confirmDelete) {
            try {
                const response = await fetch(`https://66ff38202b9aac9c997e8f49.mockapi.io/api/oss/goals/${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    setGoals(goals.filter(goal => goal.id !== id)); // 삭제된 목표 제외
                    alert('목표가 삭제되었습니다.');
                } else {
                    throw new Error('목표 삭제에 실패했습니다.');
                }
            } catch (error) {
                alert(error.message);
            }
        }
    };

    const completedGoals = goals.filter((goal) => goal.completed);
    const inProgressGoals = goals.filter((goal) => !goal.completed);

    return (
        <div className="show-goals">
            {isLoading && <Loader />}
            {error && <p className="error-message">Error: {error}</p>}
            <h2>Goals</h2>
            <div className='goals-list'>
                <div className="add-goal" onClick={() => navigate('/create-goal')} style={{ cursor: 'pointer', marginBottom: '20px' }}>
                    <PlusCircleOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
                    <span style={{ marginLeft: '10px' }}>목표 추가하기</span>
                </div>
                {inProgressGoals.length > 0 && (
                    <div className="in-progress-goals">
                        <div className="goal-list">
                            {inProgressGoals.map((goal) => (
                                <div
                                    className="goal-item"
                                    key={goal.id}
                                    style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                                >
                                    <div className="goal-details" onClick={() => handleGoalClick(goal.id)}>
                                        <h3>{goal.name}</h3>
                                        <p>{goal.description}</p>
                                    </div>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <EditOutlined onClick={() => navigate(`/edit-goal/${goal.id}`)} style={{ color: 'blue', cursor: 'pointer' }} />
                                        <DeleteOutlined onClick={() => handleDeleteClick(goal.id)} style={{ color: 'red', cursor: 'pointer' }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {completedGoals.length > 0 && (
                    <div className="completed-goals">
                        <div className="goal-list">
                            {completedGoals.map((goal) => (
                                <div
                                    className="goal-item"
                                    key={goal.id}
                                    style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                                >
                                    <div className="goal-details" onClick={() => handleGoalClick(goal.id)}>
                                        <h3>{goal.name}</h3>
                                        <p>{goal.description}</p>
                                    </div>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <EditOutlined onClick={() => navigate(`/edit-goal/${goal.id}`)} style={{ color: 'blue', cursor: 'pointer' }} />
                                        <DeleteOutlined onClick={() => handleDeleteClick(goal.id)} style={{ color: 'red', cursor: 'pointer' }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShowGoal;
