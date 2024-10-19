import React, { useEffect, useState } from 'react';
import { Card, Row, Col, List } from 'antd';
import { Link } from 'react-router-dom'; 
import { fetchActivities } from '../api/activityAPI'; 
import { PlusCircleOutlined, UserOutlined } from '@ant-design/icons'; 
import Loader from './GoalPage/Common/Loader'; // Loader의 경로 수정

const MainPage = () => {
    const [activities, setActivities] = useState([]); // 활동 데이터를 저장할 상태
    const [loadingActivities, setLoadingActivities] = useState(true);

    useEffect(() => {
        loadActivities(); // 컴포넌트 마운트 시 활동 목록 로드
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

    return (
        <div>
            <h1 style={{ display: 'flex', alignItems: 'center' }}>
                User
                <Link to="/user-management" style={{ marginLeft: '10px' }}>
                    <UserOutlined style={{ fontSize: '24px', color: '#1890ff' }} /> 
                </Link>
            </h1>
            <Row gutter={16}>
                <Col span={8}>
                    <Card title="활동 기록" bordered={false}>
                        {loadingActivities ? (
                            <Loader />
                        ) : (
                            <List
                                dataSource={activities} // 활동 데이터로 List 컴포넌트 채우기
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
