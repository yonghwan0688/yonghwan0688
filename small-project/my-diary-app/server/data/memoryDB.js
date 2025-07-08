// 📊 메모리 데이터베이스 (임시 학습용)
let users = [];
let posts = [];
let comments = [];
let userIdCounter = 1;
let postIdCounter = 1;
let commentIdCounter = 1;

// 기본 데이터 생성
const defaultUser = {
  _id: userIdCounter++,
  username: 'testuser',
  email: 'test@example.com',
  password: '$2a$10$rQ9K8KG4OmN5gQjGwO0jL.V7vV7WdN4Z0sNKCOoLvJfOZKFz8zO9u', // password: 123456
  profile: {
    bio: '안녕하세요! 테스트 사용자입니다.',
    avatar: ''
  },
  role: 'user',
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
};

const defaultPosts = [
  {
    _id: postIdCounter++,
    title: '첫 번째 블로그 포스트',
    content: '안녕하세요! 이것은 첫 번째 테스트 포스트입니다. React와 Node.js로 만든 블로그에 오신 것을 환영합니다!',
    summary: '첫 번째 포스트입니다.',
    author: defaultUser._id,
    tags: ['환영', '첫포스트', 'React'],
    category: 'general',
    thumbnail: '',
    views: 42,
    likes: [],
    comments: [],
    status: 'published',
    isPublic: true,
    createdAt: new Date(Date.now() - 86400000), // 1일 전
    updatedAt: new Date(Date.now() - 86400000)
  },
  {
    _id: postIdCounter++,
    title: 'React Hooks 사용법',
    content: 'React Hooks는 함수형 컴포넌트에서 상태와 생명주기를 다룰 수 있게 해주는 강력한 기능입니다. useState, useEffect, useContext 등을 활용해보세요!',
    summary: 'React Hooks에 대한 기본적인 설명입니다.',
    author: defaultUser._id,
    tags: ['React', 'Hooks', '개발'],
    category: 'tech',
    thumbnail: '',
    views: 128,
    likes: [],
    comments: [],
    status: 'published',
    isPublic: true,
    createdAt: new Date(Date.now() - 43200000), // 12시간 전
    updatedAt: new Date(Date.now() - 43200000)
  },
  {
    _id: postIdCounter++,
    title: 'Node.js로 REST API 만들기',
    content: 'Express.js를 사용해서 RESTful API를 만드는 방법을 알아보겠습니다. 라우팅, 미들웨어, 에러 처리까지 다뤄보겠습니다.',
    summary: 'Node.js와 Express로 API 서버 구축하기',
    author: defaultUser._id,
    tags: ['Node.js', 'Express', 'API'],
    category: 'tech',
    thumbnail: '',
    views: 89,
    likes: [],
    comments: [],
    status: 'published',
    isPublic: true,
    createdAt: new Date(Date.now() - 7200000), // 2시간 전
    updatedAt: new Date(Date.now() - 7200000)
  }
];

users.push(defaultUser);
posts.push(...defaultPosts);

