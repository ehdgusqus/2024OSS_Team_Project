import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Loader from '../Common/Loader';
import "../../../css/Goal.css" 

const EditGoal = () => {
    const navigate = useNavigate();
    const createGoalApi = "https://66ff38202b9aac9c997e8f49.mockapi.io/api/oss/goals"; // 올바른 API URL
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [goal, setGoal] = useState({
        name: "",
        description: "",
        start_date: "",
        end_date: "",
        progress: "0",
        completed: false
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setGoal((prevGoal) => ({
            ...prevGoal,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(createGoalApi, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(goal),
            });

            if (response.ok) {
                console.log('목표가 성공적으로 수정되었습니다.');
                setGoal({
                    name: "",
                    description: "",
                    start_date: "",
                    end_date: "",
                    completed: false
                });
                navigate('/show-goal');
            } else {
                console.error('목표 수정에 실패했습니다.');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='goal-form'>
            <div className='heading'>
                {isLoading && <Loader />}
                {error && <p>Error: {error}</p>}
                <p>목표 수정</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">제목</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={goal.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3 mt-3">
                    <label>설명</label>
                    <textarea
                        className="form-control"
                        name="description"
                        value={goal.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3 mt-3">
                    <label>시작일</label>
                    <input
                        type="date"
                        className="form-control"
                        name="start_date"
                        value={goal.start_date}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3 mt-3">
                    <label>종료일</label>
                    <input
                        type="date"
                        className="form-control"
                        name="end_date"
                        value={goal.end_date}
                        onChange={handleInputChange}
                        required
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
                <div className="mb-3">
                    <label>완료 여부</label>
                    <input
                        type="checkbox"
                        name="completed"
                        checked={goal.completed}
                        onChange={(e) => setGoal((prevGoal) => ({
                            ...prevGoal,
                            completed: e.target.checked
                        }))}
                    />
                </div>
                <button type="submit" className="btn btn-primary submit-btn">저장</button>
            </form>
        </div>
    );
};

export default EditGoal;