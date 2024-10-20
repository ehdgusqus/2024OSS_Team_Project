import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../Common/Loader';
import "../../../css/Goal.css";

const Goal = () => {
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
    }, [fetchGoal]); 
    

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
                    navigate('/goals'); // 삭제 후 목록 페이지로 이동
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
            <h3>{goal.name}</h3>
            <p><strong>설명:</strong> {goal.description}</p>
            <p><strong>시작일:</strong> {goal.start_date}</p>
            <p><strong>종료일:</strong> {goal.end_date}</p>
            <p><strong>완료 여부:</strong> {goal.completed ? "완료" : "진행 중"}</p>
            {goal.completed && (
                <p><strong>진행률:</strong> {goal.progress}%</p>
            )}
            <div className="btns">
                <button onClick={() => navigate('/goals')} className="btn-go-list">목록으로 이동</button>
            </div>
        </div>
    );
};

export default Goal;
