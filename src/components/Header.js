import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { Layout, Typography, Button } from 'antd';

const { Header } = Layout;
const { Title } = Typography;

const AppHeader = ({ setIsLoggedIn }) => {
    const navigate = useNavigate(); // 

    const handleWastePageNavigation = () => {
        navigate('/waste-management'); // wastePage로 이동
    };

    return (
        <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#001529' }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}> 
                <Title level={2} style={{ color: 'white', margin: 0 }}>EcoHabit</Title>
            </Link>
            <Button 
                type="primary" 
                style={{ marginLeft: 'auto' }} 
                onClick={handleWastePageNavigation} 
            >
                Waste
            </Button>
        </Header>
    );
};

export default AppHeader;
