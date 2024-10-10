import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../Common/Loader';
import "../../../css/Goal.css" 

const EditGoal = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [goal, setGoal] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [originalProgress, setOriginalProgress] = useState(0);

    useEffect(() => {
        const fetchGoal = async () => {
            try {
                const response = await fetch(`https://66ff38202b9aac9c997e8f49.mockapi.io/api/oss/goals/${id}`);
                if (!response.ok) throw new Error('목표 데이터를 불러오는 데 실패했습니다.');
                const data = await response.json();
                setGoal(data);
                setOriginalProgress(data.progress);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchGoal();
    }, [id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setGoal((prevGoal) => ({
            ...prevGoal,
            [name]: value,
            completed: name === "progress" && value === "100" ? true : prevGoal.completed, // 진행률이 100이면 완료로 설정
        }));
    };
    

    const handleCheckboxChange = (event) => {
        const isChecked = event.target.checked;
        setGoal((prevGoal) => ({
            ...prevGoal,
            completed: isChecked,
            progress: isChecked ? 100 : originalProgress,
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
                console.log('목표가 성공적으로 수정되었습니다.');
                navigate('/show-goal');
            } else {
                console.error('목표 수정에 실패했습니다.');
            }
        } catch (error) {
            setError(error.message);
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
        <div className="edit-goal">
            <h2>목표 수정</h2>
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
                    onChange={handleCheckboxChange}
                />
            </div>
            <div>
                <label>진행률</label>
                <input
                    type="number"
                    name="progress"
                    value={goal.progress}
                    onChange={handleInputChange}
                    min="0"
                    max="100"
                    disabled={goal.completed}
                />
            </div>
            <button onClick={handleSaveClick} className="btn-save">저장</button>
        </div>
    );
};

export default EditGoal;
