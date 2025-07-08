// 🧭 헤더 컴포넌트
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: white;
  box-shadow: ${({ theme }) => theme.shadow.md};
  z-index: ${({ theme }) => theme.zIndex.sticky};
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  ${({ theme }) => theme.media.mobile} {
    gap: 1rem;
  }
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.dark};
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Button = styled.button`
  background: ${({ variant, theme }) => 
    variant === 'primary' ? theme.colors.primary : 'transparent'};
  color: ${({ variant, theme }) => 
    variant === 'primary' ? 'white' : theme.colors.primary};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
  }
`;

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <HeaderContainer>
      <Nav>
        <Logo to="/">📝 개인 블로그</Logo>
        
        <NavLinks>
          <NavLink to="/">홈</NavLink>
          <NavLink to="/posts">포스트</NavLink>
          
          {isAuthenticated ? (
            <>
              <NavLink to="/write">글쓰기</NavLink>
              <NavLink to="/dashboard">대시보드</NavLink>
              <span>안녕하세요, {user?.username}님!</span>
              <Button onClick={handleLogout}>로그아웃</Button>
            </>
          ) : (
            <>
              <NavLink to="/login">로그인</NavLink>
              <Button variant="primary" onClick={() => navigate('/register')}>
                회원가입
              </Button>
            </>
          )}
        </NavLinks>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
