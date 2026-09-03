import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainDashboardPage from './pages/MainDashboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<MainDashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/report/:id" element={
            <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'sans-serif' }}>
              <h1>상세 리포트 페이지</h1>
              <p>이곳은 지역별 메탄 예측값 상세 리포트를 보여주는 페이지입니다.</p>
            </div>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
