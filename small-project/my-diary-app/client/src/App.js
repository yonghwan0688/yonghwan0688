// 🎯 메인 App 컴포넌트
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

// 컴포넌트 import
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import PostList from './pages/PostListUpdated';
import Login from './pages/Login';
import WritePost from './pages/WritePost';
import ProtectedRoute from './components/ProtectedRoute';

// 간단한 페이지들
import { 
  Register, 
  PostDetail, 
  EditPost, 
  Profile, 
  Dashboard, 
  NotFound 
} from './pages/index';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  padding-top: 80px; // 헤더 높이만큼 여백
`;

function App() {
  return (
    <AppContainer>
      <Header />
      <MainContent>
        <Routes>
          {/* 공개 라우트 */}
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<PostList />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile/:username" element={<Profile />} />

          {/* 보호된 라우트 (로그인 필요) */}
          <Route
            path="/write"
            element={
              <ProtectedRoute>
                <WritePost />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute>
                <EditPost />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* 404 페이지 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainContent>
      <Footer />
    </AppContainer>
  );
}

export default App;
