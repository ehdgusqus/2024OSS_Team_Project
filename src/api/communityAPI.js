// src/api/communityAPI.js
export const fetchCommunities = async () => {
    const response = await fetch('https://6707ed888e86a8d9e42d8057.mockapi.io/api/oss/community');
    if (!response.ok) {
        throw new Error('커뮤니티 데이터를 가져오는 데 실패했습니다.');
    }
    return response.json();
};
