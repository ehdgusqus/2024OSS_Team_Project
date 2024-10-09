import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // React Router import
import Header from './components/Header';
import Footer from './components/Footer';
import MainContent from './components/MainContent';
import SignupPage from './pages/FristPage/Signup'; 
import './App.css'; 

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<MainContent />} /> {/* 기본 경로로 MainContent 설정 */}
            <Route path="/signup" element={<SignupPage />} /> {/* 회원가입 페이지 */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