// 사용자 관련 함수들
const UserMemoryDB = {
  findOne: (query) => {
    return users.find(user => {
      if (query.email) return user.email === query.email;
      if (query.username) return user.username === query.username;
      if (query._id) return user._id === query._id;
      return false;
    });
  },
  
  findById: (id) => {
    return users.find(user => user._id == id);
  },
  
  create: (userData) => {
    const newUser = {
      _id: userIdCounter++,
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    users.push(newUser);
    return newUser;
  },
  
  findByIdAndUpdate: (id, updateData) => {
    const userIndex = users.findIndex(user => user._id == id);
    if (userIndex !== -1) {
      users[userIndex] = { 
        ...users[userIndex], 
        ...updateData, 
        updatedAt: new Date() 
      };
      return users[userIndex];
    }
    return null;
  }
};

// 포스트 관련 함수들
const PostMemoryDB = {
  find: (query = {}) => {
    let result = [...posts];
    
    if (query.status) {
      result = result.filter(post => post.status === query.status);
    }
    if (query.isPublic !== undefined) {
      result = result.filter(post => post.isPublic === query.isPublic);
    }
    if (query.author) {
      result = result.filter(post => post.author == query.author);
    }
    if (query.category && query.category !== 'all') {
      result = result.filter(post => post.category === query.category);
    }
    
    return {
      sort: (sortObj) => {
        if (sortObj.createdAt === -1) {
          result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
        return {
          skip: (skipNum) => {
            result = result.slice(skipNum);
            return {
              limit: (limitNum) => {
                result = result.slice(0, limitNum);
                return {
                  populate: () => {
                    // 간단한 populate 시뮬레이션
                    return result.map(post => ({
                      ...post,
                      author: UserMemoryDB.findById(post.author)
                    }));
                  }
                };
              }
            };
          }
        };
      }
    };
  },
  
  findById: (id) => {
    const post = posts.find(post => post._id == id);
    if (post) {
      return {
        ...post,
        populate: () => ({
          ...post,
          author: UserMemoryDB.findById(post.author)
        }),
        incrementViews: () => {
          post.views += 1;
          return post;
        }
      };
    }
    return null;
  },
  
  create: (postData) => {
    const newPost = {
      _id: postIdCounter++,
      ...postData,
      views: 0,
      likes: [],
      comments: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    posts.push(newPost);
    return newPost;
  },
  
  findByIdAndUpdate: (id, updateData) => {
    const postIndex = posts.findIndex(post => post._id == id);
    if (postIndex !== -1) {
      posts[postIndex] = { 
        ...posts[postIndex], 
        ...updateData, 
        updatedAt: new Date() 
      };
      return posts[postIndex];
    }
    return null;
  },
  
  findByIdAndDelete: (id) => {
    const postIndex = posts.findIndex(post => post._id == id);
    if (postIndex !== -1) {
      const deletedPost = posts[postIndex];
      posts.splice(postIndex, 1);
      return deletedPost;
    }
    return null;
  },
  
  countDocuments: (query = {}) => {
    let result = [...posts];
    
    if (query.status) {
      result = result.filter(post => post.status === query.status);
    }
    if (query.isPublic !== undefined) {
      result = result.filter(post => post.isPublic === query.isPublic);
    }
    if (query.author) {
      result = result.filter(post => post.author == query.author);
    }
    
    return result.length;
  }
};

// 댓글 메모리 DB
const CommentMemoryDB = {
  create: (commentData) => {
    const newComment = {
      _id: commentIdCounter++,
      ...commentData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    comments.push(newComment);
    return newComment;
  },
  
  findById: (id) => {
    return comments.find(comment => comment._id == id);
  },
  
  find: (query = {}) => {
    let result = [...comments];
    
    if (query.postId) {
      result = result.filter(comment => comment.postId == query.postId);
    }
    if (query.authorId) {
      result = result.filter(comment => comment.authorId == query.authorId);
    }
    
    return result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },
  
  findByIdAndUpdate: (id, updateData) => {
    const commentIndex = comments.findIndex(comment => comment._id == id);
    if (commentIndex !== -1) {
      comments[commentIndex] = { 
        ...comments[commentIndex], 
        ...updateData, 
        updatedAt: new Date() 
      };
      return comments[commentIndex];
    }
    return null;
  },
  
  findByIdAndDelete: (id) => {
    const commentIndex = comments.findIndex(comment => comment._id == id);
    if (commentIndex !== -1) {
      const deletedComment = comments[commentIndex];
      comments.splice(commentIndex, 1);
      return deletedComment;
    }
    return null;
  },
  
  countDocuments: (query = {}) => {
    let result = [...comments];
    
    if (query.postId) {
      result = result.filter(comment => comment.postId == query.postId);
    }
    if (query.authorId) {
      result = result.filter(comment => comment.authorId == query.authorId);
    }
    
    return result.length;
  }
};

module.exports = {
  UserMemoryDB,
  PostMemoryDB,
  CommentMemoryDB,
  users,
  posts,
  comments
};
