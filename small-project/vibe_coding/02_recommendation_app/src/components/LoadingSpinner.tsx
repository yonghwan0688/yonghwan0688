import React from "react";
import styled, { keyframes } from "styled-components";

const LoadingSpinner: React.FC = () => {
  return (
    <Container>
      <Spinner />
      <Text>맛있는 음식을 찾고 있어요... 🔍</Text>
    </Container>
  );
};

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 16px;
`;

const Text = styled.div`
  color: #666;
  font-size: 1.1rem;
  text-align: center;
`;

export default LoadingSpinner;
