import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.primary};
  margin-bottom: 2rem;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: ${props => props.theme.colors.text};
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  font-size: 1rem;
  min-height: 200px;
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  ${props => props.primary && `
    background-color: ${props.theme.colors.primary};
    color: white;
    
    &:hover {
      background-color: ${props.theme.colors.primaryDark};
    }
  `}

  ${props => props.secondary && `
    background-color: ${props.theme.colors.lightGray};
    color: ${props.theme.colors.text};
    
    &:hover {
      background-color: ${props.theme.colors.border};
    }
  `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: ${props => props.theme.colors.error};
  margin-top: 0.5rem;
  font-size: 0.875rem;
`;

const SuccessMessage = styled.div`
  color: ${props => props.theme.colors.success};
  margin-top: 0.5rem;
  font-size: 0.875rem;
`;

const WritePost = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // 간단한 유효성 검사
    if (!formData.title.trim() || !formData.content.trim()) {
      setError('제목과 내용을 모두 입력해주세요.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title.trim(),
          content: formData.content.trim(),
          author: 'guest' // 임시로 guest로 설정 (나중에 인증 시스템과 연결)
        })
      });

      if (!response.ok) {
        throw new Error('포스트 작성에 실패했습니다.');
      }

      const newPost = await response.json();
      setSuccess('포스트가 성공적으로 작성되었습니다!');
      
      // 2초 후 포스트 목록 페이지로 이동
      setTimeout(() => {
        navigate('/posts');
      }, 2000);

    } catch (err) {
      setError(err.message || '포스트 작성 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/posts');
  };

  return (
    <Container>
      <Title>✍️ 새 포스트 작성</Title>
      
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Label htmlFor="title">제목</Label>
          <Input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="포스트 제목을 입력하세요"
            disabled={loading}
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="content">내용</Label>
          <TextArea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="포스트 내용을 입력하세요"
            disabled={loading}
          />
        </InputGroup>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}

        <ButtonGroup>
          <Button 
            type="button" 
            secondary 
            onClick={handleCancel}
            disabled={loading}
          >
            취소
          </Button>
          <Button 
            type="submit" 
            primary 
            disabled={loading}
          >
            {loading ? '작성 중...' : '포스트 작성'}
          </Button>
        </ButtonGroup>
      </Form>
    </Container>
  );
};

export default WritePost;
