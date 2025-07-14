// 📝 포스트 목록 페이지 (업데이트 버전)
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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

const SearchContainer = styled.div`
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 1rem;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
  }
`;

const SearchButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
`;

const ClearButton = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.colors.gray};
  padding: 1rem;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.lightGray};
  }
`;

const PostCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: ${({ theme }) => theme.shadow.md};
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadow.lg};
  }
`;

const PostTitle = styled.h2`
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.dark};
  
  a {
    color: inherit;
    text-decoration: none;
    
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const PostMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.gray};
  font-size: 0.9rem;
`;

const PostSummary = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const TagsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  background: ${({ theme }) => theme.colors.primary}20;
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 3rem;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.gray};
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 3rem;
  background: ${({ theme }) => theme.colors.error}10;
  border-radius: 15px;
  color: ${({ theme }) => theme.colors.error};
  margin-bottom: 2rem;
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 3rem;
  background: ${({ theme }) => theme.colors.light};
  border-radius: 15px;
  color: ${({ theme }) => theme.colors.gray};
`;

const ResultsCount = styled.div`
  text-align: center;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.gray};
  font-size: 0.9rem;
`;

const PostListUpdated = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/posts');
      
      if (!response.ok) {
        throw new Error('포스트를 불러오는데 실패했습니다.');
      }
      
      const data = await response.json();
      setPosts(data.data.posts || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const filteredPosts = posts.filter(post => 
    post.title.includes(searchTerm) || 
    post.summary.includes(searchTerm) || 
    post.author?.username.includes(searchTerm)
  );

  if (loading) {
    return (
      <Container>
        <Title>📚 블로그 포스트</Title>
        <LoadingMessage>
          포스트를 불러오는 중...
        </LoadingMessage>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Title>📚 블로그 포스트</Title>
        <ErrorMessage>
          ❌ {error}
        </ErrorMessage>
      </Container>
    );
  }

  if (posts.length === 0) {
    return (
      <Container>
        <Title>📚 블로그 포스트</Title>
        <EmptyMessage>
          <h3>아직 작성된 포스트가 없습니다</h3>
          <p>첫 번째 포스트를 작성해보세요!</p>
        </EmptyMessage>
      </Container>
    );
  }

  return (
    <Container>
      <Title>📚 블로그 포스트</Title>
      <SearchContainer>
        <SearchInput 
          type="text" 
          placeholder="포스트 제목, 내용, 또는 작성자 검색..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && setSearchTerm(e.target.value)}
        />
        <SearchButton onClick={() => fetchPosts()}>
          🔍 검색
        </SearchButton>
        <ClearButton onClick={() => setSearchTerm('')}>
          ❌ 초기화
        </ClearButton>
      </SearchContainer>
      
      <ResultsCount>
        {searchTerm 
          ? `"${searchTerm}" 검색 결과: ${filteredPosts.length}개`
          : `총 ${posts.length}개의 포스트`
        }
      </ResultsCount>
      
      {filteredPosts.length === 0 && searchTerm && (
        <EmptyMessage>
          <h3>"{searchTerm}"에 대한 검색 결과가 없습니다</h3>
          <p>다른 검색어로 시도해보세요.</p>
        </EmptyMessage>
      )}
      
      {filteredPosts.map((post) => (
        <PostCard key={post._id}>
          <PostTitle>
            <Link to={`/posts/${post._id}`}>
              {post.title}
            </Link>
          </PostTitle>
          
          <PostMeta>
            <span>👤 {post.author?.username || '익명'}</span>
            <span>📅 {formatDate(post.createdAt)}</span>
            <span>👁️ {post.views}회</span>
            <span>📂 {post.category}</span>
          </PostMeta>
          
          {post.summary && (
            <PostSummary>{post.summary}</PostSummary>
          )}
          
          {post.tags && post.tags.length > 0 && (
            <TagsContainer>
              {post.tags.map((tag, index) => (
                <Tag key={index}>#{tag}</Tag>
              ))}
            </TagsContainer>
          )}
        </PostCard>
      ))}
    </Container>
  );
};

export default PostListUpdated;
