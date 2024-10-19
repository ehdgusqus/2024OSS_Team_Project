import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout'; 
import MainPage from './pages/MainPage'; 
import ActivityManagement from './pages/ActivityManagement';
import SignupPage from './pages/SignupPage'; 
import UserManagement from './pages/UserManagement'; // UserManagement 컴포넌트 추가

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    <MainLayout>
                        <MainPage />
                    </MainLayout>
                } />
                <Route path="/signup" element={
                    <MainLayout>
                        <SignupPage />
                    </MainLayout>
                } />
                <Route path="/add-activity" element={
                    <MainLayout>
                        <ActivityManagement />
                    </MainLayout>
                } />
                <Route path="/user-management" element={
                    <MainLayout>
                        <UserManagement /> {/* UserManagement 페이지 연결 */}
                    </MainLayout>
                } />
            </Routes>
        </Router>
    );
}

export default App;