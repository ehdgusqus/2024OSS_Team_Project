import React, { useState, useEffect } from 'react';
import '../../../css/CreateCommunity.css';
import { useNavigate } from 'react-router-dom';

const CreateCommunity = () => {
    const navigate = useNavigate();
    const [userIdSearch, setUserIdSearch] = useState('');
    const [userResults, setUserResults] = useState([]);
    const [selectedParticipants, setSelectedParticipants] = useState([]);
    const [communityName, setCommunityName] = useState('');
    const [communityDescription, setCommunityDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('https://6707ed888e86a8d9e42d8057.mockapi.io/api/oss/users');
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('사용자 데이터 로드 실패', error);
            }
        };

        fetchUsers();
    }, []);

    const handleSearch = () => {
        if (userIdSearch.trim() === '') return;

        setIsLoading(true);
        const filteredUsers = users.filter((user) =>
            user.user_id && user.user_id.includes(userIdSearch)
        );

        setUserResults(filteredUsers);
        setIsLoading(false);
    };

    const handleAddParticipant = (userId) => {
        if (!selectedParticipants.some((participant) => participant.user_id === userId)) {
            setSelectedParticipants([...selectedParticipants, { user_id: userId, progress: 0 }]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newCommunity = {
            goal_name: communityName,
            goal_description: communityDescription,
            progress: 0,
            completed: false,
            participants: selectedParticipants,
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

            <div>
                <label>참여자 검색</label>
                <input
                    type="text"
                    value={userIdSearch}
                    onChange={(e) => setUserIdSearch(e.target.value)}
                    placeholder="사용자 ID로 검색"
                />
                <button onClick={handleSearch} disabled={isLoading}>
                    {isLoading ? '검색 중...' : '검색'}
                </button>
            </div>

            {userResults.length > 0 && (
                <div className="user-results">
                    <h3>검색된 사용자</h3>
                    <ul>
                        {userResults.map((user) => (
                            <li key={user.user_id}>
                                {user.user_id} <button onClick={() => handleAddParticipant(user.user_id)}>참여자로 추가</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div>
                <h3>참여자 목록</h3>
                <ul>
                    {selectedParticipants.map((participant, index) => (
                        <li key={index}>{participant.user_id}</li>
                    ))}
                </ul>
            </div>

            <div className='btns'>
                <button type="button" className="btn-cancel" onClick={() => navigate('/show-community')}>취소</button>

                <button className="btn-create" onClick={handleSubmit}>커뮤니티 생성</button>
            </div>
        </div>
    );
};

export default CreateCommunity;
