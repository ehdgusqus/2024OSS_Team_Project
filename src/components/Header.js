import React from 'react';
import { Link } from 'react-router-dom'; // Link 컴포넌트 추가
import { Layout, Typography } from 'antd';

const { Header } = Layout;
const { Title } = Typography;

const AppHeader = ({ setIsLoggedIn }) => {
    return (
        <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#001529' }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}> 
                <Title level={2} style={{ color: 'white', margin: 0 }}>EcoHabit</Title>
            </Link>
        </Header>
    );
};

export default AppHeader;
