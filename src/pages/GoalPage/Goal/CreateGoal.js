import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "../../../css/Goal.css" 


const CreateGoal = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !description || !startDate || !endDate) {
            setError('모든 필드를 채워주세요.');
            return;
        }

        const newGoal = {
            name,
            description,
            start_date: startDate,
            end_date: endDate,
            completed: false,  // 기본값으로 완료여부는 false로 설정
        };

        try {
            const response = await fetch('https://66ff38202b9aac9c997e8f49.mockapi.io/api/oss/goals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newGoal),
            });

            if (response.ok) {
                navigate('/show-goal'); // 목표 목록 페이지로 이동
            } else {
                throw new Error('목표 생성에 실패했습니다.');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="create-goal">
            <h2>목표 추가</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>목표명</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="목표를 입력하세요"
                />

                <label>목표 설명</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="목표에 대한 설명을 입력하세요"
                />

                <div className="date-wrapper">
                    <div>
                        <label>시작 날짜</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>종료 날짜</label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <button type="submit" className="btn-submit">목표 추가</button>
                    <button type="button" className="btn-cancel" onClick={() => navigate('/show-goal')}>취소</button>
                </div>
            </form>
        </div>
    );
};

export default CreateGoal;