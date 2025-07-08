// 👥 사용자 관련 라우트
const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const Post = require('../models/Post');
const auth = require('../middleware/auth');

const router = express.Router();

// 👤 사용자 프로필 조회
router.get('/:username', async (req, res) => {
  try {
    const user = await User.findOne({ 
      username: req.params.username,
      isActive: true 
    }).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: '사용자를 찾을 수 없습니다'
      });
    }

    // 사용자의 공개 포스트 조회
    const posts = await Post.find({
      author: user._id,
      status: 'published',
      isPublic: true
    })
    .select('title summary createdAt views likesCount category')
    .sort({ createdAt: -1 })
    .limit(10);

    // 통계 정보
    const stats = {
      totalPosts: await Post.countDocuments({
        author: user._id,
        status: 'published',
        isPublic: true
      }),
      totalViews: await Post.aggregate([
        { $match: { author: user._id, status: 'published', isPublic: true } },
        { $group: { _id: null, total: { $sum: '$views' } } }
      ]).then(result => result[0]?.total || 0),
      joinDate: user.createdAt
    };

    res.json({
      success: true,
      data: {
        user,
        posts,
        stats
      }
    });

  } catch (error) {
    console.error('사용자 프로필 조회 에러:', error);
    res.status(500).json({
      success: false,
      message: '사용자 정보를 불러오는데 실패했습니다'
    });
  }
});

// ✏️ 프로필 수정
router.put('/profile', [
  auth,
  body('bio').optional().isLength({ max: 500 }).withMessage('소개는 최대 500글자까지 가능합니다')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: '입력값이 올바르지 않습니다',
        errors: errors.array()
      });
    }

    const { bio, avatar } = req.body;

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: '사용자를 찾을 수 없습니다'
      });
    }

    // 프로필 업데이트
    if (bio !== undefined) user.profile.bio = bio;
    if (avatar !== undefined) user.profile.avatar = avatar;

    await user.save();

    res.json({
      success: true,
      message: '프로필이 성공적으로 업데이트되었습니다',
      data: { user }
    });

  } catch (error) {
    console.error('프로필 수정 에러:', error);
    res.status(500).json({
      success: false,
      message: '프로필 수정에 실패했습니다'
    });
  }
});

// 📊 사용자 대시보드 (내 포스트 관리)
router.get('/dashboard/posts', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const status = req.query.status || 'all';

    // 필터 조건
    let filter = { author: req.user.userId };
    if (status !== 'all') {
      filter.status = status;
    }

    // 내 포스트 조회
    const posts = await Post.find(filter)
      .select('title summary status createdAt views likesCount commentsCount')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Post.countDocuments(filter);

    // 통계 정보
    const stats = {
      total: await Post.countDocuments({ author: req.user.userId }),
      published: await Post.countDocuments({ 
        author: req.user.userId, 
        status: 'published' 
      }),
      draft: await Post.countDocuments({ 
        author: req.user.userId, 
        status: 'draft' 
      }),
      totalViews: await Post.aggregate([
        { $match: { author: req.user.userId } },
        { $group: { _id: null, total: { $sum: '$views' } } }
      ]).then(result => result[0]?.total || 0)
    };

    res.json({
      success: true,
      data: {
        posts,
        stats,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total,
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1
        }
      }
    });

  } catch (error) {
    console.error('대시보드 조회 에러:', error);
    res.status(500).json({
      success: false,
      message: '대시보드 정보를 불러오는데 실패했습니다'
    });
  }
});

// 🔒 비밀번호 변경
router.put('/change-password', [
  auth,
  body('currentPassword').notEmpty().withMessage('현재 비밀번호를 입력해주세요'),
  body('newPassword').isLength({ min: 6 }).withMessage('새 비밀번호는 최소 6글자 이상이어야 합니다')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: '입력값이 올바르지 않습니다',
        errors: errors.array()
      });
    }

    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: '사용자를 찾을 수 없습니다'
      });
    }

    // 현재 비밀번호 확인
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: '현재 비밀번호가 올바르지 않습니다'
      });
    }

    // 새 비밀번호 설정
    user.password = newPassword;
    await user.save();

    res.json({
      success: true,
      message: '비밀번호가 성공적으로 변경되었습니다'
    });

  } catch (error) {
    console.error('비밀번호 변경 에러:', error);
    res.status(500).json({
      success: false,
      message: '비밀번호 변경에 실패했습니다'
    });
  }
});

module.exports = router;
