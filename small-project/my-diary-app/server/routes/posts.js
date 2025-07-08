// 📝 블로그 포스트 관련 라우트 (메모리 DB 버전)
const express = require('express');
const { body, validationResult } = require('express-validator');
const { PostMemoryDB, UserMemoryDB, CommentMemoryDB } = require('../data/memoryDB');
const auth = require('../middleware/auth');

const router = express.Router();

// 📚 모든 포스트 조회 (페이지네이션)
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const category = req.query.category;
    const search = req.query.search;

    // 필터 조건 구성
    let filter = { status: 'published', isPublic: true };
    
    if (category && category !== 'all') {
      filter.category = category;
    }

    if (search) {
      filter.$text = { $search: search };
    }

    // 포스트 조회
    const posts = PostMemoryDB.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate();

    // 전체 포스트 수
    const total = PostMemoryDB.countDocuments(filter);

    res.json({
      success: true,
      data: {
        posts,
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
    console.error('포스트 조회 에러:', error);
    res.status(500).json({
      success: false,
      message: '포스트를 불러오는데 실패했습니다'
    });
  }
});

// 📚 내 포스트 조회 (로그인 필요)
router.get('/my-posts', auth, async (req, res) => {
  try {
    const posts = PostMemoryDB.find({ authorId: req.user.userId });
    const populatedPosts = posts.map(post => post.populate());

    res.json({
      success: true,
      data: populatedPosts
    });

  } catch (error) {
    console.error('내 포스트 조회 에러:', error);
    res.status(500).json({
      success: false,
      message: '포스트를 불러오는데 실패했습니다'
    });
  }
});

// 📖 특정 포스트 조회
router.get('/:id', async (req, res) => {
  try {
    const post = PostMemoryDB.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: '포스트를 찾을 수 없습니다'
      });
    }

    // 조회수 증가
    post.incrementViews();

    // 작성자 정보 포함
    const populatedPost = post.populate();

    res.json({
      success: true,
      data: { post: populatedPost }
    });

  } catch (error) {
    console.error('포스트 상세 조회 에러:', error);
    res.status(500).json({
      success: false,
      message: '포스트를 불러오는데 실패했습니다'
    });
  }
});

// ✍️ 새 포스트 작성
router.post('/', [
  auth,
  body('title')
    .isLength({ min: 1, max: 100 })
    .withMessage('제목은 1-100글자 사이여야 합니다'),
  body('content')
    .isLength({ min: 10 })
    .withMessage('내용은 최소 10글자 이상이어야 합니다')
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

    const { title, content, summary, tags, category, thumbnail } = req.body;

    // 새 포스트 생성
    const post = PostMemoryDB.create({
      title,
      content,
      summary,
      author: req.user.userId,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      category: category || 'general',
      thumbnail: thumbnail || '',
      status: 'published',
      isPublic: true
    });

    // 작성자 정보 포함
    const populatedPost = {
      ...post,
      author: UserMemoryDB.findById(post.author)
    };

    res.status(201).json({
      success: true,
      message: '포스트가 성공적으로 작성되었습니다',
      data: { post: populatedPost }
    });

  } catch (error) {
    console.error('포스트 작성 에러:', error);
    res.status(500).json({
      success: false,
      message: '포스트 작성에 실패했습니다'
    });
  }
});

// 📝 포스트 수정
router.put('/:id', [
  auth,
  body('title').optional().isLength({ min: 1, max: 100 }),
  body('content').optional().isLength({ min: 10 })
], async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: '포스트를 찾을 수 없습니다'
      });
    }

    // 작성자 확인
    if (post.author.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: '포스트를 수정할 권한이 없습니다'
      });
    }

    // 포스트 업데이트
    const updateData = req.body;
    if (updateData.tags && typeof updateData.tags === 'string') {
      updateData.tags = updateData.tags.split(',').map(tag => tag.trim());
    }

    Object.assign(post, updateData);
    await post.save();

    await post.populate('author', 'username profile');

    res.json({
      success: true,
      message: '포스트가 성공적으로 수정되었습니다',
      data: { post }
    });

  } catch (error) {
    console.error('포스트 수정 에러:', error);
    res.status(500).json({
      success: false,
      message: '포스트 수정에 실패했습니다'
    });
  }
});

// 🗑️ 포스트 삭제
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: '포스트를 찾을 수 없습니다'
      });
    }

    // 작성자 확인
    if (post.author.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: '포스트를 삭제할 권한이 없습니다'
      });
    }

    await Post.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: '포스트가 성공적으로 삭제되었습니다'
    });

  } catch (error) {
    console.error('포스트 삭제 에러:', error);
    res.status(500).json({
      success: false,
      message: '포스트 삭제에 실패했습니다'
    });
  }
});

