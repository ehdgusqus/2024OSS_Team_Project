import React, { useState, useEffect } from 'react';
import '../../../css/ShowCommunity.css';
import { useNavigate } from 'react-router-dom';
import Loader from '../Common/Loader';

const ShowCommunity = () => {
    const navigate = useNavigate();
    const [communities, setCommunities] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCommunities = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('https://6707ed888e86a8d9e42d8057.mockapi.io/api/oss/community');
                if (!response.ok) throw new Error('커뮤니티 데이터를 불러오는 데 실패했습니다.');
                const data = await response.json();
                const updatedCommunities = data.map(community => {
                    const overallProgress = calculateOverallProgress(community);
                    return {
                        ...community,
                        progress: overallProgress,
                    };
                });
    
                setCommunities(updatedCommunities);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchCommunities();
    }, []);

    const filteredCommunities = communities.filter(community =>
        community.participants.some(participant =>
            participant.user_id && participant.user_id.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );


    const handleCommunityClick = (goal_id) => {
        navigate(`/community/${goal_id}`);
    };

    const calculateOverallProgress = (community) => {
        if (community.participants.length === 0) return 0;
        const totalProgress = community.participants.reduce((total, participant) => total + participant.progress, 0);
        return totalProgress / community.participants.length;
    };

    return (
        <div className="community-container">
            <h2>Communities</h2>
            <input
                type="text"
                className="search-input"
                placeholder="사용자 ID로 검색"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="community-list">
                {filteredCommunities.length > 0 ? filteredCommunities.map((community) => (
                    <div
                        className="community-item community-columns"
                        key={community.goal_id}
                        onClick={() => handleCommunityClick(community.goal_id)}
                    >
                        <div className='contents'>
                            <h3>{community.goal_name}</h3>
                            <p>{community.goal_description}</p>
                            <ul>
                                {community.participants.map((participant, index) => (
                                    <li key={index}>
                                        {participant.user_id} - 진행률: {participant.progress}%
                                    </li>
                                ))}
                            </ul>
                            <div>
                                <span className="community-progress">전체 진행률: {community.progress}%</span>
                            </div>
                            <p>기간: {community.start_date} ~ {community.end_date}</p>
                        </div>
                    </div>
                )) : (
                    <p>검색 결과가 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default ShowCommunity;
