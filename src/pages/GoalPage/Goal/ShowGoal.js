import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../Common/Loader';
import "../../../css/ShowGoal.css" 

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

    const handleUpdate = (updatedGoal) => {
        setGoals((prevGoals) =>
            prevGoals.map((goal) => (goal.id === updatedGoal.id ? updatedGoal : goal))
        );
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`https://66ff38202b9aac9c997e8f49.mockapi.io/api/oss/goals/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('목표를 삭제하는 데 실패했습니다.');
            setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== id));
        } catch (error) {
            setError(error.message);
        }
    };

    const handleGoalClick = (id) => {
        navigate(`/goal/${id}`);
    };

    return (
        <div className="show-goals">
            {isLoading && <Loader />}
            {error && <p className="error-message">Error: {error}</p>}
            <h2>목표 목록</h2>
            <div className="goal-list">
                {goals.map((goal) => (
                    <div className="goal-item">
                        <div className="goal-details" key={goal.id} onClick={() => handleGoalClick(goal.id)}
                        style={{ cursor: 'pointer' }}>
                            <h3>{goal.name}</h3>
                            <p>{goal.description}</p>
                        </div>
                        {/* 목표 기간 */}
                        <div className="goal-dates">
                            <span>기간: {goal.start_date} ~ {goal.end_date}</span>
                        </div>
                        <div className="goal-status">
                            <div className="goal-status-left">
                                {/* 완료 여부 체크박스 */}
                                <input
                                    type="checkbox"
                                    checked={goal.completed}
                                    onChange={() => handleUpdate({ ...goal, completed: !goal.completed, progress: goal.completed ? 0 : 100 })}
                                />
                                {goal.completed && <span className="checkmark">✔</span>}
                                {/* 진행률 표시 */}
                                <span className="progress">{goal.completed ? '100% 완료' : `${goal.progress}% 진행 중`}</span>
                            </div>

                        </div>
                        <div className="goal-actions">
                            <button className='btn-view' onClick={() => navigate(`/goal/${goal.id}`)}>상세보기</button>
                            <button className='btn-edit' onClick={() => navigate(`/edit-goal/${goal.id}`)}>수정</button>
                            <button className='btn-delete' onClick={() => handleDelete(goal.id)}>삭제</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShowGoal;
