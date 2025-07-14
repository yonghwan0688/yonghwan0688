// 나머지 페이지들의 간단한 구현
import React, { useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import Comments from '../components/Comments';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;

const RegisterContainer = styled.div`
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
`;

const Card = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: ${({ theme }) => theme.shadow.lg};
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.dark};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 1rem;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Button = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 1rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  transition: background 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const LinkText = styled.p`
  text-align: center;
  margin-top: 1rem;
  color: ${({ theme }) => theme.colors.gray};

  a {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;
  }
`;

// 📝 회원가입 페이지
export const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('비밀번호가 일치하지 않습니다.');
      return;
    }

    setLoading(true);

    try {
      const result = await register(formData.username, formData.email, formData.password);
      
      if (result.success) {
        toast.success(result.message);
        navigate('/dashboard');
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('회원가입 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegisterContainer>
      <Card>
        <Title>📝 회원가입</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="username"
            placeholder="사용자명"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="이메일"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            name="confirmPassword"
            placeholder="비밀번호 확인"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <Button type="submit" disabled={loading}>
            {loading ? '회원가입 중...' : '회원가입'}
          </Button>
        </Form>
        <LinkText>
          이미 계정이 있으신가요? <Link to="/login">로그인</Link>
        </LinkText>
      </Card>
    </RegisterContainer>
  );
};

// 📖 포스트 상세 페이지
export const PostDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${id}`);
        if (response.ok) {
          const data = await response.json();
          setPost(data.data);
        } else {
          toast.error('포스트를 찾을 수 없습니다.');
          navigate('/posts');
        }
      } catch (error) {
        console.error('포스트 로드 실패:', error);
        toast.error('포스트 로드에 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (window.confirm('정말로 이 포스트를 삭제하시겠습니까?')) {
      try {
        const response = await fetch(`/api/posts/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          toast.success('포스트가 삭제되었습니다.');
          navigate('/posts');
        } else {
          toast.error('포스트 삭제에 실패했습니다.');
        }
      } catch (error) {
        console.error('포스트 삭제 실패:', error);
        toast.error('포스트 삭제에 실패했습니다.');
      }
    }
  };

  if (loading) return <Container>로딩 중...</Container>;
  if (!post) return <Container>포스트를 찾을 수 없습니다.</Container>;

  const isAuthor = user && user.id === post.authorId;

  return (
    <Container style={{ textAlign: 'left' }}>
      <Card>
        <Title style={{ textAlign: 'center' }}>{post.title}</Title>
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '2rem',
          color: '#666',
          fontSize: '0.9rem'
        }}>
          작성자: {post.author} | 작성일: {new Date(post.createdAt).toLocaleDateString()}
        </div>
        
        <div style={{ 
          lineHeight: '1.6',
          fontSize: '1.1rem',
          marginBottom: '2rem',
          whiteSpace: 'pre-wrap'
        }}>
          {post.content}
        </div>
        
        {isAuthor && (
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            justifyContent: 'center',
            marginTop: '2rem'
          }}>
            <Link to={`/edit/${post.id}`}>
              <Button>수정</Button>
            </Link>
            <Button 
              onClick={handleDelete}
              style={{ backgroundColor: '#dc3545' }}
            >
              삭제
            </Button>
          </div>
        )}
        
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link to="/posts">
            <Button style={{ backgroundColor: '#6c757d' }}>목록으로 돌아가기</Button>
          </Link>
        </div>
        
        <Comments postId={post.id} />
      </Card>
    </Container>
  );
};

// ✍️ 포스트 작성 페이지
export const WritePost = () => (
  <Container>
    <h1>✍️ 새 포스트 작성</h1>
    <p>포스트 작성 기능을 구현해보세요!</p>
  </Container>
);

