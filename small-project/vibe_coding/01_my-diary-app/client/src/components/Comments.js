// 💬 댓글 컴포넌트
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

const CommentsContainer = styled.div`
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const CommentsHeader = styled.h3`
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.dark};
`;

const CommentForm = styled.form`
  margin-bottom: 2rem;
`;

const CommentTextarea = styled.textarea`
  width: 100%;
  padding: 1rem;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;
  margin-bottom: 1rem;
  font-family: inherit;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
  }
`;

const CommentButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CommentItem = styled.div`
  background: ${({ theme }) => theme.colors.light};
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid ${({ theme }) => theme.colors.primary};
`;

const CommentMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.gray};
`;

const CommentContent = styled.p`
  margin: 0;
  line-height: 1.6;
  white-space: pre-wrap;
`;

const CommentActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const ActionButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  transition: background 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary}20;
  }
`;

const EmptyComments = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${({ theme }) => theme.colors.gray};
  font-style: italic;
`;

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingComment, setEditingComment] = useState(null);
  const [editContent, setEditContent] = useState('');
  const { user, isAuthenticated } = useAuth();

  // 댓글 목록 불러오기
  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/posts/${postId}/comments`);
      if (response.ok) {
        const data = await response.json();
        setComments(data.data || []);
      }
    } catch (error) {
      console.error('댓글 로드 실패:', error);
    }
  };

  // 댓글 작성
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ content: newComment }),
      });

      if (response.ok) {
        setNewComment('');
        fetchComments();
        toast.success('댓글이 작성되었습니다!');
      } else {
        toast.error('댓글 작성에 실패했습니다.');
      }
    } catch (error) {
      console.error('댓글 작성 실패:', error);
      toast.error('댓글 작성에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 댓글 수정
  const handleEdit = async (commentId) => {
    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ content: editContent }),
      });

      if (response.ok) {
        setEditingComment(null);
        setEditContent('');
        fetchComments();
        toast.success('댓글이 수정되었습니다!');
      } else {
        toast.error('댓글 수정에 실패했습니다.');
      }
    } catch (error) {
      console.error('댓글 수정 실패:', error);
      toast.error('댓글 수정에 실패했습니다.');
    }
  };

  // 댓글 삭제
  const handleDelete = async (commentId) => {
    if (!window.confirm('댓글을 삭제하시겠습니까?')) return;

    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        fetchComments();
        toast.success('댓글이 삭제되었습니다!');
      } else {
        toast.error('댓글 삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('댓글 삭제 실패:', error);
      toast.error('댓글 삭제에 실패했습니다.');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <CommentsContainer>
      <CommentsHeader>💬 댓글 ({comments.length})</CommentsHeader>
      
      {isAuthenticated && (
        <CommentForm onSubmit={handleSubmit}>
          <CommentTextarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="댓글을 입력하세요..."
            required
          />
          <CommentButton type="submit" disabled={loading}>
            {loading ? '작성 중...' : '댓글 작성'}
          </CommentButton>
        </CommentForm>
      )}

      <CommentList>
        {comments.length === 0 ? (
          <EmptyComments>
            아직 댓글이 없습니다. 첫 번째 댓글을 작성해보세요!
          </EmptyComments>
        ) : (
          comments.map((comment) => (
            <CommentItem key={comment.id}>
              <CommentMeta>
                <span>👤 {comment.author?.username || '익명'}</span>
                <span>📅 {formatDate(comment.createdAt)}</span>
                {comment.updatedAt !== comment.createdAt && (
                  <span>(수정됨)</span>
                )}
              </CommentMeta>
              
              {editingComment === comment.id ? (
                <div>
                  <CommentTextarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    style={{ marginBottom: '0.5rem' }}
                  />
                  <CommentActions>
                    <ActionButton onClick={() => handleEdit(comment.id)}>
                      저장
                    </ActionButton>
                    <ActionButton onClick={() => setEditingComment(null)}>
                      취소
                    </ActionButton>
                  </CommentActions>
                </div>
              ) : (
                <div>
                  <CommentContent>{comment.content}</CommentContent>
                  {user && user.id === comment.authorId && (
                    <CommentActions>
                      <ActionButton 
                        onClick={() => {
                          setEditingComment(comment.id);
                          setEditContent(comment.content);
                        }}
                      >
                        수정
                      </ActionButton>
                      <ActionButton onClick={() => handleDelete(comment.id)}>
                        삭제
                      </ActionButton>
                    </CommentActions>
                  )}
                </div>
              )}
            </CommentItem>
          ))
        )}
      </CommentList>
    </CommentsContainer>
  );
};

export default Comments;
