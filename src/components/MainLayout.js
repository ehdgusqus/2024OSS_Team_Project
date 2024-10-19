import React from 'react';
import { Layout } from 'antd';
import AppHeader from './Header';
import Footer from './Footer';

const { Content } = Layout;

const MainLayout = ({ children, setIsLoggedIn }) => {
    return (
        <Layout style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <AppHeader setIsLoggedIn={setIsLoggedIn} />
            <Content style={{ flex: '1', padding: '20px' }}>
                {children}
            </Content>
            <Footer />
        </Layout>
    );
};

export default MainLayout;
