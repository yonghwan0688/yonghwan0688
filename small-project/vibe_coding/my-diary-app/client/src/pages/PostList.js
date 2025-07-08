// 📝 포스트 목록 페이지
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.dark};
`;

const Message = styled.div`
  text-align: center;
  padding: 3rem;
  background: ${({ theme }) => theme.colors.light};
  border-radius: 15px;
  color: ${({ theme }) => theme.colors.gray};
`;

const PostList = () => {
  return (
    <Container>
      <Title>📚 블로그 포스트</Title>
      <Message>
        <h3>아직 작성된 포스트가 없습니다</h3>
        <p>첫 번째 포스트를 작성해보세요!</p>
      </Message>
    </Container>
  );
};

export default PostList;
