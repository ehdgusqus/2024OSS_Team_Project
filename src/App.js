import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout'; 
import MainPage from './pages/MainPage'; 
import ActivityManagement from './pages/ActivityManagement';
import SignupPage from './pages/SignupPage'; 
import UserManagement from './pages/UserManagement'; // UserManagement 컴포넌트 추가

function App() {
    const [selectedUserId, setSelectedUserId] = useState(null); // 선택된 유저 ID 상태 추가

    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    <MainLayout>
                        <MainPage selectedUserId={selectedUserId} /> {/* 선택된 유저 ID 전달 */}
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
                        <UserManagement setSelectedUserId={setSelectedUserId} /> {/* 선택된 유저 ID 설정하는 함수 전달 */}
                    </MainLayout>
                } />
            </Routes>
        </Router>
    );
}

export default App;
