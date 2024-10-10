import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../Common/Loader';
import "../../../css/ShowGoal.css";

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

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("이 목표를 삭제하시겠습니까?");
        if (confirmDelete) {
            try {
                setIsLoading(true);
                const response = await fetch(`https://66ff38202b9aac9c997e8f49.mockapi.io/api/oss/goals/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    console.log('목표가 삭제되었습니다.');
                    setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== id));
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

    const handleGoalClick = (id) => {
        navigate(`/goal/${id}`);
    };

    const completedGoals = goals.filter((goal) => goal.completed);
    const inProgressGoals = goals.filter((goal) => !goal.completed);

    return (
        <div className="show-goals">
            {isLoading && <Loader />}
            {error && <p className="error-message">Error: {error}</p>}
            <h2>목표 목록</h2>

            {inProgressGoals.length > 0 && (
                <div className="in-progress-goals">
                    <div className="goal-header">
                        <h3>진행 중인 목표</h3>
                        <div className='add'>
                            <span>목표 추가</span>
                            <img
                                src="./plus_icon.png"
                                className="btn-add"
                                alt="목표 추가"
                                onClick={() => navigate('/create-goal')}
                            />
                        </div>
                    </div>
                    <div className="goal-list">
                        {inProgressGoals.map((goal) => (
                            <div className="goal-item" key={goal.id}>
                                <div className="goal-details" onClick={() => handleGoalClick(goal.id)} style={{ cursor: 'pointer' }}>
                                    <h3>{goal.name}</h3>
                                    <p>{goal.description}</p>
                                </div>
                                <div className="goal-dates">
                                    <span>기간: {goal.start_date} ~ {goal.end_date}</span>
                                </div>
                                <div className="goal-status">
                                    <div className="goal-status-left">
                                        <span className="progress">{goal.progress}% 진행 중</span>
                                    </div>
                                </div>
                                <div className="goal-actions">
                                    <button className="btn-view" onClick={() => navigate(`/goal/${goal.id}`)}>상세보기</button>
                                    <div className="btns-ed">
                                        <button className="btn-edit" onClick={() => navigate(`/edit-goal/${goal.id}`)}>수정</button>
                                        <button className="btn-delete" onClick={() => handleDelete(goal.id)}>삭제</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {completedGoals.length > 0 && (
                <div className="completed-goals">
                    <h3>완료된 목표</h3>
                    <div className="goal-list">
                        {completedGoals.map((goal) => (
                            <div className="goal-item" key={goal.id}>
                                <div className="goal-details" onClick={() => handleGoalClick(goal.id)} style={{ cursor: 'pointer' }}>
                                    <h3>{goal.name}</h3>
                                    <p>{goal.description}</p>
                                </div>
                                <div className="goal-dates">
                                    <span>기간: {goal.start_date} ~ {goal.end_date}</span>
                                </div>
                                <div className="goal-status">
                                    <div className="goal-status-left">
                                        <span className="checkmark">✔</span>
                                        <span className="progress">100% 완료</span>
                                    </div>
                                </div>
                                <div className="goal-actions">
                                    <button className="btn-view" onClick={() => navigate(`/goal/${goal.id}`)}>상세보기</button>
                                    <div className="btns-ed">
                                        <button className="btn-edit" onClick={() => navigate(`/edit-goal/${goal.id}`)}>수정</button>
                                        <button className="btn-delete" onClick={() => handleDelete(goal.id)}>삭제</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShowGoal;