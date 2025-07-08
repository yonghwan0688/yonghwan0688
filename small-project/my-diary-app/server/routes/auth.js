// 🔐 인증 관련 라우트 (메모리 DB 버전)
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const { UserMemoryDB } = require('../data/memoryDB');

const router = express.Router();

// JWT 시크릿 키 (실제로는 환경변수에 저장)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// 📝 회원가입
router.post('/register', [
  body('username')
    .isLength({ min: 3, max: 20 })
    .withMessage('사용자명은 3-20글자 사이여야 합니다'),
  body('email')
    .isEmail()
    .withMessage('올바른 이메일을 입력해주세요'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('비밀번호는 최소 6글자 이상이어야 합니다')
], async (req, res) => {
  try {
    // 유효성 검사
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: '입력값이 올바르지 않습니다',
        errors: errors.array()
      });
    }

    const { username, email, password } = req.body;

    // 중복 사용자 확인
    const existingUser = UserMemoryDB.findOne({
      $or: [{ email }, { username }]
    }) || UserMemoryDB.findOne({ email }) || UserMemoryDB.findOne({ username });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: '이미 존재하는 사용자명 또는 이메일입니다'
      });
    }

    // 비밀번호 해싱
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 새 사용자 생성
    const user = UserMemoryDB.create({ 
      username, 
      email, 
      password: hashedPassword,
      profile: { bio: '', avatar: '' },
      role: 'user',
      isActive: true
    });

    // JWT 토큰 생성
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      message: '회원가입이 완료되었습니다',
      data: {
        user,
        token
      }
    });

  } catch (error) {
    console.error('회원가입 에러:', error);
    res.status(500).json({
      success: false,
      message: '서버 오류가 발생했습니다'
    });
  }
});

// 🔑 로그인
router.post('/login', [
  body('email').isEmail().withMessage('올바른 이메일을 입력해주세요'),
  body('password').notEmpty().withMessage('비밀번호를 입력해주세요')
], async (req, res) => {
  try {
    // 유효성 검사
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: '입력값이 올바르지 않습니다',
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    // 사용자 찾기
    const user = UserMemoryDB.findOne({ email });
    if (!user || !user.isActive) {
      return res.status(400).json({
        success: false,
        message: '이메일 또는 비밀번호가 올바르지 않습니다'
      });
    }

    // 비밀번호 확인
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: '이메일 또는 비밀번호가 올바르지 않습니다'
      });
    }

    // JWT 토큰 생성
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: '로그인 성공',
      data: {
        user,
        token
      }
    });

  } catch (error) {
    console.error('로그인 에러:', error);
    res.status(500).json({
      success: false,
      message: '서버 오류가 발생했습니다'
    });
  }
});

// 👤 현재 사용자 정보 조회
router.get('/me', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: '접근 권한이 없습니다'
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = UserMemoryDB.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: '사용자를 찾을 수 없습니다'
      });
    }

    // 비밀번호 제외하고 응답
    const { password, ...userWithoutPassword } = user;
    res.json({
      success: true,
      data: { user: userWithoutPassword }
    });

  } catch (error) {
    console.error('사용자 정보 조회 에러:', error);
    res.status(401).json({
      success: false,
      message: '유효하지 않은 토큰입니다'
    });
  }
});

module.exports = router;
