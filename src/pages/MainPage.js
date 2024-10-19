// src/pages/MainPage.js
import React, { useEffect, useState } from 'react';
import { Card, Row, Col, List } from 'antd';
import { Link } from 'react-router-dom'; 
import { fetchActivities } from '../api/activityAPI'; 
import { fetchGoals } from '../api/goalsAPI'; 
import { PlusCircleOutlined, UserOutlined } from '@ant-design/icons'; 

const MainPage = ({ selectedUserId }) => { // 선택된 유저 ID를 props로 받음
    const [activities, setActivities] = useState([]); 
    const [goals, setGoals] = useState([]); 
    const [loadingActivities, setLoadingActivities] = useState(true); 
    const [loadingGoals, setLoadingGoals] = useState(true); 

    useEffect(() => {
        loadActivities(); 
        loadGoals(); 
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

    return (
        <div>
            <h1 style={{ display: 'flex', alignItems: 'center' }}>
                {selectedUserId ? `${selectedUserId}` : 'User'} {/* 선택된 유저 아이디 표시 */}
                <Link to="/user-management" style={{ marginLeft: '10px' }}>
                    <UserOutlined style={{ fontSize: '24px', color: '#1890ff' }} /> 
                </Link>
            </h1>
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
                        {/* 커뮤니티 내용 */}
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default MainPage;
