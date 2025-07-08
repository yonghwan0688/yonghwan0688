// 🚀 메인 서버 파일
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// 환경변수 설정
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 미들웨어 설정
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB 연결 (임시로 주석 처리 - 메모리 DB 사용)
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/blogdb', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('✅ MongoDB 연결 성공'))
// .catch(err => console.error('❌ MongoDB 연결 실패:', err));

console.log('📝 임시 메모리 데이터베이스 모드로 실행 중...');

// 라우트 설정
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/users', require('./routes/users'));
app.use('/api/comments', require('./routes/comments'));

// 기본 라우트
app.get('/', (req, res) => {
  res.json({ 
    message: '🎉 블로그 API 서버가 실행중입니다!',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      posts: '/api/posts',
      users: '/api/users',
      comments: '/api/comments'
    }
  });
});

// 404 에러 처리
app.use('*', (req, res) => {
  res.status(404).json({ message: '🔍 요청한 페이지를 찾을 수 없습니다.' });
});

// 에러 핸들링 미들웨어
app.use((err, req, res, next) => {
  console.error('❌ 서버 에러:', err.stack);
  res.status(500).json({ 
    message: '서버에 문제가 발생했습니다.',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`🚀 서버가 포트 ${PORT}에서 실행중입니다.`);
  console.log(`📱 http://localhost:${PORT} 에서 확인하세요.`);
});

module.exports = app;
