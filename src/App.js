import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import MainPage from './pages/MainPage';
import ActivityManagement from './pages/ActivityManagement';
import SignupPage from './pages/SignupPage';
import UserManagement from './pages/UserManagement';
import ShowGoal from './pages/GoalPage/Goal/ShowGoal';
import CreateGoal from './pages/GoalPage/Goal/CreateGoal';
import Goal from './pages/GoalPage/Goal/Goal';
import GoalEdit from './pages/GoalPage/Goal/GoalEdit';
import ShowCommunity from './pages/CommunityPage/Community/ShowCommunity';
import CreateCommunity from './pages/CommunityPage/Community/CreateCommunity';
import CommunityEdit from './pages/CommunityPage/Community/CommunityEdit';

function App() {
    const [selectedUserId, setSelectedUserId] = useState(null);

    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    <MainLayout>
                        <MainPage selectedUserId={selectedUserId} />
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
                        <UserManagement setSelectedUserId={setSelectedUserId} />
                    </MainLayout>
                } />
                <Route path="/goals" element={
                    <MainLayout>
                        <ShowGoal />
                    </MainLayout>
                } />
                <Route path="/create-goal" element={
                    <MainLayout>
                        <CreateGoal />
                    </MainLayout>
                } />
                <Route path="/goal/:id" element={
                    <MainLayout>
                        <Goal />
                    </MainLayout>
                } />
                <Route path="/edit-goal/:id" element={
                    <MainLayout>
                        <GoalEdit /> 
                    </MainLayout>
                } />
                <Route path="/show-community" element={
                    <MainLayout>
                        <ShowCommunity />
                    </MainLayout>
                } />
                <Route path="/create-community" element={
                    <MainLayout>
                        <CreateCommunity />
                    </MainLayout>
                } />
                <Route path="/edit-community/:id" element={
                    <MainLayout>
                        <CommunityEdit /> 
                    </MainLayout>
                } />
            </Routes>
        </Router>
    );
}

export default App;
