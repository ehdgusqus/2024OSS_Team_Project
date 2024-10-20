import React, { useState, useEffect } from 'react';
import { Card, Row, Col, List } from 'antd';
import { Link } from 'react-router-dom'; 
import { fetchActivities } from '../api/activityAPI'; 
import { fetchGoals } from '../api/goalsAPI'; 
import { fetchCommunities } from '../api/communityAPI'; 
import { PlusCircleOutlined, UserOutlined } from '@ant-design/icons'; 

const MainPage = ({ selectedUserId }) => { 
    const [activities, setActivities] = useState([]);
    const [goals, setGoals] = useState([]);
    const [communities, setCommunities] = useState([]); 
    const [loadingActivities, setLoadingActivities] = useState(true);
    const [loadingGoals, setLoadingGoals] = useState(true);
    const [loadingCommunities, setLoadingCommunities] = useState(true); 

    useEffect(() => {
        loadActivities();
        loadGoals();
        loadCommunities(); 
    }, []);

    const loadActivities = async () => {
        try {
            const activityData = await fetchActivities(); 
            setActivities(activityData);
        } catch (error) {
            console.error('활동 데이터를 가져오는 중 오류 발생:', error);
        } finally {
            setLoadingActivities(false);
        }
    };

    const loadGoals = async () => {
        try {
            const goalData = await fetchGoals(); 
            setGoals(goalData);
        } catch (error) {
            console.error('목표 데이터를 가져오는 중 오류 발생:', error);
        } finally {
            setLoadingGoals(false);
        }
    };

    const loadCommunities = async () => { 
        try {
            const communityData = await fetchCommunities();
            setCommunities(communityData);
        } catch (error) {
            console.error('커뮤니티 데이터를 가져오는 중 오류 발생:', error);
        } finally {
            setLoadingCommunities(false);
        }
    };

    return (
        <div>
            <h1 style={{ display: 'flex', alignItems: 'center' }}>
                User
                <Link to="/user-management" style={{ marginLeft: '10px' }}>
                    <UserOutlined style={{ fontSize: '24px', color: '#1890ff' }} /> 
                </Link>
            </h1>
            {selectedUserId && <h2> ID: {selectedUserId}</h2>} 
            <Row gutter={16}>
                <Col span={8}>
                    <Card title="활동 기록" bordered={false}>
                        {loadingActivities ? (
                            <p>Loading...</p>
                        ) : (
                            <List
                                dataSource={activities}
                                renderItem={item => (
                                    <List.Item>
                                        <strong>{item.activity_type}</strong> - {item.impact_score}점
                                    </List.Item>
                                )}
                            />
                        )}
                        <Link to="/add-activity">
                            <PlusCircleOutlined style={{ fontSize: '24px', color: '#1890ff', marginTop: '10px' }} />
                        </Link>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="목표 목록" bordered={false}>
                        {loadingGoals ? (
                            <p>Loading...</p>
                        ) : (
                            <List
                                dataSource={goals}
                                renderItem={item => (
                                    <List.Item>
                                        <strong>{item.name}</strong> - {item.progress}% 진행 중
                                    </List.Item>
                                )}
                            />
                        )}
                        <Link to="/goals">
                            <PlusCircleOutlined style={{ fontSize: '24px', color: '#1890ff', marginTop: '10px' }} />
                        </Link>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="커뮤니티" bordered={false}>
                        {loadingCommunities ? (
                            <p>Loading...</p>
                        ) : (
                            <List
                                dataSource={communities}
                                renderItem={item => (
                                    <List.Item>
                                        <strong>{item.goal_name}</strong> - {item.goal_description}
                                    </List.Item>
                                )}
                            />
                        )}
                        <Link to="/show-community"> 
                            <PlusCircleOutlined style={{ fontSize: '24px', color: '#1890ff', marginTop: '10px' }} />
                        </Link>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default MainPage;