// ❤️ 포스트 좋아요
router.post('/:id/like', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: '포스트를 찾을 수 없습니다'
      });
    }

    // 이미 좋아요를 했는지 확인
    const existingLike = post.likes.find(
      like => like.user.toString() === req.user.userId
    );

    if (existingLike) {
      // 좋아요 취소
      post.likes = post.likes.filter(
        like => like.user.toString() !== req.user.userId
      );
    } else {
      // 좋아요 추가
      post.likes.push({ user: req.user.userId });
    }

    await post.save();

    res.json({
      success: true,
      message: existingLike ? '좋아요를 취소했습니다' : '좋아요를 눌렀습니다',
      data: {
        likesCount: post.likes.length,
        isLiked: !existingLike
      }
    });

  } catch (error) {
    console.error('좋아요 에러:', error);
    res.status(500).json({
      success: false,
      message: '좋아요 처리에 실패했습니다'
    });
  }
});

// 💬 댓글 관련 라우트 추가
// 📝 특정 포스트의 댓글 조회
router.get('/:id/comments', async (req, res) => {
  try {
    const comments = CommentMemoryDB.find({ postId: req.params.id });
    
    // 댓글 작성자 정보 포함
    const populatedComments = comments.map(comment => {
      const author = UserMemoryDB.findById(comment.authorId);
      return {
        ...comment,
        author: author ? {
          id: author._id,
          username: author.username,
          avatar: author.profile?.avatar
        } : null
      };
    });

    res.json({
      success: true,
      data: populatedComments
    });

  } catch (error) {
    console.error('댓글 조회 에러:', error);
    res.status(500).json({
      success: false,
      message: '댓글을 불러오는데 실패했습니다'
    });
  }
});

// 💬 새 댓글 작성
router.post('/:id/comments', [
  auth,
  body('content')
    .isLength({ min: 1, max: 1000 })
    .withMessage('댓글은 1-1000글자 사이여야 합니다')
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

    const { content } = req.body;
    const postId = req.params.id;

    // 포스트 존재 확인
    const post = PostMemoryDB.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: '포스트를 찾을 수 없습니다'
      });
    }

    // 댓글 생성
    const newComment = CommentMemoryDB.create({
      postId: postId,
      authorId: req.user.userId,
      content: content
    });

    // 작성자 정보 포함
    const author = UserMemoryDB.findById(req.user.userId);
    const populatedComment = {
      ...newComment,
      author: {
        id: author._id,
        username: author.username,
        avatar: author.profile?.avatar
      }
    };

    res.status(201).json({
      success: true,
      message: '댓글이 작성되었습니다',
      data: populatedComment
    });

  } catch (error) {
    console.error('댓글 작성 에러:', error);
    res.status(500).json({
      success: false,
      message: '댓글 작성에 실패했습니다'
    });
  }
});

// 🔄 댓글 수정
router.put('/comments/:id', [
  auth,
  body('content')
    .isLength({ min: 1, max: 1000 })
    .withMessage('댓글은 1-1000글자 사이여야 합니다')
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

    const commentId = req.params.id;
    const { content } = req.body;

    // 댓글 존재 확인
    const comment = CommentMemoryDB.findById(commentId);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: '댓글을 찾을 수 없습니다'
      });
    }

    // 작성자 확인
    if (comment.authorId !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: '댓글 수정 권한이 없습니다'
      });
    }

    // 댓글 수정
    const updatedComment = CommentMemoryDB.findByIdAndUpdate(commentId, {
      content: content
    });

    res.json({
      success: true,
      message: '댓글이 수정되었습니다',
      data: updatedComment
    });

  } catch (error) {
    console.error('댓글 수정 에러:', error);
    res.status(500).json({
      success: false,
      message: '댓글 수정에 실패했습니다'
    });
  }
});

// 🗑️ 댓글 삭제
router.delete('/comments/:id', auth, async (req, res) => {
  try {
    const commentId = req.params.id;

    // 댓글 존재 확인
    const comment = CommentMemoryDB.findById(commentId);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: '댓글을 찾을 수 없습니다'
      });
    }

    // 작성자 확인
    if (comment.authorId !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: '댓글 삭제 권한이 없습니다'
      });
    }

    // 댓글 삭제
    CommentMemoryDB.findByIdAndDelete(commentId);

    res.json({
      success: true,
      message: '댓글이 삭제되었습니다'
    });

  } catch (error) {
    console.error('댓글 삭제 에러:', error);
    res.status(500).json({
      success: false,
      message: '댓글 삭제에 실패했습니다'
    });
  }
});

module.exports = router;
