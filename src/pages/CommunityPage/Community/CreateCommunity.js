// src/pages/CreateCommunity.js
import React, { useState } from 'react';
import '../../../css/CreateCommunity.css';
import { useNavigate } from 'react-router-dom';

const CreateCommunity = () => {
    const navigate = useNavigate();
    const [creator, setCreator] = useState('');
    const [participant, setParticipant] = useState('');
    const [communityName, setCommunityName] = useState('');
    const [communityDescription, setCommunityDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newCommunity = {
            goal_name: communityName,
            goal_description: communityDescription,
            progress: 0,
            completed: false,
            creator_id: creator,
            participants: participant.split(','), 
            start_date: startDate,
            end_date: endDate,
        };

        try {
            const response = await fetch('https://6707ed888e86a8d9e42d8057.mockapi.io/api/oss/community', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCommunity),
            });

            if (response.ok) {
                navigate('/show-community');
            } else {
                console.error('커뮤니티 생성 실패');
            }
        } catch (error) {
            console.error("커뮤니티 생성 실패", error);
        }
    };

    return (
        <div className="create-community-container">
            <h2>Community 추가</h2>
            <form onSubmit={handleSubmit}>
                <label>Community 이름</label>
                <input
                    type="text"
                    value={communityName}
                    onChange={(e) => setCommunityName(e.target.value)}
                    placeholder="커뮤니티 이름"
                    required
                />
                <label>설명</label>
                <textarea
                    value={communityDescription}
                    onChange={(e) => setCommunityDescription(e.target.value)}
                    placeholder="커뮤니티 설명"
                    required
                ></textarea>
                <label>시작일</label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                />
                <label>종료일</label>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                />
                <label>설립자</label>
                <input
                    type="text"
                    value={creator}
                    onChange={(e) => setCreator(e.target.value)}
                    placeholder="커뮤니티 설립자"
                    required
                />
                <label>참여자</label>
                <input
                    type="text"
                    value={participant}
                    onChange={(e) => setParticipant(e.target.value)}
                    placeholder="','로 참여자 구분"
                    required
                />
                <div className='btns'>
                    <button type="button" className="btn-cancel" onClick={() => navigate('/show-community')}>취소</button>
                    <button className="btn-create" type="submit">커뮤니티 생성</button>
                </div>
            </form>
        </div>
    );
};

export default CreateCommunity;