// ✏️ 포스트 수정 페이지
export const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  React.useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          setFormData({
            title: data.data.title,
            content: data.data.content
          });
        } else {
          toast.error('포스트를 찾을 수 없습니다.');
          navigate('/posts');
        }
      } catch (error) {
        console.error('포스트 로드 실패:', error);
        toast.error('포스트 로드에 실패했습니다.');
      } finally {
        setFetchLoading(false);
      }
    };

    fetchPost();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('포스트가 수정되었습니다!');
        navigate(`/posts/${id}`);
      } else {
        const data = await response.json();
        toast.error(data.message || '포스트 수정에 실패했습니다.');
      }
    } catch (error) {
      console.error('포스트 수정 실패:', error);
      toast.error('포스트 수정에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) return <Container>로딩 중...</Container>;

  return (
    <Container>
      <Card style={{ textAlign: 'left' }}>
        <Title style={{ textAlign: 'center' }}>✏️ 포스트 수정</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="title"
            placeholder="제목을 입력하세요"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="content"
            placeholder="내용을 입력하세요"
            value={formData.content}
            onChange={handleChange}
            required
            style={{
              padding: '1rem',
              border: '2px solid #e9ecef',
              borderRadius: '8px',
              fontSize: '1rem',
              minHeight: '300px',
              resize: 'vertical',
              fontFamily: 'inherit'
            }}
          />
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Button type="submit" disabled={loading}>
              {loading ? '수정 중...' : '수정하기'}
            </Button>
            <Button 
              type="button" 
              onClick={() => navigate(`/posts/${id}`)}
              style={{ backgroundColor: '#6c757d' }}
            >
              취소
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

// 👤 프로필 페이지
export const Profile = () => {
  const { username } = useParams();
  const { user: currentUser } = useAuth();
  const [profileUser, setProfileUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    bio: '',
    avatar: ''
  });

  React.useEffect(() => {
    const fetchProfile = async () => {
      try {
        // 사용자 정보 가져오기
        const userResponse = await fetch(`/api/users/${username}`);
        if (userResponse.ok) {
          const userData = await userResponse.json();
          setProfileUser(userData.data);
          setEditForm({
            bio: userData.data.profile?.bio || '',
            avatar: userData.data.profile?.avatar || ''
          });
        }

        // 사용자의 포스트 가져오기
        const postsResponse = await fetch(`/api/posts?author=${username}`);
        if (postsResponse.ok) {
          const postsData = await postsResponse.json();
          setUserPosts(postsData.data.posts || []);
        }
      } catch (error) {
        console.error('프로필 로드 실패:', error);
        toast.error('프로필을 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(editForm),
      });

      if (response.ok) {
        const data = await response.json();
        setProfileUser(data.data);
        setIsEditing(false);
        toast.success('프로필이 업데이트되었습니다!');
      } else {
        toast.error('프로필 업데이트에 실패했습니다.');
      }
    } catch (error) {
      console.error('프로필 업데이트 실패:', error);
      toast.error('프로필 업데이트에 실패했습니다.');
    }
  };

  if (loading) return <Container>로딩 중...</Container>;
  if (!profileUser) return <Container>사용자를 찾을 수 없습니다.</Container>;

  const isOwner = currentUser && currentUser.username === username;

  return (
    <Container style={{ textAlign: 'left' }}>
      <Card>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2rem' }}>
          <div style={{ 
            width: '100px', 
            height: '100px', 
            backgroundColor: '#e9ecef', 
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem'
          }}>
            {profileUser.profile?.avatar || '👤'}
          </div>
          <div>
            <Title style={{ margin: 0, textAlign: 'left' }}>
              {profileUser.username}
            </Title>
            <p style={{ color: '#666', marginBottom: '0.5rem' }}>
              {profileUser.email}
            </p>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>
              가입일: {new Date(profileUser.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {isOwner && !isEditing && (
          <Button onClick={() => setIsEditing(true)} style={{ marginBottom: '1rem' }}>
            프로필 수정
          </Button>
        )}

        {isEditing && (
          <Form onSubmit={handleEditSubmit} style={{ marginBottom: '2rem' }}>
            <textarea
              placeholder="자기소개를 입력하세요"
              value={editForm.bio}
              onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
              style={{
                width: '100%',
                padding: '1rem',
                border: '2px solid #e9ecef',
                borderRadius: '8px',
                minHeight: '100px',
                marginBottom: '1rem'
              }}
            />
            <Input
              type="text"
              placeholder="아바타 (이모지 또는 이미지 URL)"
              value={editForm.avatar}
              onChange={(e) => setEditForm({...editForm, avatar: e.target.value})}
            />
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Button type="submit">저장</Button>
              <Button type="button" onClick={() => setIsEditing(false)} style={{ backgroundColor: '#6c757d' }}>
                취소
              </Button>
            </div>
          </Form>
        )}

        {profileUser.profile?.bio && (
          <div style={{ marginBottom: '2rem' }}>
            <h3>자기소개</h3>
            <p style={{ lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
              {profileUser.profile.bio}
            </p>
          </div>
        )}

        <div>
          <h3>작성한 포스트 ({userPosts.length}개)</h3>
          {userPosts.length === 0 ? (
            <p style={{ color: '#666' }}>아직 작성한 포스트가 없습니다.</p>
          ) : (
            <div>
              {userPosts.slice(0, 5).map(post => (
                <div key={post.id} style={{ 
                  padding: '1rem', 
                  borderBottom: '1px solid #eee',
                  marginBottom: '1rem' 
                }}>
                  <Link to={`/posts/${post.id}`} style={{ textDecoration: 'none' }}>
                    <h4 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>{post.title}</h4>
                  </Link>
                  <p style={{ color: '#666', fontSize: '0.9rem', margin: 0 }}>
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
              {userPosts.length > 5 && (
                <Link to={`/posts?author=${username}`}>
                  <Button style={{ backgroundColor: '#6c757d' }}>
                    더 많은 포스트 보기
                  </Button>
                </Link>
              )}
            </div>
          )}
        </div>
      </Card>
    </Container>
  );
};

// 📊 대시보드 페이지
export const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    postsCount: 0,
    recentPosts: []
  });

  React.useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const response = await fetch('/api/posts/my-posts', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          setStats({
            postsCount: data.data.length,
            recentPosts: data.data.slice(0, 5) // 최근 5개만
          });
        }
      } catch (error) {
        console.error('대시보드 데이터 로드 실패:', error);
      }
    };

    if (user) {
      fetchUserStats();
    }
  }, [user]);

  if (!user) {
    return (
      <Container>
        <h1>로그인이 필요합니다</h1>
      </Container>
    );
  }

  return (
    <Container>
      <Title>📊 대시보드</Title>
      <Card style={{ textAlign: 'left', marginBottom: '2rem' }}>
        <h2>환영합니다, {user.username}님! 👋</h2>
        <p>이메일: {user.email}</p>
        <p>총 작성한 포스트: {stats.postsCount}개</p>
        <div style={{ marginTop: '1rem' }}>
          <Link to="/write">
            <Button>새 포스트 작성하기</Button>
          </Link>
        </div>
      </Card>
      
      {stats.recentPosts.length > 0 && (
        <Card style={{ textAlign: 'left' }}>
          <h3>최근 작성한 포스트</h3>
          {stats.recentPosts.map(post => (
            <div key={post.id} style={{ 
              padding: '1rem', 
              borderBottom: '1px solid #eee',
              marginBottom: '1rem' 
            }}>
              <h4>{post.title}</h4>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </Card>
      )}
    </Container>
  );
};

// 404 페이지
export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Card style={{ textAlign: 'center', maxWidth: '500px', margin: '2rem auto' }}>
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🔍</div>
        <Title>페이지를 찾을 수 없습니다</Title>
        <p style={{ color: '#666', marginBottom: '2rem' }}>
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Button onClick={() => navigate('/')}>
            🏠 홈으로 가기
          </Button>
          <Button onClick={() => navigate('/posts')} style={{ backgroundColor: '#6c757d' }}>
            📚 포스트 목록
          </Button>
        </div>
      </Card>
    </Container>
  );
};
