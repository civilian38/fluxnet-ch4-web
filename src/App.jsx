import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainDashboardPage from './pages/MainDashboardPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<MainDashboardPage />} />
        {/* 루트 경로 진입 시 /home으로 자동 리다이렉트 */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        {/* 상세 리포트 페이지 목업 (추후 별도 페이지 컴포넌트로 분리) */}
        <Route path="/report/:id" element={
          <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'sans-serif' }}>
            <h1>상세 리포트 페이지</h1>
            <p>이곳은 지역별 메탄 예측값 상세 리포트를 보여주는 페이지입니다.</p>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
