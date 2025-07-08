// 🦶 푸터 컴포넌트
import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.colors.dark};
  color: white;
  padding: 2rem 0;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
`;

const FooterText = styled.p`
  margin-bottom: 1rem;
  opacity: 0.8;
`;

const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 1rem;

  ${({ theme }) => theme.media.mobile} {
    gap: 1rem;
    flex-wrap: wrap;
  }
`;

const FooterLink = styled.a`
  color: white;
  text-decoration: none;
  opacity: 0.8;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;

const Copyright = styled.p`
  font-size: 0.9rem;
  opacity: 0.6;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterText>
          React + Node.js로 만든 개인 블로그 플랫폼
        </FooterText>
        
        <FooterLinks>
          <FooterLink href="https://github.com" target="_blank" rel="noopener noreferrer">
            GitHub
          </FooterLink>
          <FooterLink href="https://react.dev" target="_blank" rel="noopener noreferrer">
            React
          </FooterLink>
          <FooterLink href="https://nodejs.org" target="_blank" rel="noopener noreferrer">
            Node.js
          </FooterLink>
          <FooterLink href="https://mongodb.com" target="_blank" rel="noopener noreferrer">
            MongoDB
          </FooterLink>
        </FooterLinks>
        
        <Copyright>
          © 2025 개인 블로그 플랫폼. MIT License.
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
