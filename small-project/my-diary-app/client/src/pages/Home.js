// 🏠 홈 페이지
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Hero = styled.section`
  text-align: center;
  padding: 4rem 0;
  background: ${({ theme }) => theme.colors.gradient.primary};
  border-radius: 20px;
  color: white;
  margin-bottom: 4rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  
  ${({ theme }) => theme.media.mobile} {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const FeatureCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: ${({ theme }) => theme.shadow.md};
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.dark};
`;

const FeatureDescription = styled.p`
  color: ${({ theme }) => theme.colors.gray};
  line-height: 1.6;
`;

const CTASection = styled.section`
  text-align: center;
  padding: 3rem;
  background: ${({ theme }) => theme.colors.light};
  border-radius: 15px;
`;

const CTAButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 1rem 2rem;
  border-radius: 25px;
  font-size: 1.1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  margin: 0 0.5rem;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-2px);
  }
`;

const Home = () => {
  return (
    <Container>
      <Hero>
        <Title>📝 개인 블로그 플랫폼</Title>
        <Subtitle>
          React와 Node.js로 만든 현대적인 블로그입니다.
          <br />
          당신의 생각과 경험을 세상과 공유해보세요!
        </Subtitle>
      </Hero>

      <FeatureGrid>
        <FeatureCard>
          <FeatureIcon>✍️</FeatureIcon>
          <FeatureTitle>쉬운 글쓰기</FeatureTitle>
          <FeatureDescription>
            마크다운을 지원하는 직관적인 에디터로 
            아름다운 글을 작성할 수 있습니다.
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon>🎨</FeatureIcon>
          <FeatureTitle>반응형 디자인</FeatureTitle>
          <FeatureDescription>
            모바일부터 데스크톱까지 모든 기기에서 
            완벽하게 작동하는 반응형 웹 디자인입니다.
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon>🔐</FeatureIcon>
          <FeatureTitle>안전한 인증</FeatureTitle>
          <FeatureDescription>
            JWT 토큰 기반의 안전한 인증 시스템으로 
            개인정보를 안전하게 보호합니다.
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon>🚀</FeatureIcon>
          <FeatureTitle>빠른 성능</FeatureTitle>
          <FeatureDescription>
            최신 웹 기술을 사용하여 빠르고 
            부드러운 사용자 경험을 제공합니다.
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon>💡</FeatureIcon>
          <FeatureTitle>학습 목적</FeatureTitle>
          <FeatureDescription>
            웹개발 실력 향상을 위한 실무형 
            프로젝트로 다양한 기술을 학습할 수 있습니다.
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon>🌟</FeatureIcon>
          <FeatureTitle>오픈소스</FeatureTitle>
          <FeatureDescription>
            MIT 라이센스로 자유롭게 사용하고 
            개선할 수 있는 오픈소스 프로젝트입니다.
          </FeatureDescription>
        </FeatureCard>
      </FeatureGrid>

      <CTASection>
        <h2>지금 바로 시작해보세요!</h2>
        <p style={{ marginBottom: '2rem', color: '#666' }}>
          회원가입하고 첫 번째 블로그 포스트를 작성해보세요.
        </p>
        <CTAButton onClick={() => window.location.href = '/register'}>
          회원가입
        </CTAButton>
        <CTAButton onClick={() => window.location.href = '/posts'}>
          포스트 둘러보기
        </CTAButton>
      </CTASection>
    </Container>
  );
};

export default Home;
