import React, { useState, useEffect } from 'react';
import '../../../css/ShowCommunity.css';
import { useNavigate } from 'react-router-dom';
import Loader from '../Common/Loader';
import { PlusCircleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

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
                setCommunities(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCommunities();
    }, []);

    const filteredCommunities = communities.filter(community =>
        community.participants && community.participants.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleCommunityClick = (id) => {
        navigate(`/community/${id}`); // 상세 페이지로 이동
    };

    const handleEditClick = (id) => {
        navigate(`/edit-community/${id}`); // 수정 페이지로 이동
    };

    const handleDeleteClick = async (id) => {
        const confirmDelete = window.confirm("이 커뮤니티를 삭제하시겠습니까?");
        if (confirmDelete) {
            try {
                const response = await fetch(`https://6707ed888e86a8d9e42d8057.mockapi.io/api/oss/community/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    setCommunities(communities.filter(community => community.id !== id)); // 리스트에서 삭제
                    alert('커뮤니티가 삭제되었습니다.');
                } else {
                    console.error('커뮤니티 삭제에 실패했습니다.');
                }
            } catch (error) {
                console.error(error.message);
            }
        }
    };

    return (
        <div className="community-container">
            <h2>Communities</h2>
            {isLoading && <Loader />}
            {error && <p className="error-message">Error: {error}</p>}
            <input
                type="text"
                className="search-input"
                placeholder="사용자 ID로 검색"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="add-community" onClick={() => navigate('/create-community')} style={{ cursor: 'pointer', marginBottom: '20px' }}>
                <PlusCircleOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
                <span style={{ marginLeft: '10px' }}>커뮤니티 추가하기</span>
            </div>
            <div className="community-list">
                {filteredCommunities.length > 0 ? filteredCommunities.map((community) => (
                    <div
                        className="community-item"
                        key={community.id}
                        onClick={() => handleCommunityClick(community.id)} // 클릭 시 상세 페이지로 이동
                    >
                        <div className='contents'>
                            <h3>{community.goal_name}</h3>
                            <p>{community.goal_description}</p>
                            <p>[Creator] {community.creator_id}</p>
                            <p>[Members] {community.participants}</p>
                            <div>
                                <span className="community-progress">{community.progress}% 진행중</span>
                            </div>
                            <p>기간: {community.start_date} ~ {community.end_date}</p>
                        </div>
                        <div className="action-icons">
                            <EditOutlined 
                                onClick={(e) => { e.stopPropagation(); handleEditClick(community.id); }} 
                                style={{ color: 'blue', fontSize: '20px', marginRight: '10px', cursor: 'pointer' }} 
                            />
                            <DeleteOutlined 
                                onClick={(e) => { e.stopPropagation(); handleDeleteClick(community.id); }} 
                                style={{ color: 'red', fontSize: '20px', cursor: 'pointer' }} 
                            />
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
